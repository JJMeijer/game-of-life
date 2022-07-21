import { getXCellsSelect } from "./get-x-cells-select";
import { getYCellsSelect } from "./get-y-cells-select";

export const getGridSize = (): [number, number] => {
    const cellsXInput = getXCellsSelect();
    const cellsYInput = getYCellsSelect();

    return [parseInt(cellsXInput.value), parseInt(cellsYInput.value)];
};
