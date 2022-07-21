import { CLEAR_CANVAS_HOVER, CANVAS_HOVER, CANVAS_MOUSEDOWN } from "../constants";
import { getCanvas, getXCellsSelect, getYCellsSelect } from "../elements";
import { eventBus } from "../eventbus";

const getIndex = (size: number, cells: number, point: number): number => {
    const cellSize = size / cells;
    return Math.floor(point / cellSize);
};

export const canvasMouseleaveListener = (): void => {
    const canvas = getCanvas();

    canvas.addEventListener("mouseleave", () => {
        eventBus.publish(CLEAR_CANVAS_HOVER);
    });
};

export const canvasMousemoveListener = (): void => {
    const canvas = getCanvas();
    const xCellsInput = getXCellsSelect();
    const yCellsInput = getYCellsSelect();

    canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
        if (offsetY <= 0 || offsetY >= canvas.height || offsetX <= 0 || offsetX >= canvas.width) {
            return;
        }

        const rowIndex = getIndex(canvas.height, parseInt(yCellsInput.value), offsetY);
        const colIndex = getIndex(canvas.width, parseInt(xCellsInput.value), offsetX);

        eventBus.publish(CANVAS_HOVER, { rowIndex, colIndex });
    });
};

export const canvasMousedownListener = (): void => {
    const canvas = getCanvas();
    const xCellsInput = getXCellsSelect();
    const yCellsInput = getYCellsSelect();

    canvas.addEventListener("mousedown", ({ offsetX, offsetY }) => {
        if (offsetY < 0 || offsetY > canvas.height || offsetX < 0 || offsetX > canvas.width) {
            return;
        }

        const rowIndex = getIndex(canvas.height, parseInt(yCellsInput.value), offsetY);
        const colIndex = getIndex(canvas.width, parseInt(xCellsInput.value), offsetX);

        eventBus.publish(CANVAS_MOUSEDOWN, { rowIndex, colIndex });
    });
};
