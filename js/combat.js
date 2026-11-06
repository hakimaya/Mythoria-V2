import { gameState } from "./state.js";

export function invoauercarte(carte){
    if(gameState.player.camp === null || gameState.opponent.camp === null)
    {
        return;
    }
    if(gameState.currentTurn != "player")
    {
        return;
    }
    if(gameState.gameOver === true)
    {
        return;
    }
    if(carte.type === "sort")
    {
        return;
    }
    if(gameState.player.battlefield.length < 10)
    {
        let index = -1;
        for(let i = 0;i < gameState.player.hand.length ; i++)
        {
            if(gameState.player.hand[i] === carte)
            {
                index = i;
                break;
            }
            
        }
        if(index === -1)
        {
            return;
        }
        let cartefromhand = gameState.player.hand.splice(index,1);
        gameState.player.battlefield.push(cartefromhand[0]);
    }
}