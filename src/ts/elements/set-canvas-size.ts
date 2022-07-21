import { getCanvas } from "./get-canvas";

export const setCanvasSize = (): void => {
    const canvas = getCanvas();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
