export const getCanvas = (): HTMLCanvasElement => {
    const canvas = document.getElementById("grid");

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Canvas element is Missing");
    }

    return canvas;
};
