document.getElementById("spin-button").addEventListener("click", function() {
    var wheel = document.getElementById("roulette-wheel");
    
    // Generer en tilfældig vinkel mellem 0 og 360 grader
    var randomDegree = Math.floor(Math.random() * 360) + 720; // Minimum 720 grader for at gøre det til et par omgange
    
    // Roter hjulet
    wheel.style.transform = "rotate(" + randomDegree + "deg)";
    
    // Hent hvilken sektor der stoppede
    setTimeout(function() {
        var sectorIndex = Math.floor(((randomDegree % 360) / 360) * 10); // Der er 10 sektioner
        alert("Du landede på sektor " + (sectorIndex + 1)); // Sektor er 1-10
    }, 3000); // Vent på at hjulet stopper (3 sekunder)
});
