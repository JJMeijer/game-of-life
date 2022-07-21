import { RESET, START, STOP } from "../constants";
import { getStartButton, getResetButton } from "../elements";
import { eventBus } from "../eventbus";

export const startButtonListener = (): void => {
    const startButton = getStartButton();

    startButton.addEventListener("click", () => {
        if (startButton.value === "start") {
            eventBus.publish(START);
        } else {
            eventBus.publish(STOP);
        }
    });
};

export const resetButtonListener = (): void => {
    const resetButton = getResetButton();

    resetButton.addEventListener("click", () => {
        eventBus.publish(RESET);
    });
};
