export const getXCellsSelect = (): HTMLSelectElement => {
    const xCellsSelect = document.getElementById("xCells");

    if (!(xCellsSelect instanceof HTMLSelectElement)) {
        throw new Error("Grid size elements unexpectedly missing");
    }

    return xCellsSelect;
};
