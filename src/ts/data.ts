import { Cell, Data, Row } from "./types";

export const initializeData = (height: number, width: number, xCells: number, yCells: number): Data => {
    const data: Data = {};

    const cellHeight = height / yCells;
    const cellWidth = width / xCells;

    for (let i = 0; i < yCells; i++) {
        const row: Row = {};

        for (let j = 0; j < xCells; j++) {
            const cell: Cell = {
                active: false,
                x: j * cellWidth,
                y: i * cellHeight,
                w: cellWidth,
                h: cellHeight,
                row: i,
                col: j,
            };

            row[j] = cell;
        }

        data[i] = row;
    }

    return data;
};

export const getCellByIndex = (data: Data, rowIndex: number, colIndex: number): Cell => {
    const row = data[rowIndex];

    if (!row) {
        throw new Error("Row unexpectedly missing");
    }

    const cell = row[colIndex];

    if (!cell) {
        throw new Error("Cell unexpectedly missing");
    }

    return cell;
};

export const getRowByIndex = (data: Data, index: number): Cell[] => {
    const row = data[index];

    if (!row) {
        throw new Error("Row unexpectedly missing");
    }

    return Object.values(row);
};

export const getColByIndex = (data: Data, index: number): Cell[] => {
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
            const { x, y, w, h, col, row } = cell;

            newRow[`${col}`] = {
                active: false,
                x,
                y: y - h,
                w,
                h,
                col,
                row: row - 1,
            };
        });

        data[firstRowIndex - 1] = newRow;
    }

    const firstColIndex = initialCols.sort((a, b) => a - b)[0] as number;
    const firstCol = getColByIndex(data, firstColIndex);
    if (firstCol.filter((x) => x.active).length) {
        Object.keys(data).forEach((rowIndex) => {
            const row = data[rowIndex] as Row;
            const cell = row[firstColIndex] as Cell;

            const { x, y, w, h, col } = cell;

            row[firstColIndex - 1] = {
                active: false,
                x: x - w,
                y,
                w,
                h,
                col: col - 1,
                row: parseInt(rowIndex),
            };
        });
    }

    const lastRowIndex = initialRows.sort((a, b) => b - a)[0] as number;
    const lastRow = getRowByIndex(data, lastRowIndex);
    if (lastRow.filter((x) => x.active).length) {
        const newRow: Row = {};

        lastRow.forEach((cell) => {
            const { x, y, w, h, col, row } = cell;

            newRow[`${col}`] = {
                active: false,
                x,
                y: y + h,
                w,
                h,
                col,
                row: row + 1,
            };
        });

        data[lastRowIndex + 1] = newRow;
    }

    const lastColIndex = initialCols.sort((a, b) => b - a)[0] as number;
    const lastCol = getColByIndex(data, lastColIndex);
    if (lastCol.filter((x) => x.active).length) {
        Object.keys(data).forEach((rowIndex) => {
            const row = data[rowIndex] as Row;
            const cell = row[lastColIndex] as Cell;

            const { x, y, w, h, col } = cell;

            row[lastColIndex + 1] = {
                active: false,
                x: x + w,
                y,
                w,
                h,
                col: col + 1,
                row: parseInt(rowIndex),
            };
        });
    }
};
