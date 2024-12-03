let balance = 1000;

document.getElementById("spin-button").addEventListener("click", () => {
    const bet = parseInt(document.getElementById("bet-amount").value);
    const rouletteWheel = document.querySelector(".roulette-wheel");

    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert("Enter a valid bet amount!");
        return;
    }

    // Generate random spin
    const spinAngle = Math.random() * 360 + 720;
    rouletteWheel.style.transform = `rotate(${spinAngle}deg)`;

    // Hide betting area and update balance
    document.querySelector(".betting-area").style.display = "none";
    setTimeout(() => {
        document.querySelector(".betting-area").style.display = "block";
        balance -= bet;
        document.getElementById("balance").textContent = `Balance: $${balance}`;
    }, 4000);
});
