export const getIndexByOffset = (size: number, cells: number, point: number): number => {
    const cellSize = size / cells;
    return Math.floor(point / cellSize);
};
