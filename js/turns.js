import { gameState } from "./state.js";

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