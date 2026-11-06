import { afficherCamps, afficherEtatCombat, checkturn } from "./ui.js";
import { turn, choisirCampAdversaire, findutour } from "./turns.js";
import { gameState } from "./state.js";
import "./cards.js";

turn();
choisirCampAdversaire();
checkturn();

if (gameState.currentTurn === "opponent")
{
    afficherCamps();
}

afficherEtatCombat();

function choisirCampJoueur(campJoueur, campAdversaire)
{
    if (gameState.currentTurn !== "player" || gameState.player.camp !== null)
    {
        return;
    }

    gameState.player.camp = campJoueur;
    gameState.opponent.camp = campAdversaire;

    afficherCamps();
    checkturn();
    afficherEtatCombat();
}

const boutonLumiere = document.getElementById("choose-light");
boutonLumiere.addEventListener("click", function ()
{
    choisirCampJoueur("lumiere", "tenebres");
});

const boutonTenebres = document.getElementById("choose-dark");
boutonTenebres.addEventListener("click", function ()
{
    choisirCampJoueur("tenebres", "lumiere");
});

const boutonFinTour = document.getElementById("fintour");
boutonFinTour.addEventListener("click", findutour);