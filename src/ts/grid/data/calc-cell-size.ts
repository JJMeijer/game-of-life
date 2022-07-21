import { getCanvas } from "../../elements";
import { InitialCellInfo } from "../../types";

export const calcCellSize = (): InitialCellInfo => {
    const MIN_CELLS = 25;
    const PREFERRED_SIZE = 20;

    const { width, height } = getCanvas();
    const shortest = width < height ? width : height;

    if (shortest / PREFERRED_SIZE > MIN_CELLS) {
        return {
            size: PREFERRED_SIZE,
            xCells: Math.ceil(width / PREFERRED_SIZE),
            yCells: Math.ceil(height / PREFERRED_SIZE),
        };
    }

    const BACKUP_SIZE = Math.round(shortest / PREFERRED_SIZE);
    return {
        size: BACKUP_SIZE,
        xCells: Math.ceil(width / BACKUP_SIZE),
        yCells: Math.ceil(height / BACKUP_SIZE),
    };
};
