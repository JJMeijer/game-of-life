import { Data } from "../../types";
import { Cell } from "./Cell";

export const getCellByIndex = (data: Data, rowIndex: number, colIndex: number): Cell | null => {
    const row = data[rowIndex];

    if (!row) {
        return null;
    }

    const cell = row[colIndex];

    if (!cell) {
        return null;
    }

    return cell;
};
