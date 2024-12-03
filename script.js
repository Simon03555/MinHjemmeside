const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const wheelSegments = document.getElementById('wheel-segments');
const ball = document.getElementById('ball');
const resultArea = document.getElementById('result-area');
const balanceElement = document.getElementById('balance-area');

let balance = 1000; // Start balance
let wheelSpinning = false;
let betChoice = null;
let betAmount = 0;

// Opret hjul med segmenter
const wheelNumbers = [
    { number: 0, color: 'green' },
    { number: 1, color: 'red' },
    { number: 2, color: 'black' },
    { number: 3, color: 'red' },
    { number: 4, color: 'black' },
    { number: 5, color: 'red' },
    { number: 6, color: 'black' },
    { number: 7, color: 'red' },
    { number: 8, color: 'black' },
    { number: 9, color: 'red' },
    // Tilføj flere segmenter efter behov
];

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

// Spind funktionen
function spinWheel() {
    if (wheelSpinning) return; // Undgå at spinne mens det allerede spinner
    wheelSpinning = true;

    const randomAngle = Math.floor(Math.random() * 360);
    const spins = 5; // Antal gange hjulet skal spinne
    const totalRotation = spins * 360 + randomAngle; // Total rotation (flere spins for effekt)

    // Start spin funktion
    document.getElementById("roulette-wheel").style.transition = 'transform 5s ease-out';
    document.getElementById("roulette-wheel").style.transform = `rotate(${totalRotation}deg)`;

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
    betAmount = parseInt(betAmountInput.value, 10);
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
        button.addEventListener('click', (e) => {
            betChoice = e.target.getAttribute('data-bet');
            const betColor = e.target.innerText;
            resultArea.innerHTML = `Du har satset på ${betColor}`;
        });
    });
});

// Start hjulet ved at oprette det
createWheel();
