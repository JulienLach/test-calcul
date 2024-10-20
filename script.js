// Initialisation des tableaux
let frequency = [1, 2, 3, 4];
let gravite = [1, 2, 3, 4];
let maitrise = [0.25, 0.5, 0.75, 1];
let criticite = ["0 à 2", "2 à 4", "4 à 8", "8 à 16"];

// Fonction pour sauvegarder les tableaux dans le local storage
function sauvegarderTableaux() {
    localStorage.setItem("frequency", JSON.stringify(frequency));
    localStorage.setItem("gravite", JSON.stringify(gravite));
    localStorage.setItem("maitrise", JSON.stringify(maitrise));
}

// Fonction pour charger les tableaux depuis le local storage
function chargerTableaux() {
    if (localStorage.getItem("frequency")) {
        frequency = JSON.parse(localStorage.getItem("frequency"));
        document.getElementById("frequencyInput").value = frequency.join(",");
    }
    if (localStorage.getItem("gravite")) {
        gravite = JSON.parse(localStorage.getItem("gravite"));
        document.getElementById("graviteInput").value = gravite.join(",");
    }
    if (localStorage.getItem("maitrise")) {
        maitrise = JSON.parse(localStorage.getItem("maitrise"));
        document.getElementById("maitriseInput").value = maitrise.join(",");
    }
}

// Fonction pour afficher les tableaux
function afficherTableaux() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `
                <p>Frequency: ${frequency.join(", ")}</p>
                <p>Gravite: ${gravite.join(", ")}</p>
                <p>Maitrise: ${maitrise.join(", ")}</p>
                <p>Criticite: 
                    <span class="criticite-1">${criticite[0]}</span>-
                    <span class="criticite-2">${criticite[1]}</span>-
                    <span class="criticite-3">${criticite[2]}</span>-
                    <span class="criticite-4">${criticite[3]}</span>
                </p>
            `;
}

// Calcul du risque maximum
function calculerRisqueMax() {
    const maxFrequency = Math.max(...frequency);
    const maxGravite = Math.max(...gravite);
    const maxMaitrise = Math.max(...maitrise);
    const risqueMax = maxFrequency * maxGravite * maxMaitrise;
    document.getElementById(
        "risqueMax"
    ).textContent = `Risque Maximum: ${risqueMax}`;
}

// Fonction pour recalculer les intervalles de criticité
function recalculerCriticite() {
    const maxFrequency = Math.max(...frequency);
    const maxGravite = Math.max(...gravite);
    const maxMaitrise = Math.max(...maitrise);
    const maxCriticite = maxFrequency * maxGravite * maxMaitrise;

    criticite = [
        `0 à ${maxCriticite * 0.125}`,
        `${maxCriticite * 0.125} à ${maxCriticite * 0.25}`,
        `${maxCriticite * 0.25} à ${maxCriticite * 0.5}`,
        `${maxCriticite * 0.5} à ${maxCriticite}`,
    ];
}

// Fonction pour mettre à jour les tableaux
function mettreAJourTableaux() {
    frequency = document
        .getElementById("frequencyInput")
        .value.split(",")
        .map(Number);
    gravite = document
        .getElementById("graviteInput")
        .value.split(",")
        .map(Number);
    maitrise = document
        .getElementById("maitriseInput")
        .value.split(",")
        .map(Number);
    document.getElementById("maitriseInput").value = maitrise.join(",");
    recalculerCriticite();
    afficherTableaux();
    calculerRisqueMax();
    sauvegarderTableaux();
}

// Fonction pour ajouter un échelon
function ajouterEchelon(type) {
    const input = document.getElementById(`${type}Input`);
    const values = input.value.split(",").map(Number);
    if (values.length >= 10) {
        document.getElementById("error-message").textContent =
            "Vous ne pouvez pas ajouter plus de 10 échelons.";
        return;
    }
    if (type === "maitrise") {
        values.push(values[values.length - 1] + 0.25);
    } else {
        values.push(values[values.length - 1] + 1);
    }
    input.value = values.join(",");
    document.getElementById("error-message").textContent = "";
    mettreAJourTableaux();
}

// Fonction pour supprimer un échelon
function supprimerEchelon(type) {
    const input = document.getElementById(`${type}Input`);
    const values = input.value.split(",").map(Number);
    if (values.length <= 4) {
        document.getElementById("error-message").textContent =
            "Vous ne pouvez pas avoir moins de 4 échelons.";
        return;
    }
    values.pop(); // Supprimer le dernier échelon
    input.value = values.join(",");
    document.getElementById("error-message").textContent = "";
    mettreAJourTableaux();
}

// Charger les tableaux depuis le local storage au chargement de la page
window.onload = function () {
    chargerTableaux();
    afficherTableaux();
    calculerRisqueMax();
};
