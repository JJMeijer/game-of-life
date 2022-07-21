import { CELL_COLOR_HOVER_OFF, CELL_COLOR_HOVER_ON, CELL_COLOR_ON } from "../../constants";

export class Cell {
    active: boolean;
    x: number;
    y: number;
    w: number;
    h: number;
    row: number;
    col: number;

    readonly ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, row: number, col: number) {
        this.active = false;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.row = row;
        this.col = col;

        this.ctx = ctx;
    }

    hover(): void {
        this.ctx.fillStyle = this.active ? CELL_COLOR_HOVER_OFF : CELL_COLOR_HOVER_ON;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    clearHover(): void {
        if (this.active) {
            this.activate();
        } else {
            this.clear();
        }
    }

    flip(): void {
        if (this.active) {
            this.clear();
        } else {
            this.activate();
        }
    }

    activate(): void {
        this.ctx.fillStyle = CELL_COLOR_ON;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.active = true;
    }

    clear(): void {
        this.ctx.clearRect(this.x, this.y, this.w, this.h);
        this.active = false;
    }
}
