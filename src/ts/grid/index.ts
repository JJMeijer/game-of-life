import {
    CANVAS_HOVER,
    RESET,
    CLEAR_CANVAS_HOVER,
    CANVAS_MOUSEDOWN,
    MOUSEUP,
    START,
    STOP,
    SPEED_CHANGE,
} from "../constants";
import { getContext, getSpeedSlider, getStartButton, setCanvasSize } from "../elements";
import { eventBus } from "../eventbus";
import { Data, InitialCellInfo, Row } from "../types";
import {
    initializeData,
    getCellByIndex,
    Cell,
    createNewCells,
    getNeighbours,
    calcCellSize,
    getIndexByOffset,
} from "./data";

let data: Data;
let ctx: CanvasRenderingContext2D;
let initialCellInfo: InitialCellInfo;

let currentHover: Cell;

let mousedown = false;
let mousedownFlippedCells: Cell[] = [];

let runningInterval = 0;
let runningSpeed: number;

export const initializeGrid = (): void => {
    setCanvasSize();

    ctx = getContext();

    initialCellInfo = calcCellSize();
    data = initializeData(ctx, initialCellInfo);

    runningSpeed = parseInt(getSpeedSlider().value);
};

const turn = () => {
    const initialRowIndexes = Object.keys(data).map((x) => parseInt(x));
    const initialColIndexes = Object.keys(data[0] as Row).map((x) => parseInt(x));

    createNewCells(data, initialRowIndexes, initialColIndexes);

    const transitions: Cell[] = [];

    initialRowIndexes.forEach((rowIndex) => {
        const row = data[rowIndex] as Row;

        Object.keys(row).forEach((colIndex) => {
            const cell = row[colIndex] as Cell;
            const neighbours = getNeighbours(data, cell);

            const { active } = cell;

            if (active) {
                if (neighbours < 2 || neighbours > 3) {
                    transitions.push(cell);
                }
            }

            if (!active && neighbours === 3) {
                transitions.push(cell);
            }
        });
    });

    console.log("---------------------");
    console.log("Transitions: ", transitions.length);
    console.log("Grid Size: ", `${Object.keys(data[0] as Row).length}x${Object.keys(data).length}`);

    transitions.forEach((cell) => {
        cell.flip();
    });

    if (transitions.length === 0) {
        console.log("No Further Transitions");
        eventBus.publish(STOP);
    }
};

/**
 * START LISTENER
 */
eventBus.subscribe(START, () => {
    const intervalFunc = () => {
        runningInterval = setTimeout(intervalFunc, runningSpeed);
        turn();
    };

    runningInterval = setTimeout(intervalFunc, runningSpeed);

    const startButton = getStartButton();
    startButton.value = "stop";
    startButton.innerText = "Stop";
});

/**
 * STOP LISTENER
 */
eventBus.subscribe(STOP, () => {
    clearTimeout(runningInterval);
    runningInterval = 0;

    const startButton = getStartButton();
    startButton.value = "start";
    startButton.innerText = "Start";
});

/**
 * RESET LISTENER
 */
eventBus.subscribe(RESET, () => {
    eventBus.publish(STOP);

    Object.values(data).forEach((row) => {
        Object.values(row).forEach((cell) => {
            if (cell.active) {
                cell.clear();
            }
        });
    });

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    initialCellInfo = calcCellSize();
    data = initializeData(ctx, initialCellInfo);
});

/**
 * SPEED CHANGE LISTENER
 */
eventBus.subscribe(SPEED_CHANGE, (eventData) => {
    if (!eventData || !("speed" in eventData)) {
        throw new Error("Event data missing in Speed change Event");
    }

    runningSpeed = eventData.speed;
});

/**
 * CANVAS HOVER LISTENER
 */
eventBus.subscribe(CANVAS_HOVER, (eventData) => {
    if (!eventData || !("offsetX" in eventData)) {
        throw new Error("Event data missing in Hover Event");
    }

    const { offsetX, offsetY } = eventData;
    const { xCells, yCells } = initialCellInfo;

    const colIndex = getIndexByOffset(ctx.canvas.width, xCells, offsetX);
    const rowIndex = getIndexByOffset(ctx.canvas.height, yCells, offsetY);

    const cell = getCellByIndex(data, rowIndex, colIndex);

    if (!cell) {
        return;
    }

    if (mousedown && mousedownFlippedCells.indexOf(cell) === -1) {
        cell.flip();
        mousedownFlippedCells.push(cell);
        return;
    }

    if (cell === currentHover) {
        return;
    }

    eventBus.publish(CLEAR_CANVAS_HOVER);

    cell.hover();
    currentHover = cell;
});

/**
 * CANVAS CLEAR HOVER LISTENER
 */
eventBus.subscribe(CLEAR_CANVAS_HOVER, () => {
    if (currentHover) {
        currentHover.clearHover();
    }
});

/**
 * CANVAS MOUSEDOWN LISTENER
 */
eventBus.subscribe(CANVAS_MOUSEDOWN, (eventData) => {
    if (!eventData || !("offsetX" in eventData)) {
        throw new Error("Event data missing in Hover Event");
    }

    mousedown = true;

    const { offsetX, offsetY } = eventData;
    const { xCells, yCells } = initialCellInfo;

    const colIndex = getIndexByOffset(ctx.canvas.width, xCells, offsetX);
    const rowIndex = getIndexByOffset(ctx.canvas.height, yCells, offsetY);

    const cell = getCellByIndex(data, rowIndex, colIndex);

    if (!cell) {
        return;
    }

    cell.flip();
    mousedownFlippedCells.push(cell);
});

/**
 * GLOBAL MOUSEUP LISTENER
 */
eventBus.subscribe(MOUSEUP, () => {
    mousedown = false;
    mousedownFlippedCells = [];
});
