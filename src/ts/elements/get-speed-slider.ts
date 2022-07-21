export const getSpeedSlider = (): HTMLInputElement => {
    const speedSlider = document.getElementById("speed");

    if (!(speedSlider instanceof HTMLInputElement)) {
        throw new Error("Speed slider element unexpectedly missing");
    }

    return speedSlider;
};
