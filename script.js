// Definerer de nødvendige DOM-elementer
const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const wheelContainer = document.getElementById('roulette-wheel');
const resultArea = document.getElementById('result-area');
const balanceElement = document.getElementById('balance');
const betChoiceButtons = document.querySelectorAll('.bet');

// Startbalance og spilstatus
let balance = 1000;
let wheelSpinning = false;
let betChoice = null;
let betAmount = 0;

// Roulette hjul information (kan udvides med flere farver og tal)
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
    // Tilføj flere numre her
];

// Funktion til at oprette hjul og segmenter
function createWheel() {
    const anglePerSegment = 360 / wheelNumbers.length;
    wheelNumbers.forEach((segment, index) => {
        const angleStart = anglePerSegment * index;
        const angleEnd = anglePerSegment * (index + 1);
        
        // Opretter hver sektor på hjulet som en del af et SVG
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M200,200 L${200 + 150 * Math.cos(Math.PI * angleStart / 180)},${200 + 150 * Math.sin(Math.PI * angleStart / 180)} A150,150 0 ${anglePerSegment > 180 ? 1 : 0},1 ${200 + 150 * Math.cos(Math.PI * angleEnd / 180)},${200 + 150 * Math.sin(Math.PI * angleEnd / 180)} Z`);
        path.setAttribute("fill", segment.color);
        path.setAttribute("stroke", "white");
        path.setAttribute("stroke-width", "2");
        wheelContainer.appendChild(path);

        // Lægger numrene på hjulet
        const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numberText.setAttribute("x", 200 + 120 * Math.cos(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("y", 200 + 120 * Math.sin(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("fill", "white");
        numberText.setAttribute("font-size", "14");
        numberText.setAttribute("text-anchor", "middle");
        numberText.setAttribute("dominant-baseline", "middle");
        numberText.textContent = segment.number;
        wheelContainer.appendChild(numberText);
    });
}

// Funktion til at spinne hjulet
function spinWheel() {
    if (wheelSpinning) return; // Forhindrer spin mens hjulet allerede roterer
    wheelSpinning = true;
    
    const randomAngle = Math.floor(Math.random() * 360);
    const spins = 5;
    const totalRotation = spins * 360 + randomAngle; // Total rotation af hjulet

    // Animering af hjulet
    wheelContainer.style.transition = 'transform 5s cubic-bezier(0.3, 1.3, 0.2, 1)';
    wheelContainer.style.transform = `rotate(${totalRotation}deg)`;

    // Håndtering af indsats
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

    // Simulere kuglen der stopper på et nummer
    setTimeout(() => {
        const winningSegment = wheelNumbers[Math.floor(((randomAngle + 180) % 360) / (360 / wheelNumbers.length))];
        alert(`Resultat: ${winningSegment.number} (${winningSegment.color})`);
        updateBalance(winningSegment);
        wheelSpinning = false;
    }, 5000); // Tidsramme for animationen
}

// Funktion til at opdatere balancen efter runden
function updateBalance(winningSegment) {
    if (betChoice === winningSegment.color) {
        balance += betAmount * 2; // Vinder dobbelt hvis farven matcher
    } else {
        balance -= betAmount; // Tab ved forkert valg
    }
    balanceElement.textContent = balance;
}

// Lytter til klik på spin-knappen
spinButton.addEventListener('click', () => {
    betAmount = parseInt(betAmountInput.value, 10);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Indtast venligst et gyldigt beløb.");
        return;
    }

    // Tjekker hvilket bet der er valgt
    const selectedBet = document.querySelector('button.selected');
    if (!selectedBet) {
        alert("Vælg en indsats (rød, sort eller grøn).");
        return;
    }
    betChoice = selectedBet.getAttribute('data-bet');

    // Spinner hjulet
    spinWheel();
});

// Lytter til klik på bets (rød, sort, grøn)
betChoiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Fjern tidligere valgte bet
        document.querySelectorAll('.bet').forEach(btn => btn.classList.remove('selected'));

        // Vælg aktuelt bet
        button.classList.add('selected');
        const betColor = button.innerText;
        resultArea.innerHTML = `Du har satset på ${betColor}`;
    });
});

// Start roulette hjulet ved at oprette det
createWheel();
