import { resetButtonListener, startButtonListener } from "./button-listeners";
import {
    canvasMousedownListener,
    canvasMouseleaveListener,
    canvasMousemoveListener,
    mouseupListener,
} from "./canvas-listeners";
import { cellSizeListener } from "./cell-size-listener";
import { speedSliderListener } from "./speed-slider-listener";

export const setListeners = () => {
    canvasMousemoveListener();
    canvasMouseleaveListener();
    canvasMousedownListener();
    mouseupListener();
    startButtonListener();
    resetButtonListener();
    speedSliderListener();
    cellSizeListener();
};
