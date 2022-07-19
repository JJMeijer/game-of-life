export const getCanvas = (): HTMLCanvasElement => {
    const canvas = document.getElementById("grid");

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Canvas element is Missing");
    }

    return canvas;
};

export const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
    const context = canvas.getContext("2d");

    if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("Canvas context unexpectedly Missing");
    }

    return context;
};

export const getIndex = (size: number, cells: number, point: number): number => {
    const cellSize = size / cells;
    return Math.floor(point / cellSize);
};
