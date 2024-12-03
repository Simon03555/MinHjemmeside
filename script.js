const balanceElement = document.getElementById('balance');
const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const wheel = document.getElementById('roulette-wheel');
let balance = 1000;
let currentBet = 0;
let betChoice = null;

// Roulette wheel numbers and colors
const wheelNumbers = [
    { number: 0, color: 'green' },
    { number: 32, color: 'red' },
    { number: 15, color: 'black' },
    { number: 19, color: 'red' },
    { number: 4, color: 'black' },
    { number: 21, color: 'red' },
    { number: 2, color: 'black' },
    { number: 25, color: 'red' },
    { number: 17, color: 'black' },
    { number: 34, color: 'red' },
    { number: 6, color: 'black' },
    { number: 27, color: 'red' },
    { number: 13, color: 'black' },
    { number: 36, color: 'red' },
    { number: 11, color: 'black' },
    { number: 30, color: 'red' },
    { number: 8, color: 'black' },
    { number: 23, color: 'red' },
    { number: 10, color: 'black' },
    { number: 5, color: 'red' },
    { number: 24, color: 'black' },
    { number: 16, color: 'red' },
    { number: 33, color: 'black' },
    { number: 1, color: 'red' },
    { number: 20, color: 'black' },
    { number: 14, color: 'red' },
    { number: 31, color: 'black' },
    { number: 9, color: 'red' },
    { number: 22, color: 'black' },
    { number: 18, color: 'red' },
    { number: 29, color: 'black' },
    { number: 7, color: 'red' },
    { number: 28, color: 'black' },
    { number: 12, color: 'red' },
    { number: 35, color: 'black' },
    { number: 3, color: 'red' },
    { number: 26, color: 'black' }
];

// Generate the roulette wheel segments dynamically
function createWheel() {
    const wheelSegments = document.getElementById('wheel-segments');
    const anglePerSegment = 360 / wheelNumbers.length;
    
    wheelNumbers.forEach((segment, index) => {
        const angleStart = anglePerSegment * index;
        const angleEnd = anglePerSegment * (index + 1);
        const x1 = 100 + 90 * Math.cos(Math.PI * angleStart / 180);
        const y1 = 100 + 90 * Math.sin(Math.PI * angleStart / 180);
        const x2 = 100 + 90 * Math.cos(Math.PI * angleEnd / 180);
        const y2 = 100 + 90 * Math.sin(Math.PI * angleEnd / 180);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M100,100 L${x1},${y1} A90,90 0 ${anglePerSegment > 180 ? 1 : 0},1 ${x2},${y2} Z`);
        path.setAttribute("fill", segment.color);
        wheelSegments.appendChild(path);
        
        // Add number to each segment
        const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numberText.setAttribute("x", 100 + 70 * Math.cos(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("y", 100 + 70 * Math.sin(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("fill", "white");
        numberText.setAttribute("font-size", "10");
        numberText.setAttribute("text-anchor", "middle");
        numberText.textContent = segment.number;
        wheelSegments.appendChild(numberText);
    });
}

createWheel();

// Handle bet selection
document.querySelectorAll(".bet").forEach(button => {
    button.addEventListener("click", () => {
        betChoice = button.dataset.bet;
        document.querySelectorAll(".bet").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
    });
});

// Handle spin button click
spinButton.addEventListener("click", () => {
    const betAmount = parseInt(betAmountInput.value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Please enter a valid bet amount!");
        return;
    }

    if (!betChoice) {
        alert("Please select a bet option!");
        return;
    }

    currentBet = betAmount;
    balance -= currentBet;
    balanceElement.textContent = `Balance: $${balance}`;

    // Start rotation animation
    let spinAngle = Math.random() * 360 + 720; // Spin angle between 720 to 1080 degrees
    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = `rotate(${spinAngle}deg)`;

    // After spin ends, show result and calculate winnings
    setTimeout(() => {
        const resultNumber = Math.floor((spinAngle % 360) / (360 / 37)); // Determine winning number
        calculateResult(resultNumber);
    }, 4000); // 4 seconds of spin duration
});

// Function to calculate the result
function calculateResult(resultIndex) {
    let winAmount = 0;
    const result = wheelNumbers[resultIndex];
    const resultText = `The ball landed on ${result.number} (${result.color})`;

    // Check the bet outcome
    if (betChoice === 'red' && result.color === 'red') {
        winAmount = currentBet * 2;
    } else if (betChoice === 'black' && result.color === 'black') {
        winAmount = currentBet * 2;
    } else if (betChoice === 'odd' && result.number % 2 !== 0 && result.number !== 0) {
        winAmount = currentBet * 2;
    } else if (betChoice === 'even' && result.number % 2 === 0 && result.number !== 0) {
        winAmount = currentBet * 2;
    } else if (betChoice === 'green' && result.number === 0) {
        winAmount = currentBet * 35;
    }

    balance += winAmount;
    balanceElement.textContent = `Balance: $${balance}`;
    document.querySelector(".result").textContent = winAmount > 0 ? `You won $${winAmount}!` : "You lost!";
}
