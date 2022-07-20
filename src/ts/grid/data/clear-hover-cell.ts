import { Cell } from "../../types";
import { activateCell } from "./activate-cell";
import { clearCell } from "./clear-cell";

export const clearHoverCell = (ctx: CanvasRenderingContext2D, cell: Cell): void => {
    const { active } = cell;

    if (active) {
        activateCell(ctx, cell);
    } else {
        clearCell(ctx, cell);
    }
};
