import { resetButtonListener, startButtonListener } from "./button-listeners";
import { canvasMousedownListener, canvasMouseleaveListener, canvasMousemoveListener } from "./canvas-listeners";
import { xCellsInputListener, yCellsInputListener } from "./cells-input-listeners";
import { mouseupListener } from "./mouseup-listener";
import { speedSliderListener } from "./speed-slider-listener";

export const setListeners = () => {
    xCellsInputListener();
    yCellsInputListener();
    canvasMousemoveListener();
    canvasMouseleaveListener();
    canvasMousedownListener();
    mouseupListener();
    startButtonListener();
    resetButtonListener();
    speedSliderListener();
};
