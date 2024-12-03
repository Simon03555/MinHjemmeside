let balance = 1000;
let currentBet = 0;
let spinAngle = 0;
let spinResult = 0;
let betChoice = "";

// Update the balance on page load
document.getElementById("balance").textContent = `Balance: $${balance}`;

document.querySelectorAll(".bet").forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all bet options
        document.querySelectorAll(".bet").forEach(b => b.classList.remove("active"));
        // Add active class to the selected bet
        button.classList.add("active");
        betChoice = button.dataset.bet;  // Store the selected bet choice
    });
});

document.getElementById("spin-button").addEventListener("click", () => {
    const betAmount = parseInt(document.getElementById("bet-amount").value);
    
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Please enter a valid bet amount!");
        return;
    }

    if (!betChoice) {
        alert("Please select a bet option!");
        return;
    }

    // Deduct bet amount from balance
    currentBet = betAmount;
    balance -= currentBet;
    document.getElementById("balance").textContent = `Balance: $${balance}`;

    // Disable betting during spin
    document.querySelector(".betting-area").style.display = "none";
    
    // Start spinning the wheel
    spinAngle = Math.random() * 360 + 720; // Random spin angle
    document.querySelector(".roulette-wheel").style.transform = `rotate(${spinAngle}deg)`;

    // After spin ends, show result and calculate winnings
    setTimeout(() => {
        // Calculate the resulting number from the wheel
        spinResult = Math.floor(((spinAngle % 360) / 360) * 37);  // Randomize result based on spin angle

        // Display the result
        showResult(betChoice);
        document.querySelector(".betting-area").style.display = "block";  // Re-enable betting area
    }, 4000);  // Spin duration is 4 seconds
});

function showResult(betChoice) {
    let winAmount = 0;
    let resultText = "";
    
    if (betChoice === "red" || betChoice === "black" || betChoice === "odd" || betChoice === "even") {
        winAmount = checkWinning(betChoice);
        if (winAmount > 0) {
            resultText = `You won! +$${winAmount}`;
        } else {
            resultText = `You lost!`;
        }
    } else if (betChoice === "green" && spinResult === 0) {
        winAmount = currentBet * 35; // Green (0) has the highest multiplier (35x)
        resultText = `You won! +$${winAmount}`;
    } else {
        resultText = `You lost!`;
    }

    balance += winAmount;
    document.getElementById("balance").textContent = `Balance: $${balance}`;
    document.querySelector(".result").textContent = resultText;
}

function checkWinning(betChoice) {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    if (betChoice === "red" && redNumbers.includes(spinResult)) {
        return currentBet * 2; // Red bet payout
    } else if (betChoice === "black" && blackNumbers.includes(spinResult)) {
        return currentBet * 2; // Black bet payout
    } else if (betChoice === "odd" && spinResult % 2 !== 0 && spinResult !== 0) {
        return currentBet * 2; // Odd bet payout
    } else if (betChoice === "even" && spinResult % 2 === 0 && spinResult !== 0) {
        return currentBet * 2; // Even bet payout
    }
    
    return 0; // No win
}
