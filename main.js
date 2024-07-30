// Start The Game
document.querySelector(".main-menu span").onclick = function() {
    // Take The Player's Name
    let yourName = prompt("Enter Your Name: ");

    // Set The Player's Name
    let playerName = document.querySelector(".info-container .name span");
    if (yourName === null || yourName === "") {
        playerName.innerHTML = "Unknown";
    }
    else {
        playerName.innerHTML = yourName;
    }

    // Remove The Main Menu
    let mainMenu = document.querySelector(".main-menu");
    mainMenu.remove();

    // Add Main Theme Music
    document.getElementById("main-theme").play();

    // Run The Timer
    decreaseTime();
}

// Add Timer
let timer;
let timerElement = document.getElementById("timer");
let seconds = 60;
let timeLimit = 62000;

function decreaseTime() {
    timer = setInterval(() => {
        timerElement.innerHTML = seconds;
        seconds--;
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
    }, timeLimit);
}

// The Duration Of Flipped Cards
let dutation = 1000;

// Add Cards To An Array
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

// Add Indeces Of Cards To An Array
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// Add Order CSS Property To Game Block
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener("click", function(){
        // Trigger The Flip Block Function
        flipBlock(block);
    });
});

// Flip Block Function
function flipBlock(selectedBlock) {
    // Add Class "is-flipped"
    selectedBlock.classList.add("is-flipped");

    // Collect Flipped Cards
    let flippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (flippedBlocks.length === 2) {
        // Add Stop Clicking Function
        stopClicking();

        // Add Check Matched Blocks Function
        checkMatchedBlocks(flippedBlocks[0], flippedBlocks[1]);
    }
}

// Stop Clicking Function
function stopClicking() {
    // Add Class "no-clicking" To Main Container
    blocksContainer.classList.add("no-clicking");

    // Remove Class "no-clicking" After The Duration
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, dutation);
}

// Check Matched Blocks Function
let matchedBlocksNumber = 0;
function checkMatchedBlocks(element1, element2) {
    let wrongTries = document.querySelector(".tries span");

    if (element1.dataset.anime === element2.dataset.anime) {
        // Remove Class "is-flipped"
        element1.classList.remove("is-flipped");
        element2.classList.remove("is-flipped");

        // Add Class "matched"
        element1.classList.add("matched");
        element2.classList.add("matched");
        matchedBlocksNumber += 2;
        
        if (matchedBlocksNumber === 20) {
            winScreen();
            clearInterval(timer);
        }

        // Add Success Sound Effect
        document.getElementById("success").play();
    }
    else {
        // Increase Wrong Tries
        wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;

        // Flip Back The Blocks
        setTimeout(() => {
            element1.classList.remove("is-flipped");
            element2.classList.remove("is-flipped");
        }, dutation);

        // Add Fail Sound Effect
        document.getElementById("fail").play();
    }
}


// Shuffle Function
function shuffle(array) {
    // Set Vars For Shuffle
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // Get A Random Namber
        random = Math.floor(Math.random() * current);

        // Decrease Length By 1
        current--;

        // Save Current Element In A Temporary Element
        temp = array[current];
        // Current Element = Random Element
        array[current] = array[random];
        // Random Element = Temporary Element
        array[random] = array[temp];
    }
    return array;
}

// Add Lose Screen
function loseScreen() {
    let loseScreen = document.createElement("div");
    loseScreen.className = "lose-screen";
    let loseDiv = document.createElement("div");
    let loseText = document.createTextNode("Game Over!");
    loseDiv.appendChild(loseText);
    loseDiv.className = "lose";
    loseScreen.appendChild(loseDiv);
    document.body.appendChild(loseScreen);
}

// Display Lose Screen
setTimeout(() => {
    loseScreen();
}, timeLimit + 3000);

// Add Win Screen
function winScreen() {
    let winScreen = document.createElement("div");
    winScreen.className = "win-screen";
    let winDiv = document.createElement("div");
    let winText = document.createTextNode("You Win!");
    winDiv.appendChild(winText);
    winDiv.className = "win";
    winScreen.appendChild(winDiv);
    document.body.appendChild(winScreen);
}

