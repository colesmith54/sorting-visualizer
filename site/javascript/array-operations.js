function generateArrayByType() {
    bars = [];
    inputArray = Array.from({ length: size }, (_, i) => i + 1);
    switch (arrayType) {
        case "randomWO":
            for (let i = 1; i <= size; i++) {
                bars.push(map(i, 0, size, 1, 100));
            }
            shuffleArray();
            break;
        case "randomW":
            for (let i = 0; i < size; i++) {
                value = Math.floor(Math.random() * size + 1);
                bars.push(map(value, 0, size, 1, 100));
            }
            break;
        case "almost-sorted":
            for (let i = 1; i <= size; i++) {
                bars.push(map(i, 0, size, 1, 100));
            }
            // Swap a few neighboring bars
            for (let i = 0; i < size; i++) {
                let index = Math.floor(Math.random() * (size - 1));
                swapElements(bars, index, index + 1);
            }
            break;
        case "reverse":
            for (let i = size; i >= 1; i--) {
                bars.push(map(i, 0, size, 1, 100));
            }
            break;
        default:
            break;
    }
}


// Randomizes position of each element
function shuffleArray() {
    for (let i = bars.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        swapElements(bars, i, j);
    }
}

// Render bars array to HTML
function renderArray() {
    const visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = bars.map((num, index) => `<div class="bar flex-fill" style="margin:${(-0.004 * size + 0.4).toFixed(2)}%; height:${num}%; background-color: ${verified.includes(index) ? '#FFB347' : '#007bff'};" id="bar-${index}"></div>`).join("");
}

function initializeArray(arrayType) {
    if (arrayType === 'custom') {
        return handleCustomArrayInput();
    } else {
        return handleGeneratedArrayInput();
    }
}

function updateArrayDetails() {
    bars = [];
    isPivot = false;
    initializeArray(arrayType);
    renderArray();
}

function handleCustomArrayInput() {
    inputArray = document.getElementById('array-input').value.split(',').filter(item => item.trim() !== '').map(Number);
    size = inputArray.length;
    if (document.getElementById('array-input').value != '') {
        for (let i = 0; i < size; i++) {
            bars.push(map(inputArray[i], 0, Math.max(...inputArray), 1, 100));
        }
    }
    console.log(inputArray)
    if(inputArray.length < 2) {
        updateButtonState('start', 'btn btn-secondary', true, 'Start');
    }
    document.getElementById('size').disabled = true;
    document.getElementById('array-io').style.display = 'unset';
}

function handleGeneratedArrayInput() {
    bars = [];
    size = document.getElementById('size').value;
    document.getElementById('array-io').style.display = 'none';
    updateButtonState('start', 'btn btn-primary', false, 'Start');
    generateArrayByType();
}