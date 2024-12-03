let balance = 1000;
let betAmount = 0;
let betChoice = null;
let wheelSpinning = false;

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

// Opret hjul med segmenter
function createWheel() {
    const anglePerSegment = 360 / wheelNumbers.length;

    wheelNumbers.forEach((segment, index) => {
        const angleStart = anglePerSegment * index;
        const angleEnd = anglePerSegment * (index + 1);
        const x1 = 200 + 150 * Math.cos(Math.PI * angleStart / 180);
        const y1 = 200 + 150 * Math.sin(Math.PI * angleStart / 180);
        const x2 = 200 + 150 * Math.cos(Math.PI * angleEnd / 180);
        const y2 = 200 + 150 * Math.sin(Math.PI * angleEnd / 180);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M200,200 L${x1},${y1} A150,150 0 ${anglePerSegment > 180 ? 1 : 0},1 ${x2},${y2} Z`);
        path.setAttribute("fill", segment.color);
        wheelSegments.appendChild(path);

        const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numberText.setAttribute("x", 200 + 120 * Math.cos(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("y", 200 + 120 * Math.sin(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("fill", "white");
        numberText.setAttribute("font-size", "12");
        numberText.setAttribute("text-anchor", "middle");
        numberText.setAttribute("dominant-baseline", "middle");
        numberText.textContent = segment.number;
        wheelSegments.appendChild(numberText);
    });
}

// Spind funktionen
function spinWheel() {
    if (wheelSpinning) return; // Undgå at spinne mens det allerede spinner
    wheelSpinning = true;
    
    const randomAngle = Math.floor(Math.random() * 360);
    const spins = 5; // Antal gange hjulet skal spinne
    const totalRotation = spins * 360 + randomAngle; // Total rotation (flere spins for effekt)

    // Animer hjulrotation
    document.getElementById("roulette-wheel").style.transition = 'transform 5s ease-out';
    document.getElementById("roulette-wheel").style.transform = `rotate(${totalRotation}deg)`;

    // Animer kugleanimationen
    const ballRotation = totalRotation + 180; // Kuglen skal rotere lidt bag hjulet
    ball.style.transition = 'transform 5s ease-out';
    ball.style.transform = `rotate(${ballRotation}deg)`;

    // Vent på at animationen er færdig
    setTimeout(() => {
        // Find resultatet
        const winningSegment = wheelNumbers[Math.floor(((randomAngle + 180) % 360) / (360 / wheelNumbers.length))];
        alert(`Resultat: ${winningSegment.number} (${winningSegment.color})`);
        updateBalance(winningSegment);
        wheelSpinning = false;
    }, 5000); // Samme tid som animationen varer
}

// Opdater brugerens balance
function updateBalance(winningSegment) {
    if (betChoice === winningSegment.color) {
        balance += betAmount * 2; // Bet på farve giver dobbelt gevinst
    } else {
        balance -= betAmount; // Tab ved forkert valg
    }
    balanceElement.textContent = balance;
}

// Lyt til spin-knappen
spinButton.addEventListener('click', () => {
    betAmount = parseInt(betAmountInput.value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Indtast venligst et gyldigt beløb.");
        return;
    }

    // Læs valg af bet
    const selectedBet = document.querySelector('button.selected');
    if (!selectedBet) {
        alert("Vælg en indsats (rød, sort eller grøn).");
        return;
    }

    betChoice = selectedBet.getAttribute('data-bet');

    // Spin hjulet
    spinWheel();
});

// Lyt til bets (rød, sort, grøn)
document.querySelectorAll('.bet').forEach(button => {
    button.addEventListener('click', () => {
        // Fjern tidligere valgte bet
        document.querySelectorAll('.bet').forEach(btn => btn.classList.remove('selected'));
        
        // Vælg aktuelt bet
        button.classList.add('selected');
    });
});

// Start hjulet ved at oprette det
createWheel();
