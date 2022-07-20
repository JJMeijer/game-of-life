import { CELL_COLOR_HOVER_OFF, CELL_COLOR_HOVER_ON, CELL_COLOR_ON } from "./constants";
import { getContext, getIndex } from "./helpers";
import { createNewCells, getNeighbours, initializeData } from "./data";
import { Cell, Data, Row, Transitions } from "./types";

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

    running = false;

    constructor(canvas: HTMLCanvasElement, xCells: number, yCells: number) {
        this.canvas = canvas;
        this.context = getContext(canvas);

        this.height = canvas.height;
        this.width = canvas.width;
        this.xCells = xCells;
        this.yCells = yCells;

        this.data = initializeData(this.height, this.width, this.xCells, this.yCells);

        this.setListeners();
    }

    setListeners(): void {
        this.setMouseMoveListener();
        this.setMouseLeaveListener();
        this.setMouseClickListener();
        this.setStartButtonListener();
        this.setResetButtonListener();
    }

    start() {
        this.loop = setInterval(() => {
            this.turn();
        }, 1000);

        this.running = true;
    }

    stop() {
        clearInterval(this.loop);

        this.running = false;
    }

    turn() {
        const initialRows = Object.keys(this.data).map((x) => parseInt(x));
        const initialCols = Object.keys(this.data[0] as Row).map((x) => parseInt(x));

        createNewCells(this.data, initialRows, initialCols);

        const transitions: Transitions = {
            live: [],
            die: [],
        };

        initialRows.forEach((rowIndex) => {
            const row = this.data[rowIndex] as Row;

            Object.keys(row).forEach((colIndex) => {
                const cell = row[colIndex] as Cell;
                const neighbours = getNeighbours(this.data, cell);

                const { active } = cell;

                if (active) {
                    if (neighbours < 2 || neighbours > 3) {
                        transitions.die.push(cell);
                    }
                }

                if (!active && neighbours === 3) {
                    transitions.live.push(cell);
                }
            });
        });

        console.log("---------------------");
        console.log("Transitions: ", transitions.die.length + transitions.live.length);
        console.log("Grid Size: ", `${Object.keys(this.data[0] as Row).length}x${Object.keys(this.data).length}`);

        transitions.die.forEach((cell) => {
            cell.active = false;
            this.clearCell(cell);
        });

        transitions.live.forEach((cell) => {
            cell.active = true;
            this.activateCell(cell);
        });

        if (transitions.live.length + transitions.die.length === 0) {
            console.log("No Further Transitions");
            this.stop();
        }
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

    reset(): void {
        Object.values(this.data).forEach((row) => {
            Object.values(row).forEach((cell) => {
                if (cell.active) {
                    cell.active = false;
                    this.clearCell(cell);
                }
            });
        });

        Object.keys(this.data).forEach((key) => {
            if (parseInt(key) >= this.yCells || parseInt(key) < 0) {
                delete this.data[key];
            }
        });

        Object.values(this.data).forEach((row) => {
            Object.keys(row).forEach((key) => {
                if (parseInt(key) >= this.yCells || parseInt(key) < 0) {
                    delete this.data[key];
                }
            });
        });
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
        const startButton = document.getElementById("start");

        if (!(startButton instanceof HTMLButtonElement)) {
            throw new Error("Button element unexpectedly missing");
        }

        startButton.addEventListener("click", () => {
            if (startButton.value === "start") {
                this.start();

                startButton.value = "stop";
                startButton.innerText = "Stop";
            } else {
                this.stop();

                startButton.value = "start";
                startButton.innerText = "Start";
            }
        });
    }

    setResetButtonListener() {
        const resetButton = document.getElementById("reset");

        if (!(resetButton instanceof HTMLButtonElement)) {
            throw new Error("Button element unexpectedly missing");
        }

        resetButton.addEventListener("click", () => {
            const startButton = document.getElementById("start");

            if (!(startButton instanceof HTMLButtonElement)) {
                throw new Error("Button element unexpectedly missing");
            }

            if (this.running) {
                this.stop();

                startButton.value = "start";
                startButton.innerText = "Start";
            }
            this.reset();
        });
    }
}
