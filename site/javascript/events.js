window.addEventListener('DOMContentLoaded', (event) => {
    // Check size on page load
    checkSize();
});

window.addEventListener('resize', (event) => {
    // Check size whenever window is resized
    checkSize();
});

function checkSize(){
    let startButton = document.getElementById("start");
    let pauseButton = document.getElementById("pause");
    let resetButton = document.getElementById("reset");

    if (window.innerWidth <= 432){
        // if the window is less than or equal to 768px, add 'btn-sm' class
        startButton.classList.add('btn-sm');
        pauseButton.classList.add('btn-sm');
        resetButton.classList.add('btn-sm');
    } else {
        // if the window is greater than 768px, add 'btn-lg' class
        startButton.classList.remove('btn-sm');
        pauseButton.classList.remove('btn-sm');
        resetButton.classList.remove('btn-sm');
    }
}

// Event handlers for buttons
function startButtonHandler() {
    isRunning = true;
    algorithm = document.getElementById('algorithm').value;
    if (!currentSortGenerator) {
        currentSortGenerator = sortGenerators[algorithm]();
        updateButtonState('pause', 'btn-warning', false, 'Pause');
        disableInputs(true);
        nextSortStep();
    } else if (isPaused) {
        isPaused = false;
        nextSortStep();
    }
    updateButtonState('start', 'btn-primary', true, 'Start');
    updateButtonState('pause', 'btn-warning', false, 'Pause');
}

function pauseButtonHandler() {
    if (!isPaused) {
        isPaused = true;
        updateButtonState('pause', 'btn-warning', false, 'Next');
        updateButtonState('start', 'btn-success', false, 'Resume');
    } else {
        nextSortStep(true);
    }
}

function resetButtonHandler() {

    verified = [];
    bars = [];
    output = [];

    currentSortGenerator = null;
    
    isRunning = false;
    isPaused = false;
    isVerifying = false;

    updateArrayDetails();
    if(bars.length > 1) {
        updateButtonState('start', 'btn btn-primary', false, 'Start');
    }
    updateButtonState('pause', 'btn btn-secondary', true, 'Pause');
    disableInputs(false);
    document.getElementById('array-output').value = "";
}

function updateButtonState(buttonid, className, disabled, innerText) {
    let btn = document.getElementById(buttonid);
    btn.className = `btn ${className} mx-1 mt-3`;
    btn.disabled = disabled;
    btn.innerText = innerText;
    checkSize();
}

function disableInputs(isDisable) {
    document.getElementById('algorithm').disabled = isDisable;
    document.getElementById('array-type').disabled = isDisable;
    document.getElementById('size').disabled = arrayType === 'custom' ? true : isDisable;
}

function muteButtonHandler() {
    isMuted = !isMuted;
    this.innerHTML = isMuted ? mutedIcon : soundIcon;
}

function themeButtonHandler() {
    isDark = !isDark;
    this.innerHTML = isDark ? moonIcon : sunIcon;
    document.body.classList.toggle('dark-mode');
    document.documentElement.setAttribute('data-bs-theme', (isDark ? 'dark' : 'light'));
};

// Event listeners
document.getElementById('algorithm').addEventListener('change', function () {
    updateAlgorithmDetails(this.value);
});

document.getElementById('array-type').addEventListener('change', function () {
    arrayType = this.value;
    updateArrayDetails();
    disableInputs(false);
});

document.getElementById('start').addEventListener('click', startButtonHandler);
document.getElementById('pause').addEventListener('click', pauseButtonHandler);
document.getElementById('reset').addEventListener('click', resetButtonHandler);
document.getElementById('speed').addEventListener('input', function () {
    speed = 1000 / (0.01 * this.value + 1) - 100;
});
document.getElementById('size').addEventListener('input', function () {
    size = this.value;
    generateArrayByType();
    renderArray();
});
document.getElementById('mute-button').addEventListener('click', muteButtonHandler);
document.getElementById("array-input").addEventListener("input", updateArrayDetails);
document.getElementById('copy-code').addEventListener('click', function () {
    navigator.clipboard.writeText(algoSortCode[algorithm]);
});
document.getElementById('copy-optimized-code').addEventListener('click', function () {
    navigator.clipboard.writeText(optimizedAlgoSortCode[algorithm]);
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('theme-toggle').addEventListener('click', themeButtonHandler)
});