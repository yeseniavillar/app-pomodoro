
let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let starBtn = document.getElementById("btn_start");
let reset = document.getElementById("btn_reset");
let pause = document.getElementById("btn_pause");



let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
};

reset.addEventListener(
    "click",
    (resetTimer = () => {
        pauseTimer();
        switch (active) {
            case "long":
                minCount = 14;
                break;
            case "short":
                minCount = 4;
                break;
            default:
                minCount = 24;
                break;
        }
        count = 59;
        time.textContent = `${minCount + 1}:00`;
    })
);
const removeFocus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    })
}
focusButton.addEventListener("click", () => {
    removeFocus();
    focusButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
    active = "short";
    removeFocus();
    shortBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
    active = "long";
    removeFocus();
    longBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener("click",
    (pauseTimer = () => {
        paused = true;
        clearInterval(set);
        starBtn.classList.remove("hide");
        pause.classList.remove("show");
        reset.classList.remove("show");
    })
)
starBtn.addEventListener("click", () => {
    reset.classList.add("show");
    pause.classList.add("show");
    starBtn.classList.add("hide");
    starBtn.classList.remove("show");
    if (paused) {
        paused = false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if (count == 0) {
                if (minCount != 0) {
                    minCount--;
                    count = 60;
                } else {
                    clearInterval(set);
                    document.getElementById("audio").play(); // Reproduce el sonido al finalizar el tiempo
                }
            }
        }, 1000);
    }
});





