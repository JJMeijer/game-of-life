export const getYCellsInput = (): HTMLInputElement => {
    const cellsYInput = document.getElementById("yCells");

    if (!(cellsYInput instanceof HTMLInputElement)) {
        throw new Error("Grid size elements unexpectedly missing");
    }

    return cellsYInput;
};
