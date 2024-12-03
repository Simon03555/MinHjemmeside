let balance = 100; // Startbalance
let currentBet = 0;
let currentColor = '';

document.getElementById('bet-red').addEventListener('click', function() {
    currentBet = parseInt(document.getElementById('bet-amount').value);
    currentColor = 'red';
    updateBalance();
});

document.getElementById('bet-black').addEventListener('click', function() {
    currentBet = parseInt(document.getElementById('bet-amount').value);
    currentColor = 'black';
    updateBalance();
});

document.getElementById('bet-green').addEventListener('click', function() {
    currentBet = parseInt(document.getElementById('bet-amount').value);
    currentColor = 'green';
    updateBalance();
});

document.getElementById('spin-button').addEventListener('click', function() {
    if (currentBet <= 0) {
        alert("Indtast et beløb før du spinner!");
        return;
    }

    const ball = document.getElementById("roulette-ball");
    const randomPosition = Math.floor(Math.random() * 580); // Random position på track
    const resultColor = getColor(randomPosition);
    
    // Flyt bolden
    ball.style.left = randomPosition + "px";
    
    // Resultat efter 4 sekunder
    setTimeout(function() {
        displayResult(resultColor);
        updateBalance(resultColor);
    }, 4000);
});

function getColor(position) {
    // Bestem farven afhængigt af boldens position
    if (position < 90) return 'red'; // Første del er rød
    if (position < 180) return 'black'; // Sort
    if (position < 270) return 'red'; // Rød igen
    if (position < 360) return 'black'; // Sort igen
    return 'green'; // Sidste del er grøn
}

function displayResult(resultColor) {
    // Vis resultatet på skærmen
    let resultText = `Du landede på: ${resultColor.toUpperCase()}`;
    document.getElementById('result').innerText = resultText;

    // Tjek om spilleren vinder
    if (resultColor === currentColor) {
        if (currentColor === 'green') {
            balance += currentBet * 14; // Grøn (0) giver større gevinst
        } else {
            balance += currentBet * 2; // Rød eller Sort
        }
        document.getElementById('result').innerText += "\nDu har vundet!";
    } else {
        balance -= currentBet; // Spilleren taber
        document.getElementById('result').innerText += "\nDu har tabt!";
    }

    updateBalance();
}

function updateBalance() {
    // Opdater spillerens balance på skærmen
    document.getElementById('balance').innerText = `Balance: $${balance}`;
}
