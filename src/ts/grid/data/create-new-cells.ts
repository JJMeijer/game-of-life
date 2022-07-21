import { Data, Row } from "../../types";
import { Cell } from "./Cell";

const getRowByIndex = (data: Data, index: number): Cell[] => {
    const row = data[index];

    if (!row) {
        throw new Error("Row unexpectedly missing");
    }

    return Object.values(row);
};

const getColByIndex = (data: Data, index: number): Cell[] => {
    const rows = Object.values(data);

    return rows.map((row) => {
        const cell = row[index];

        if (!cell) {
            throw new Error("Column unexpectedly missing");
        }

        return cell;
    });
};

export const createNewCells = (data: Data, initialRows: number[], initialCols: number[]): void => {
    const firstRowIndex = initialRows.sort((a, b) => a - b)[0] as number;
    const firstRow = getRowByIndex(data, firstRowIndex);
    if (firstRow.filter((x) => x.active).length) {
        const newRow: Row = {};

        firstRow.forEach((cell) => {
            const { x, y, w, h, col, row, ctx } = cell;

            newRow[`${col}`] = new Cell(ctx, x, y - h, w, h, row - 1, col);
        });

        data[firstRowIndex - 1] = newRow;
    }

    const firstColIndex = initialCols.sort((a, b) => a - b)[0] as number;
    const firstCol = getColByIndex(data, firstColIndex);
    if (firstCol.filter((x) => x.active).length) {
        Object.keys(data).forEach((rowIndex) => {
            const row = data[rowIndex] as Row;
            const cell = row[firstColIndex] as Cell;

            const { x, y, w, h, col, ctx } = cell;

            row[firstColIndex - 1] = new Cell(ctx, x - w, y, w, h, parseInt(rowIndex), col - 1);
        });
    }

    const lastRowIndex = initialRows.sort((a, b) => b - a)[0] as number;
    const lastRow = getRowByIndex(data, lastRowIndex);
    if (lastRow.filter((x) => x.active).length) {
        const newRow: Row = {};

        lastRow.forEach((cell) => {
            const { x, y, w, h, col, row, ctx } = cell;

            newRow[`${col}`] = new Cell(ctx, x, y + h, w, h, row + 1, col);
        });

        data[lastRowIndex + 1] = newRow;
    }

    const lastColIndex = initialCols.sort((a, b) => b - a)[0] as number;
    const lastCol = getColByIndex(data, lastColIndex);
    if (lastCol.filter((x) => x.active).length) {
        Object.keys(data).forEach((rowIndex) => {
            const row = data[rowIndex] as Row;
            const cell = row[lastColIndex] as Cell;

            const { x, y, w, h, col, ctx } = cell;

            row[lastColIndex + 1] = new Cell(ctx, x + w, y, w, h, parseInt(rowIndex), col + 1);
        });
    }
};
