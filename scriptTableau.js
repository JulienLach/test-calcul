// Initialisation des tableaux
let frequency = [1, 2, 3, 4];
let gravite = [1, 2, 3, 4];
let maitrise = [0.25, 0.5, 0.75, 1];
let criticite = ["0 à 2", "2 à 4", "4 à 8", "8 à 16"];
let currentType = "";

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
    }
    if (localStorage.getItem("gravite")) {
        gravite = JSON.parse(localStorage.getItem("gravite"));
    }
    if (localStorage.getItem("maitrise")) {
        maitrise = JSON.parse(localStorage.getItem("maitrise"));
    }
}

// Fonction pour afficher les tableaux
function afficherTableaux() {
    const frequencyTableBody = document.getElementById("frequencyTableBody");
    const graviteTableBody = document.getElementById("graviteTableBody");
    const maitriseTableBody = document.getElementById("maitriseTableBody");

    frequencyTableBody.innerHTML = "";
    graviteTableBody.innerHTML = "";
    maitriseTableBody.innerHTML = "";

    frequency.forEach((val) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${val}</td>`;
        frequencyTableBody.appendChild(row);
    });

    gravite.forEach((val) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${val}</td>`;
        graviteTableBody.appendChild(row);
    });

    maitrise.forEach((val) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${val}</td>`;
        maitriseTableBody.appendChild(row);
    });
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
    recalculerCriticite();
    afficherTableaux();
    calculerRisqueMax();
    sauvegarderTableaux();
}

// Fonction pour ouvrir la modal
function ouvrirModal(type) {
    currentType = type;
    document.getElementById("myModal").style.display = "block";
}

// Fonction pour fermer la modal
function fermerModal() {
    document.getElementById("myModal").style.display = "none";
}

// Fonction pour ajouter une valeur depuis la modal
function ajouterValeur() {
    const valeur = parseFloat(document.getElementById("modalInput").value);
    if (isNaN(valeur)) {
        document.getElementById("error-message").textContent =
            "Veuillez entrer une valeur valide.";
        return;
    }
    let tableau;
    switch (currentType) {
        case "frequency":
            tableau = frequency;
            break;
        case "gravite":
            tableau = gravite;
            break;
        case "maitrise":
            tableau = maitrise;
            break;
        default:
            return;
    }
    if (tableau.length >= 10) {
        document.getElementById("error-message").textContent =
            "Vous ne pouvez pas ajouter plus de 10 échelons.";
        fermerModal();
        return;
    }
    tableau.push(valeur);
    tableau.sort((a, b) => a - b);
    document.getElementById("error-message").textContent = "";
    mettreAJourTableaux();
    fermerModal();
}

// Fonction pour supprimer un échelon
function supprimerEchelon(type) {
    let values;
    switch (type) {
        case "frequency":
            values = frequency;
            break;
        case "gravite":
            values = gravite;
            break;
        case "maitrise":
            values = maitrise;
            break;
        default:
            return;
    }
    if (values.length <= 4) {
        document.getElementById("error-message").textContent =
            "Vous ne pouvez pas avoir moins de 4 échelons.";
        return;
    }
    values.pop(); // Supprimer le dernier échelon
    document.getElementById("error-message").textContent = "";
    mettreAJourTableaux();
}

// Charger les tableaux depuis le local storage au chargement de la page
window.onload = function () {
    chargerTableaux();
    afficherTableaux();
    calculerRisqueMax();
};
