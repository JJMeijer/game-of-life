import { RESET } from "../constants";
import { getCellSizeSelect } from "../elements";
import { eventBus } from "../eventbus";

export const cellSizeListener = (): void => {
    const cellSizeSelect = getCellSizeSelect();

    cellSizeSelect.addEventListener("change", () => {
        eventBus.publish(RESET);
    });
};
