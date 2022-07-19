import { X_CELLS, Y_CELLS } from "./constants";
import { Grid } from "./grid";
import { getCanvas } from "./helpers";

const init = (): void => {
    const canvas = getCanvas();
    const grid = new Grid(canvas, X_CELLS, Y_CELLS);

    console.log(grid);
};

if (document.readyState !== "loading") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", () => init());
}
