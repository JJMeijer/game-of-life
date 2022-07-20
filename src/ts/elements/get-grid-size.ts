import { getXCellsInput } from "./get-x-cells-input";
import { getYCellsInput } from "./get-y-cells-input";

export const getGridSize = (): [number, number] => {
    const cellsXInput = getXCellsInput();
    const cellsYInput = getYCellsInput();

    return [parseInt(cellsXInput.value), parseInt(cellsYInput.value)];
};
