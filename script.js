let balance = 1000;

document.getElementById("spin-button").addEventListener("click", () => {
    const bet = parseInt(document.getElementById("bet-amount").value);
    const rouletteWheel = document.querySelector(".roulette-wheel");

    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert("Enter a valid bet amount!");
        return;
    }

    // Start spinning
    const spinAngle = Math.random() * 360 + 720; // Minimum 2 full rotations
    rouletteWheel.style.transition = "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)";
    rouletteWheel.style.transform = `rotate(${spinAngle}deg)`;

    // Stop spinning and calculate result
    setTimeout(() => {
        const finalAngle = spinAngle % 360; // Angle within one rotation
        const resultIndex = Math.floor((finalAngle / 360) * 37); // Corresponding number

        balance -= bet;
        const resultDiv = document.querySelector(".result");
        const isWin = Math.random() > 0.5;

        if (isWin) {
            balance += bet * 2;
            resultDiv.textContent = `You won! Your new balance is $${balance}`;
        } else {
            resultDiv.textContent = `You lost! The ball landed on ${resultIndex}.`;
        }

        document.getElementById("balance").textContent = `Balance: $${balance}`;
    }, 4000); // Wait for spin to finish
});
