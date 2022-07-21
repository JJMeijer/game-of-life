import { RESET } from "../constants";
import { getXCellsSelect, getYCellsSelect } from "../elements";
import { eventBus } from "../eventbus";

export const xCellsInputListener = (): void => {
    const xCellsInput = getXCellsSelect();

    xCellsInput.addEventListener("change", () => {
        eventBus.publish(RESET);
    });
};

export const yCellsInputListener = (): void => {
    const yCellsInput = getYCellsSelect();

    yCellsInput.addEventListener("change", () => {
        eventBus.publish(RESET);
    });
};
