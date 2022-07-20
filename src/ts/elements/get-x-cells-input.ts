export const getXCellsInput = (): HTMLInputElement => {
    const cellsXInput = document.getElementById("xCells");

    if (!(cellsXInput instanceof HTMLInputElement)) {
        throw new Error("Grid size elements unexpectedly missing");
    }

    return cellsXInput;
};
