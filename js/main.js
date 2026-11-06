import {afficherCamps, affichercarte, checkturn}from "./ui.js";
import "./cards.js";
import { turn, choisirCampAdversaire } from "./turns.js";
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
        afficherCamps();
        let camp = document.getElementById("camp-choice");
        camp.classList.add("hidden");
    }
})
const buttontenebre = document.getElementById("choose-dark");
buttontenebre.addEventListener("click",function(){
    if(gameState.currentTurn === "player" && gameState.player.camp === null && gameState.opponent.camp === null)
    {
        gameState.player.camp = "tenebres";
        gameState.opponent.camp = "lumiere";
        afficherCamps();
        let camp = document.getElementById("camp-choice");
        camp.classList.add("hidden");
    }
})
choisirCampAdversaire();
if(gameState.currentTurn === "opponent"){
    afficherCamps();
}