import { getCellByIndex } from "./get-cell-by-index";

import { Data } from "../../types";
import { Cell } from "./Cell";

export const getNeighbours = (data: Data, cell: Cell): number => {
    const { row, col } = cell;

    const indexes: [number, number][] = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1],
    ];

    const cells = indexes
        .map(([rowIndex, colIndex]) => {
            return getCellByIndex(data, rowIndex, colIndex);
        })
        .filter((cell) => cell !== null && cell.active).length;

    return cells;
};
