import { setListeners } from "./listeners";
import { initializeGrid } from "./grid";

const init = (): void => {
    initializeGrid();
    setListeners();
};

if (document.readyState !== "loading") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", () => init());
}
