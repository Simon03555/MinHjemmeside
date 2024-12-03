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

// Start spin funktion
function startSpin() {
    if (wheelSpinning) return;

    // Hent indsats og opdater balance
    betAmount = parseInt(betAmountInput.value, 10);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Indtast et gyldigt beløb!");
        return;
    }
    if (betAmount > balance) {
        alert("Du har ikke nok penge til at satse dette beløb!");
        return;
    }
    balance -= betAmount;
    balanceElement.innerText = balance;

    // Spin hjulet
    wheelSpinning = true;
    const spinAngle = Math.floor(Math.random() * 360) + 1440; // Random angle
    const spinTime = 5; // Spin duration in seconds
    const rotation = `rotate(${spinAngle}deg)`;
    document.getElementById('roulette-wheel').style.transition = `transform ${spinTime}s ease-out`;
    document.getElementById('roulette-wheel').style.transform = rotation;

    // Start kuglens bevægelse
    setTimeout(() => {
        // Beregn resultat af spin
        const winningIndex = Math.floor((spinAngle % 360) / (360 / wheelNumbers.length));
        spinResult = wheelNumbers[winningIndex];

        // Vis resultat
        setTimeout(() => {
            displayResult(spinResult);
        }, 1000);
    }, spinTime * 1000);
}

// Vis resultat og opdater balance
function displayResult(result) {
    const resultMessage = `Vunden: ${result.number} (${result.color})`;
    resultArea.innerText = resultMessage;

    // Kontroller om spiller har vundet
    if ((betChoice === result.color && result.color !== 'green') || 
        (betChoice === 'green' && result.color === 'green')) {
        balance += betAmount * 2; // Gevinst for korrekt farve (dobbelt)
        balanceElement.innerText = balance;
    }
    wheelSpinning = false; // Reset spin status
}

// Håndter klik på indsatsknapper
document.querySelectorAll('.bet').forEach(button => {
    button.addEventListener('click', (e) => {
        betChoice = e.target.getAttribute('data-bet');
        document.querySelectorAll('.bet').forEach(b => b.style.backgroundColor = '#1abc9c');
        e.target.style.backgroundColor = '#16a085';
    });
});

// Håndter spin-knap klik
spinButton.addEventListener('click', startSpin);

// Start hjulet når siden indlæses
createWheel();
