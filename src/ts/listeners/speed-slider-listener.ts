import { SPEED_CHANGE } from "../constants";
import { getSpeedSlider } from "../elements";
import { eventBus } from "../eventbus";

export const speedSliderListener = (): void => {
    const speedSlider = getSpeedSlider();

    speedSlider.addEventListener("change", () => {
        eventBus.publish(SPEED_CHANGE, { speed: parseInt(speedSlider.value) });
    });
};
