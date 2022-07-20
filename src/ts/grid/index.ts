import { CANVAS_HOVER, RESET, CLEAR_CANVAS_HOVER, CANVAS_CLICK } from "../constants";
import { getContext } from "../elements";
import { eventBus } from "../eventbus";
import { Cell, Data } from "../types";
import { initializeData, getCellByIndex, activateCell, clearCell, clearHoverCell, activateHoverCell } from "./data";

let data: Data;
let ctx: CanvasRenderingContext2D;
let currentHover: Cell;

export const initializeGrid = (): void => {
    data = initializeData();
    ctx = getContext();
};

eventBus.subscribe(RESET, () => {
    data = initializeData();
});

eventBus.subscribe(CANVAS_HOVER, (eventData) => {
    if (!eventData) {
        throw new Error("Event data missing in Hover Event");
    }

    const { rowIndex, colIndex } = eventData;
    const cell = getCellByIndex(data, rowIndex, colIndex);

    if (!cell) {
        return;
    }

    if (cell === currentHover) {
        return;
    }

    if (currentHover && cell !== currentHover) {
        clearHoverCell(ctx, currentHover);
    }

    activateHoverCell(ctx, cell);
    currentHover = cell;
});

eventBus.subscribe(CLEAR_CANVAS_HOVER, () => {
    if (currentHover) {
        clearHoverCell(ctx, currentHover);
    }
});

eventBus.subscribe(CANVAS_CLICK, (eventData) => {
    if (!eventData) {
        throw new Error("Event data missing in Hover Event");
    }

    const { rowIndex, colIndex } = eventData;

    const cell = getCellByIndex(data, rowIndex, colIndex);

    if (!cell) {
        return;
    }

    const { active } = cell;

    if (active) {
        clearCell(ctx, cell);
    } else {
        activateCell(ctx, cell);
    }
});
