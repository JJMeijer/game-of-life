import { Cell, Data, Row } from "./types";

export const getCanvas = (): HTMLCanvasElement => {
    const canvas = document.getElementById("grid");

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Canvas element is Missing");
    }

    return canvas;
};

export const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    const context = canvas.getContext("2d");

    if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("Canvas context unexpectedly Missing");
    }

    return context;
};

export const initializeData = (height: number, width: number, xCells: number, yCells: number): Data => {
    const data: Data = [];

    const cellHeight = height / yCells;
    const cellWidth = width / xCells;

    for (let i = 0; i < yCells; i++) {
        const row: Row = [];

        for (let j = 0; j < xCells; j++) {
            const cell: Cell = {
                active: false,
                x: j * cellWidth,
                y: i * cellHeight,
                w: cellWidth,
                h: cellHeight,
            };

            row.push(cell);
        }

        data.push(row);
    }

    return data;
};

export const getIndex = (size: number, cells: number, point: number): number => {
    const cellSize = size / cells;
    return Math.floor(point / cellSize);
};
