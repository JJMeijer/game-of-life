import { getCanvas, getCellSizeSelect } from "../../elements";
import { InitialCellInfo } from "../../types";

export const calcCellSize = (): InitialCellInfo => {
    const cellSizeSelect = getCellSizeSelect();
    const size = parseInt(cellSizeSelect.value);

    const { width, height } = getCanvas();

    return {
        size,
        xCells: Math.ceil(width / size),
        yCells: Math.ceil(height / size),
    };
};
