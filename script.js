let balance = 1000; // Start balance
let betAmount = 0; // Indsats beløb
let betChoice = null; // Hvad er valget af indsats
let wheelSpinning = false; // Tjek om hjulet spinner
let spinResult = null; // Resultat af spin

// Roulette numre og farver
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

// Reference til DOM
const balanceElement = document.getElementById('balance');
const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const wheelSegments = document.getElementById('wheel-segments');
const ball = document.getElementById('ball');
const resultArea = document.getElementById('result-area');

// Opret hjul med segmenter
function createWheel() {
    const anglePerSegment = 360 / wheelNumbers.length;

    wheelNumbers.forEach((segment, index) => {
        const angleStart = anglePerSegment * index;
        const angleEnd = anglePerSegment * (index + 1);

        const segmentDiv = document.createElement('div');
        segmentDiv.style.transform = `rotate(${angleStart}deg)`;
        segmentDiv.innerText = segment.number;
        segmentDiv.style.backgroundColor = segment.color;
        segmentDiv.style.position = 'absolute';
        segmentDiv.style.top = '50%';
        segmentDiv.style.left = '50%';
        segmentDiv.style.transformOrigin = '0 100%';
        segmentDiv.style.fontSize = '20px';
        segmentDiv.style.color = 'white';
        segmentDiv.style.textAlign = 'center';
        segmentDiv.style.lineHeight = '40px';
        segmentDiv.style.width = '100px';
        segmentDiv.style.height = '40px';
        wheelSegments.appendChild(segmentDiv);
    });
}

// Opdater balancen
function updateBalance() {
    balanceElement.textContent = balance;
}

// Start spin
function spinWheel() {
    if (wheelSpinning) return;

    const betAmountInputVal = betAmountInput.value;
    if (betAmountInputVal <= 0 || betAmountInputVal > balance) {
        resultArea.textContent = 'Invalid bet amount!';
        return;
    }

    betAmount = parseInt(betAmountInputVal);
    balance -= betAmount;  // Træk indsatsen fra balancen
    updateBalance();

    wheelSpinning = true;

    // Roter hjulet (kuglen)
    const randomAngle = Math.floor(Math.random() * 360);
    const rotationDuration = Math.random() * 3 + 3; // Spin varighed (3-6 sekunder)
    wheelSegments.style.transition = `transform ${rotationDuration}s cubic-bezier(0.42, 0, 0.58, 1)`;
    wheelSegments.style.transform = `rotate(${360 * 5 + randomAngle}deg)`; // Flere hele rotationer før den stopper

    // Simuler kuglebevægelse
    ball.style.transition = `${rotationDuration}s ease-out`;
    ball.style.transform = `translate(-50%, -50%) rotate(${randomAngle}deg)`;

    // Vent til hjulet stopper og beregn resultatet
    setTimeout(() => {
        wheelSpinning = false;

        // Beregn hvilken sektion der lander på
        const wheelDeg = randomAngle % 360;
        const segmentIndex = Math.floor(wheelDeg / (360 / wheelNumbers.length));
        const winningSegment = wheelNumbers[segmentIndex];

        spinResult = winningSegment;
        displayResult(winningSegment);
    }, rotationDuration * 1000); // Vent på rotationens slutning
}

// Vis resultat
function displayResult(winningSegment) {
    let message = `The ball landed on ${winningSegment.number} (${winningSegment.color})`;

    // Tjek for vinder
    if (betChoice === winningSegment.color) {
        const winnings = betAmount * 2;
        balance += winnings;
        message += `. You won $${winnings}!`;
    } else {
        message += `. You lost $${betAmount}.`;
    }

    resultArea.textContent = message;
    updateBalance();
}

// Håndter bet valgmuligheder
const betButtons = document.querySelectorAll('.bet');
betButtons.forEach(button => {
    button.addEventListener('click', () => {
        betChoice = button.dataset.bet; // Sæt valg af indsats til rød, sort eller grøn
        resultArea.textContent = `You chose to bet on ${betChoice}`;
    });
});

// Spin knap funktion
spinButton.addEventListener('click', () => {
    spinWheel();
});

// Start hjulet ved side load
window.onload = createWheel;
