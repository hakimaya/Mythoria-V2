import { gameState } from "./state.js";

export function jouertouradvesaire()
{
    if(gameState.opponent.hand.length > 0 && gameState.opponent.battlefield.length < 10)
    {
        let ophand = gameState.opponent.hand.shift();
        gameState.opponent.battlefield.push(ophand);
    }
    
}