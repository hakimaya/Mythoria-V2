import { invoauercarte, attaquer } from "./combat.js";
import { gameState } from "./state.js";

let attaquantSelectionne = null;
const mainplayer = document.getElementById("player-hand");

export function affichercarte(carte)
{
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "min-w-0 rounded-lg bg-gray-800 p-2 text-center hover:bg-purple-900";
    bouton.textContent = carte.nom;

    const image = document.createElement("img");
    image.src = carte.image;
    image.alt = "";
    image.className = "mx-auto my-2 h-24 w-full object-contain sm:h-32";
    bouton.append(image);

    const stats = document.createElement("span");
    stats.className = "block text-xs text-yellow-200";

    if (carte.type === "sort")
    {
        stats.textContent = "Sort";
    }
    else
    {
        stats.textContent = "ATK : " + carte.attaque + " · HP : " + carte.vie;
    }

    bouton.append(stats);
    mainplayer.append(bouton);

    bouton.addEventListener("click", function ()
    {
        invoauercarte(carte);
        affichermain();
        afficherterrain();
    });
}

export function carterestante()
{
    const len = document.getElementById("len");
    len.textContent = gameState.player.deck.length + " cartes restantes.";
}

export function checkturn()
{
    const camp = document.getElementById("camp-choice");

    if (gameState.currentTurn === "player" && gameState.player.camp === null)
    {
        camp.classList.remove("hidden");
    }
    else
    {
        camp.classList.add("hidden");
    }
}

export function afficherCamps()
{
    const titreop = document.getElementById("Adversaire");
    const titrepl = document.getElementById("player");

    titrepl.textContent = "Vous — " + gameState.player.camp;
    titreop.textContent = "Adversaire — " + gameState.opponent.camp;
}

export function affichermain()
{
    mainplayer.textContent = "";

    for (let i = 0; i < gameState.player.hand.length; i++)
    {
        affichercarte(gameState.player.hand[i]);
    }
}

function afficherCarteTerrain(slot, carte)
{
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "block w-full rounded text-center hover:bg-purple-800";

    const img = document.createElement("img");
    img.src = carte.image;
    img.alt = carte.nom;
    img.className = "mx-auto h-10 w-full object-contain sm:h-14";
    bouton.append(img);

    const attaque = document.createElement("span");
    attaque.className = "block text-xs leading-tight";
    attaque.textContent = "ATK " + carte.attaqueEffective;
    bouton.append(attaque);

    const vie = document.createElement("span");
    vie.className = "block text-xs leading-tight";
    vie.textContent = "HP " + carte.currentHp;
    bouton.append(vie);

    slot.append(bouton);
    return bouton;
}

export function afficherterrain()
{
    const slots = document.getElementById("player-battlefield").children;

    for (let i = 0; i < slots.length; i++)
    {
        slots[i].textContent = "";
        const carte = gameState.player.battlefield[i];

        if (!carte)
        {
            continue;
        }

        const bouton = afficherCarteTerrain(slots[i], carte);

        bouton.addEventListener("click", function ()
        {
            if (gameState.currentTurn !== "player" || gameState.gameOver || carte.hasAttacked)
            {
                return;
            }

            attaquantSelectionne = carte;

            if (gameState.opponent.battlefield.length === 0)
            {
                attaquer(carte);
                reinitialiserSelection();
                afficherEtatCombat();
            }
        });
    }
}

export function afficherterrainadversaire()
{
    const slots = document.getElementById("opponent-battlefield").children;

    for (let i = 0; i < slots.length; i++)
    {
        slots[i].textContent = "";
        const cible = gameState.opponent.battlefield[i];

        if (!cible)
        {
            continue;
        }

        const bouton = afficherCarteTerrain(slots[i], cible);

        bouton.addEventListener("click", function ()
        {
            if (attaquantSelectionne === null)
            {
                return;
            }

            attaquer(attaquantSelectionne, cible);
            reinitialiserSelection();
            afficherterrainadversaire();
            afficherEtatCombat();
        });
    }
}

export function reinitialiserSelection()
{
    attaquantSelectionne = null;
}

export function afficherEtatCombat()
{
    document.getElementById("player-hp").textContent =
        "HP : " + gameState.player.hp;

    document.getElementById("opponent-hp").textContent =
        "HP : " + gameState.opponent.hp;

    const statut = document.getElementById("turn-status");
    const bouton = document.getElementById("fintour");
    const campsManquants = gameState.player.camp === null ||
        gameState.opponent.camp === null;

    bouton.disabled = gameState.gameOver ||
        gameState.currentTurn !== "player" ||
        campsManquants;

    if (gameState.gameOver)
    {
        statut.textContent = gameState.player.hp <= 0 ? "Défaite" : "Victoire";
    }
    else if (campsManquants)
    {
        statut.textContent = "En attente du choix du camp";
    }
    else if (gameState.currentTurn === "opponent")
    {
        statut.textContent = "Tour " + gameState.turnNumber + " — Adversaire";
    }
    else
    {
        statut.textContent = "Tour " + gameState.turnNumber + " — Votre tour";
    }
}