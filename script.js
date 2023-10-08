let startButton = document.getElementById("startButton")
let stopButton = document.getElementById("stopButton")
let resetButton = document.getElementById("resetButton")
let timerDisplay = document.querySelector(".timerDisplay")
let timerId = null;
let s = 0o0;
let min = 0o0;
let ms = 0o0;


// Start Button Event Handling


startButton.addEventListener('click', () => {
    if (!timerId) {

        timerId = setInterval(showTime, 10)
    }

})

// Stop Button Even Handler

stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
})


// Event Handler For Reset Button

resetButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timerDisplay.innerHTML = "00:00:00"
    ms = s = min = 0;
})

// Function of showTime
function showTime() {
    if (timerId != 0) {
        ms++;
        if (ms == 100) {
            s++;
            ms = 0;
            if (s == 60) {
                min++;
            }

        }
        let msString = ms < 10 ? `0${ms}` : `${ms}`
        let sString = s < 10 ? `0${s}` : `${s}`
        let minString = min < 10 ? `0${min}` : `${min}`
        timerDisplay.innerHTML = `${minString}:${sString}:${msString}`
    }
}
