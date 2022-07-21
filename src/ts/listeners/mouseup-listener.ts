import { eventBus } from "../eventbus";
import { MOUSEUP } from "../constants";

export const mouseupListener = (): void => {
    document.addEventListener("mouseup", () => {
        eventBus.publish(MOUSEUP);
    });
};
