import { canvasClickListener, canvasMouseleaveListener, canvasMousemoveListener } from "./canvas-listeners";
import { xCellsInputListener, yCellsInputListener } from "./cells-input-listeners";

export const setListeners = () => {
    xCellsInputListener();
    yCellsInputListener();
    canvasMousemoveListener();
    canvasMouseleaveListener();
    canvasClickListener();
};
