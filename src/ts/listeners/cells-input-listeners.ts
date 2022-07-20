import { RESET } from "../constants";
import { getXCellsInput, getYCellsInput } from "../elements";
import { eventBus } from "../eventbus";

export const xCellsInputListener = (): void => {
    const xCellsInput = getXCellsInput();

    xCellsInput.addEventListener("change", () => {
        eventBus.publish(RESET);
    });
};

export const yCellsInputListener = (): void => {
    const yCellsInput = getYCellsInput();

    yCellsInput.addEventListener("change", () => {
        eventBus.publish(RESET);
    });
};
