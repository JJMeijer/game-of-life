export const getYCellsSelect = (): HTMLSelectElement => {
    const yCellsSelect = document.getElementById("yCells");

    if (!(yCellsSelect instanceof HTMLSelectElement)) {
        throw new Error("Grid size elements unexpectedly missing");
    }

    return yCellsSelect;
};
