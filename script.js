let balance = 1000;

document.getElementById("spin-button").addEventListener("click", () => {
    const bet = parseInt(document.getElementById("bet-amount").value);

    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert("Enter a valid bet amount!");
        return;
    }

    const result = Math.floor(Math.random() * 12); // Random number
    const resultDiv = document.querySelector(".result");
    balance -= bet;

    if (result === 0) {
        balance += bet * 14; // Payout for hitting 0
        resultDiv.textContent = `You hit 0! You win $${bet * 14}!`;
    } else if (result % 2 === 0) {
        balance += bet * 2; // Payout for even numbers
        resultDiv.textContent = `You hit ${result}! You win $${bet * 2}!`;
    } else {
        resultDiv.textContent = `You lost! The ball landed on ${result}.`;
    }

    document.getElementById("balance").textContent = `Balance: $${balance}`;
});
