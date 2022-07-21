import { Data, InitialCellInfo, Row } from "../../types";
import { Cell } from "./Cell";

export const initializeData = (ctx: CanvasRenderingContext2D, initialCellInfo: InitialCellInfo): Data => {
    const { size, xCells, yCells } = initialCellInfo;
    const data: Data = {};

    for (let i = 0; i < yCells; i++) {
        const row: Row = {};

        for (let j = 0; j < xCells; j++) {
            row[j] = new Cell(ctx, j * size, i * size, size, size, i, j);
        }

        data[i] = row;
    }

    console.log("Initialized Data: ", data);
    return data;
};
