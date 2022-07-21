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
import { getContext, getStartButton } from "../elements";
import { eventBus } from "../eventbus";
import { Data, Row } from "../types";
import { initializeData, getCellByIndex, Cell, createNewCells, getNeighbours } from "./data";

let data: Data;
let ctx: CanvasRenderingContext2D;
let currentHover: Cell;

let mousedown = false;
let mousedownFlippedCells: Cell[] = [];

let runningInterval = 0;
let runningSpeed = 1000;

export const initializeGrid = (): void => {
    ctx = getContext();
    data = initializeData(ctx);
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

    data = initializeData(ctx);
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
    if (!eventData || !("rowIndex" in eventData)) {
        throw new Error("Event data missing in Hover Event");
    }

    const { rowIndex, colIndex } = eventData;
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
    if (!eventData || !("rowIndex" in eventData)) {
        throw new Error("Event data missing in Hover Event");
    }

    mousedown = true;

    const cell = getCellByIndex(data, eventData.rowIndex, eventData.colIndex);

    if (!cell) {
        return;
    }

    cell.flip();
});

/**
 * GLOBAL MOUSEUP LISTENER
 */
eventBus.subscribe(MOUSEUP, () => {
    mousedown = false;
    mousedownFlippedCells = [];
});
