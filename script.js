let balance = 1000;
let currentBet = 0;
let betChoice = null;
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
const wheel = document.getElementById('roulette-wheel');
const wheelSegments = document.getElementById('wheel-segments');

// Opret hjulsegmenterne
function createWheel() {
    const anglePerSegment = 360 / wheelNumbers.length;
    
    wheelNumbers.forEach((segment, index) => {
        const angleStart = anglePerSegment * index;
        const angleEnd = anglePerSegment * (index + 1);
        const x1 = 100 + 90 * Math.cos(Math.PI * angleStart / 180);
        const y1 = 100 + 90 * Math.sin(Math.PI * angleStart / 180);
        const x2 = 100 + 90 * Math.cos(Math.PI * angleEnd / 180);
        const y2 = 100 + 90 * Math.sin(Math.PI * angleEnd / 180);

        // Skab segmenterne
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M100,100 L${x1},${y1} A90,90 0 ${anglePerSegment > 180 ? 1 : 0},1 ${x2},${y2} Z`);
        path.setAttribute("fill", segment.color);
        wheelSegments.appendChild(path);
        
        // Tilføj tal til segmenterne
        const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numberText.setAttribute("x", 100 + 70 * Math.cos(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("y", 100 + 70 * Math.sin(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("fill", "white");
        numberText.setAttribute("text-anchor", "middle");
        numberText.setAttribute("dominant-baseline", "middle");
        numberText.textContent = segment.number;
        wheelSegments.appendChild(numberText);
    });
}

// Initialiser roulettehjulet
createWheel();

// Håndter indsats
document.querySelectorAll('.bet').forEach((button) => {
    button.addEventListener('click', (e) => {
        betChoice = e.target.dataset.bet;
        currentBet = parseInt(betAmountInput.value);
    });
});

// Rul hjul og afgør vinder
spinButton.addEventListener('click', () => {
    if (!betChoice || currentBet <= 0 || currentBet > balance) {
        alert('Vælg venligst en indsats og værdi!');
        return;
    }

    // Spænd hjul og skjul indsatsknapper
    spinButton.disabled = true;
    document.querySelectorAll('.bet').forEach(button => button.disabled = true);

    // Simuler hjulrotation
    const rotation = Math.floor(Math.random() * wheelNumbers.length);
    const winningNumber = wheelNumbers[rotation];
    const rotationAngle = rotation * (360 / wheelNumbers.length);

    wheel.style.transition = 'transform 3s ease-out';
    wheel.style.transform = `rotate(-${rotationAngle + 1440}deg)`; // Rotation på 4 komplette drejninger for effekt

    setTimeout(() => {
        // Beregn og vis resultater
        const isWin = (betChoice === winningNumber.color) || (betChoice === 'green' && winningNumber.number === 0);
        if (isWin) {
            balance += currentBet * 2; // Dobbelt gevinst
            alert(`Du vandt! Nummer: ${winningNumber.number}`);
        } else {
            balance -= currentBet; // Tab
            alert(`Du tabte! Nummer: ${winningNumber.number}`);
        }

        // Opdater balance og genstart spil
        balanceElement.textContent = `Balance: ${balance}`;
        spinButton.disabled = false;
        document.querySelectorAll('.bet').forEach(button => button.disabled = false);
    }, 3000); // Vent til hjulet stopper
});
