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

    const wheel = document.getElementById("roulette-wheel");
    const randomDegree = Math.floor(Math.random() * 360) + 720;
    
    // Spin rouletten
    wheel.style.transform = "rotate(" + randomDegree + "deg)";
    
    // Resultat efter 4 sekunder (venter på at hjulet stopper)
    setTimeout(function() {
        let result = getRouletteResult(randomDegree);
        displayResult(result);
        updateBalance(result);
    }, 4000); // Vente på at hjulet stopper
});

function getRouletteResult(degree) {
    // Bestem hvilken sektor hjulet lander på
    const sectors = [
        { number: 32, color: 'red' },
        { number: 15, color: 'black' },
        { number: 19, color: 'red' },
        { number: 4, color: 'black' },
        { number: 21, color: 'red' },
        { number: 2, color: 'black' },
        { number: 17, color: 'red' },
        { number: 34, color: 'black' },
        { number: 6, color: 'red' },
        { number: 27, color: 'black' },
        { number: 13, color: 'red' },
        { number: 36, color: 'black' },
        { number: 11, color: 'red' },
        { number: 30, color: 'black' },
        { number: 23, color: 'red' },
        { number: 35, color: 'black' },
        { number: 9, color: 'red' },
        { number: 22, color: 'black' },
        { number: 18, color: 'red' },
        { number: 29, color: 'black' },
        { number: 7, color: 'red' },
        { number: 28, color: 'black' },
        { number: 12, color: 'red' },
        { number: 25, color: 'black' },
        { number: 3, color: 'red' },
        { number: 26, color: 'black' },
        { number: 0, color: 'green' } // Grøn for 0
    ];

    const sectorIndex = Math.floor((degree % 360) / 36); // Hver sektor er 36 grader
    return sectors[sectorIndex];
}

function displayResult(result) {
    // Vis resultatet på skærmen
    let resultText = `Du landede på: ${result.number} (${result.color})`;
    document.getElementById('result').innerText = resultText;

    // Tjek om spilleren vinder
    if (result.color === currentColor) {
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
