import { CELL_COLOR_ON } from "../../constants";
import { Cell } from "../../types";

export const activateCell = (ctx: CanvasRenderingContext2D, cell: Cell): void => {
    const { x, y, w, h } = cell;
    ctx.fillStyle = CELL_COLOR_ON;
    ctx.fillRect(x, y, w, h);

    cell.active = true;
};
