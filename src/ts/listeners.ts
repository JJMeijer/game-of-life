const mouseMoveHandler = (event: MouseEvent): void => {
    console.log(event);
};

export const setMouseMoveListener = (canvas: HTMLCanvasElement): void => {
    canvas.addEventListener("mousemove", mouseMoveHandler);
};
