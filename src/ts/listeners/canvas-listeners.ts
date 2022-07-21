import { CLEAR_CANVAS_HOVER, CANVAS_HOVER, CANVAS_MOUSEDOWN, MOUSEUP } from "../constants";
import { getCanvas } from "../elements";
import { eventBus } from "../eventbus";

export const canvasMouseleaveListener = (): void => {
    const canvas = getCanvas();

    canvas.addEventListener("mouseleave", () => {
        eventBus.publish(CLEAR_CANVAS_HOVER);
    });
};

export const canvasMousemoveListener = (): void => {
    const canvas = getCanvas();

    canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
        if (offsetY <= 0 || offsetY >= canvas.height || offsetX <= 0 || offsetX >= canvas.width) {
            return;
        }

        eventBus.publish(CANVAS_HOVER, { offsetX, offsetY });
    });
};

export const canvasMousedownListener = (): void => {
    const canvas = getCanvas();

    canvas.addEventListener("mousedown", ({ offsetX, offsetY }) => {
        if (offsetY < 0 || offsetY > canvas.height || offsetX < 0 || offsetX > canvas.width) {
            return;
        }

        eventBus.publish(CANVAS_MOUSEDOWN, { offsetX, offsetY });
    });
};

export const mouseupListener = (): void => {
    document.addEventListener("mouseup", () => {
        eventBus.publish(MOUSEUP);
    });
};
