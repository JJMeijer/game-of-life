import { CELL_COLOR_HOVER_OFF, CELL_COLOR_HOVER_ON, CELL_COLOR_ON } from "./constants";
import { getContext, getIndex, initializeData } from "./helpers";
import { Cell, Data } from "./types";

export class Grid {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    height: number;
    width: number;

    xCells: number;
    yCells: number;

    currentHover: Cell | undefined = undefined;

    loop = 0;

    readonly data: Data;

    constructor(canvas: HTMLCanvasElement, xCells: number, yCells: number) {
        this.canvas = canvas;
        this.context = getContext(canvas);

        this.height = canvas.height;
        this.width = canvas.width;
        this.xCells = xCells;
        this.yCells = yCells;

        this.data = initializeData(this.height, this.width, this.xCells, this.yCells);

        this.setMouseMoveListener();
        this.setMouseLeaveListener();
        this.setMouseClickListener();
        this.setStartButtonListener();
    }

    start() {
        this.loop = setInterval(() => {
            this.turn();
        }, 1000);
    }

    stop() {
        clearInterval(this.loop);
    }

    turn() {
        const currentRows = Object.keys(this.data);
        console.log(currentRows);
        // Pass
    }

    getCellByOffset(offsetY: number, offsetX: number): Cell {
        const rowIndex = getIndex(this.height, this.yCells, offsetY);
        const cellIndex = getIndex(this.width, this.xCells, offsetX);

        const row = this.data[rowIndex];
        if (row) {
            const cell = row[cellIndex];
            if (cell) {
                return cell;
            }
        }

        throw new Error("Cell is not in range");
    }

    hoverCell(cell: Cell): void {
        const { active, x, y, w, h } = cell;
        this.context.fillStyle = active ? CELL_COLOR_HOVER_OFF : CELL_COLOR_HOVER_ON;
        this.context.fillRect(x, y, w, h);
    }

    activateCell(cell: Cell): void {
        const { x, y, w, h } = cell;
        this.context.fillStyle = CELL_COLOR_ON;
        this.context.fillRect(x, y, w, h);
    }

    clearCell(cell: Cell): void {
        const { x, y, w, h } = cell;
        this.context.clearRect(x, y, w, h);
    }

    clearCurrentHover(): void {
        if (this.currentHover) {
            const { active } = this.currentHover;

            if (active) {
                this.activateCell(this.currentHover);
            } else {
                this.clearCell(this.currentHover);
            }
        }
    }

    setMouseMoveListener() {
        this.canvas.addEventListener("mousemove", (event) => {
            const { offsetX, offsetY } = event;

            if (offsetY <= 0 || offsetY >= this.height || offsetX <= 0 || offsetX >= this.width) {
                return;
            }

            const cell = this.getCellByOffset(offsetY, offsetX);

            if (this.currentHover && cell !== this.currentHover) {
                this.clearCurrentHover();
            }

            if (this.currentHover === cell) {
                return;
            }

            this.hoverCell(cell);
            this.currentHover = cell;
        });
    }

    setMouseLeaveListener(): void {
        this.canvas.addEventListener("mouseleave", () => this.clearCurrentHover());
    }

    setMouseClickListener(): void {
        this.canvas.addEventListener("click", (event) => {
            const { offsetX, offsetY } = event;

            if (offsetY < 0 || offsetY > this.height || offsetX < 0 || offsetX > this.width) {
                return;
            }

            const cell = this.getCellByOffset(offsetY, offsetX);

            const { active } = cell;

            if (active) {
                this.clearCell(cell);
                cell.active = false;
            } else {
                this.activateCell(cell);
                cell.active = true;
            }
        });
    }

    setStartButtonListener(): void {
        const startButtonElement = document.getElementById("start");

        if (!(startButtonElement instanceof HTMLButtonElement)) {
            throw new Error("Button element unexpectedly missing");
        }

        startButtonElement.addEventListener("click", () => {
            if (startButtonElement.value === "start") {
                this.start();

                startButtonElement.value = "stop";
                startButtonElement.innerText = "Stop";
            } else {
                this.stop();

                startButtonElement.value = "start";
                startButtonElement.innerText = "Start";
            }
        });
    }
}
