import {affichercarte, checkturn}from "./ui.js";
import { turn } from "./turns.js";
import { gameState } from "./state.js";
turn();
checkturn();
const buttonLumiere = document.getElementById("choose-light");
buttonLumiere.addEventListener("click",function()
{
    if(gameState.currentTurn === "player" && gameState.player.camp === null && gameState.opponent.camp === null)
    {
        gameState.player.camp = "lumiere";
        gameState.opponent.camp = "tenebres";
        let camp = document.getElementById("camp-choice");
        camp.classList.add("hidden");
    }
})