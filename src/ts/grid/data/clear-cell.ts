import { Cell } from "../../types";

export const clearCell = (ctx: CanvasRenderingContext2D, cell: Cell): void => {
    const { x, y, w, h } = cell;
    ctx.clearRect(x, y, w, h);

    cell.active = false;
};
