let balance = 1000;
let currentBet = null;
let betAmount = 0;
let betChoice = null;
let currentNumber = null;

// Roulette hjul segmenter og farver
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

const balanceElement = document.getElementById('balance');
const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const ball = document.getElementById('ball');
const wheelSegments = document.getElementById('wheel-segments');

// Opret hjul med segmenter
function createWheel() {
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

        const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numberText.setAttribute("x", 100 + 70 * Math.cos(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("y", 100 + 70 * Math.sin(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("fill", "white");
        numberText.setAttribute("font-size", "12");
        numberText.setAttribute("text-anchor", "middle");
        numberText.setAttribute("dominant-baseline", "middle");
        numberText.textContent = segment.number;
        wheelSegments.appendChild(numberText);
    });
}

createWheel();

// Håndter indsats
document.querySelectorAll('.bet').forEach((button) => {
    button.addEventListener('click', (e) => {
        betChoice = e.target.dataset.bet;
    });
});

// Start spin
spinButton.addEventListener('click', () => {
    betAmount = parseInt(betAmountInput.value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert('Indtast et gyldigt beløb!');
        return;
    }

    balance -= betAmount;
    balanceElement.textContent = balance;

    // Roter hjulet med en smooth animation
    let spinDuration = Math.random() * 3 + 3;  // Random spinning time
    let spinAngle = Math.floor(Math.random() * 360);

    ball.style.transition = `transform ${spinDuration}s ease-out`;
    ball.style.transform = `rotate(${spinAngle + 3600}deg)`;  // Roter kuglen

    // Beregn hvilket tal kuglen lander på
    setTimeout(() => {
        const segmentIndex = Math.floor((spinAngle % 360) / (360 / wheelNumbers.length));
        currentNumber = wheelNumbers[segmentIndex];

        // Vise resultatet
        setTimeout(() => {
            alert(`Resultat: ${currentNumber.number} - ${currentNumber.color}`);
            checkBetResult(currentNumber);
        }, 1000);
    }, spinDuration * 1000);
});

// Funktion for at tjekke om bettet er korrekt
function checkBetResult(number) {
    if (betChoice === 'red' && number.color === 'red') {
        balance += betAmount * 2; // Vind på rød
    } else if (betChoice === 'black' && number.color === 'black') {
        balance += betAmount * 2; // Vind på sort
    } else if (betChoice === 'green' && number.color === 'green') {
        balance += betAmount * 14; // Vind på grøn
    }

    balanceElement.textContent = balance;
}
