// Variabler
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
        numberText.setAttribute("font-size", "10");
        numberText.setAttribute("text-anchor", "middle");
        numberText.setAttribute("dominant-baseline", "middle");
        numberText.textContent = segment.number;
        wheelSegments.appendChild(numberText);
    });
}

createWheel();

// Håndter indsats
document.querySelectorAll('.bet').forEach((button) => {
    button.addEventListener('click', () => {
        betChoice = button.getAttribute('data-bet');
        betAmount = parseInt(betAmountInput.value) || 0;
    });
});

// Spin logik
spinButton.addEventListener('click', () => {
    if (wheelSpinning || betAmount <= 0 || betChoice === null) {
        alert("Udfyld indsatsen korrekt!");
        return;
    }

    // Opdater balance
    balance -= betAmount;
    balanceElement.textContent = balance;

    // Start spinning animation
    wheelSpinning = true;
    const spinAngle = Math.floor(Math.random() * 360) + 3600; // Spin hjulet mange gange
    const spinDuration = 5; // 5 sekunder
    const ballAnimationDuration = spinDuration * 1000;

    // Kuglens bevægelse
    ball.style.transition = `transform ${ballAnimationDuration}ms ease-out`;
    ball.style.transform = `rotate(${spinAngle}deg)`;

    // Hjulets bevægelse
    document.getElementById('wheel').style.transition = `transform ${spinDuration}s ease-out`;
    document.getElementById('wheel').style.transform = `rotate(${spinAngle}deg)`;

    // Vent på at hjulet stopper
    setTimeout(() => {
        const result = Math.floor((spinAngle % 360) / (360 / wheelNumbers.length));
        const winningNumber = wheelNumbers[result];
        const winMessage = `Det vindende nummer er ${winningNumber.number} (${winningNumber.color})`;

        // Vurdere om spilleren vinder
        let win = false;
        if (betChoice === winningNumber.color) {
            win = true;
            balance += betAmount * 2; // Spil vinder - 2x gevinst
        } else if (betChoice === 'green' && winningNumber.number === 0) {
            win = true;
            balance += betAmount * 14; // Grøn - højere gevinst
        }

        // Opdater balance
        balanceElement.textContent = balance;

        alert(win ? `Du vandt! ${winMessage}` : `Du tabte! ${winMessage}`);

        // Sæt spin tilbage til normal
        wheelSpinning = false;
    }, ballAnimationDuration);
});
