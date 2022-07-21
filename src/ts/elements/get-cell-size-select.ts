export const getCellSizeSelect = (): HTMLSelectElement => {
    const cellSizeSelect = document.getElementById("cellSize");

    if (!(cellSizeSelect instanceof HTMLSelectElement)) {
        throw new Error("Cell Size element unexpectedly missing");
    }

    return cellSizeSelect;
};
