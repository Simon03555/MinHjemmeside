// Initialize balance and current bet
let balance = 1000;
let currentBet = 0;
let betChoice = null;

const balanceElement = document.getElementById('balance');
const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const wheel = document.getElementById('roulette-wheel');
const wheelSegments = document.getElementById('wheel-segments');

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

// Create the roulette wheel segments
function createWheel() {
    const anglePerSegment = 360 / wheelNumbers.length;
    
    wheelNumbers.forEach((segment, index) => {
        const angleStart = anglePerSegment * index;
        const angleEnd = anglePerSegment * (index + 1);
        const x1 = 100 + 90 * Math.cos(Math.PI * angleStart / 180);
        const y1 = 100 + 90 * Math.sin(Math.PI * angleStart / 180);
        const x2 = 100 + 90 * Math.cos(Math.PI * angleEnd / 180);
        const y2 = 100 + 90 * Math.sin(Math.PI * angleEnd / 180);

        // Create the segments
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M100,100 L${x1},${y1} A90,90 0 ${anglePerSegment > 180 ? 1 : 0},1 ${x2},${y2} Z`);
        path.setAttribute("fill", segment.color);
        wheelSegments.appendChild(path);
        
        // Add numbers to the segments
        const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numberText.setAttribute("x", 100 + 70 * Math.cos(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("y", 100 + 70 * Math.sin(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("fill", "white");
        numberText.setAttribute("font-size", "12");
        numberText.setAttribute("text-anchor", "middle");
        numberText.textContent = segment.number;
        wheelSegments.appendChild(numberText);
    });
}

createWheel();

// Handle bet selection
document.querySelectorAll(".bet").forEach(button => {
    button.addEventListener("click", function() {
        betChoice = this.dataset.bet;
        updateBalance();
    });
});

// Update balance display
function updateBalance() {
    balanceElement.textContent = `Balance: $${balance}`;
}

// Spin the wheel
spinButton.addEventListener("click", function() {
    const betAmount = parseInt(betAmountInput.value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Please enter a valid bet amount.");
        return;
    }

    currentBet = betAmount;
    balance -= currentBet;
    updateBalance();

    // Start the wheel spin animation
    const randomSpin = Math.floor(Math.random() * 3600) + 3600; // Random spin between 3600 and 7200 degrees
    wheel.style.transform = `rotate(${randomSpin}deg)`;

    // After spin, determine the result
    setTimeout(function() {
        const resultIndex = Math.floor((randomSpin % 360) / (360 / wheelNumbers.length));
        const result = wheelNumbers[resultIndex];
        alert(`The wheel landed on ${result.number} (${result.color})`);

        // Determine win or loss
        if ((betChoice === 'red' && result.color === 'red') || 
            (betChoice === 'black' && result.color === 'black') ||
            (betChoice === 'green' && result.number === 0)) {
            
            balance += currentBet * 2; // Win the bet amount doubled
            alert(`You win! Your balance is now $${balance}`);
        } else {
            alert(`You lose. Your balance is now $${balance}`);
        }

        updateBalance();
    }, 4500); // After 4.5 seconds, stop the wheel and show the result
});
