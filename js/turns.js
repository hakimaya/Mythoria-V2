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

export function findutour()
{
    if(gameState.player.camp !== null && gameState.opponent.camp !== null && gameState.currentTurn === "player" && gameState.gameOver == false)
    {
        gameState.currentTurn = "opponent";
    }
}