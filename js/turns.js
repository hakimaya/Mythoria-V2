import { gameState } from "./state.js";
import { jouertouradvesaire } from "./opponent.js";
import {
    affichermain,
    afficherterrain,
    afficherterrainadversaire,
    carterestante,
    afficherEtatCombat,
    reinitialiserSelection
} from "./ui.js";
export function turn()
{
    let number = Math.random();
    if(number < 0.5)
    {
        gameState.currentTurn = "player";
    }
    else
        gameState.currentTurn = "opponent";
}
export function choisirCampAdversaire()
{
    if(gameState.currentTurn === "opponent" && gameState.player.camp === null && gameState.opponent.camp === null)
    {
        let random = Math.random();
        if(random < 0.5)
        {
            gameState.opponent.camp = "tenebres";
            gameState.player.camp = "lumiere";
        }
        else
        {
            gameState.opponent.camp = "lumiere";
            gameState.player.camp = "tenebres";
        }
            
    }
}

function preparerTour(joueur)
{
    for (let i = 0; i < joueur.battlefield.length; i++)
    {
        joueur.battlefield[i].hasAttacked = false;
    }

    if (joueur.hand.length < 5 && joueur.deck.length > 0)
    {
        joueur.hand.push(joueur.deck.pop());
    }
}

export function lancerTourAdversaire()
{
    if (gameState.currentTurn !== "opponent" || gameState.gameOver)
    {
        return;
    }

    reinitialiserSelection();
    preparerTour(gameState.opponent);
    jouertouradvesaire();

    if (!gameState.gameOver)
    {
        gameState.currentTurn = "player";
        gameState.turnNumber++;
        preparerTour(gameState.player);
    }

    affichermain();
    afficherterrain();
    afficherterrainadversaire();
    carterestante();
    afficherEtatCombat();
}

export function findutour()
{
    if (
        gameState.currentTurn !== "player" ||
        gameState.gameOver ||
        gameState.player.camp === null ||
        gameState.opponent.camp === null
    )
    {
        return;
    }

    gameState.currentTurn = "opponent";
    lancerTourAdversaire();
}