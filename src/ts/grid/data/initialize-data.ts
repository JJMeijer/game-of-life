import { getCanvas, getGridSize } from "../../elements";
import { Cell, Data, Row } from "../../types";

export const initializeData = (): Data => {
    const { height, width } = getCanvas();
    const [xCells, yCells] = getGridSize();

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

    console.log(data);
    return data;
};
