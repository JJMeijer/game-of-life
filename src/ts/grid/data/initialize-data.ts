import { getCanvas, getGridSize } from "../../elements";
import { Data, Row } from "../../types";
import { Cell } from "./Cell";

export const initializeData = (ctx: CanvasRenderingContext2D): Data => {
    const { height, width } = getCanvas();
    const [xCells, yCells] = getGridSize();

    const data: Data = {};

    const cellHeight = Math.round(height / yCells);
    const cellWidth = Math.round(width / xCells);

    for (let i = 0; i < yCells; i++) {
        const row: Row = {};

        for (let j = 0; j < xCells; j++) {
            row[j] = new Cell(ctx, j * cellWidth, i * cellHeight, cellWidth, cellHeight, i, j);
        }

        data[i] = row;
    }

    console.log(data);
    return data;
};
