export const getResetButton = (): HTMLButtonElement => {
    const resetButton = document.getElementById("reset");

    if (!(resetButton instanceof HTMLButtonElement)) {
        throw new Error("Reset Button unexpectedly missing");
    }

    return resetButton;
};
