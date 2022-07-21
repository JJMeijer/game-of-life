export const getStartButton = (): HTMLButtonElement => {
    const startButton = document.getElementById("start");

    if (!(startButton instanceof HTMLButtonElement)) {
        throw new Error("Start Button unexpectedly missing");
    }

    return startButton;
};
