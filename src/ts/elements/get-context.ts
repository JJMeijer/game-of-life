import { getCanvas } from "./get-canvas";

export const getContext = (): CanvasRenderingContext2D => {
    const canvas = getCanvas();
    const context = canvas.getContext("2d");

    if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("Canvas context unexpectedly Missing");
    }

    return context;
};
