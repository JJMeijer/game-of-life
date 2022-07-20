import { CELL_COLOR_HOVER_OFF, CELL_COLOR_HOVER_ON } from "../../constants";
import { Cell } from "../../types";

export const activateHoverCell = (ctx: CanvasRenderingContext2D, cell: Cell): void => {
    const { active, x, y, w, h } = cell;
    ctx.fillStyle = active ? CELL_COLOR_HOVER_OFF : CELL_COLOR_HOVER_ON;
    ctx.fillRect(x, y, w, h);
};
