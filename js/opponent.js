import { gameState } from "./state.js";
import { invoauercarte, attaquer } from "./combat.js";

export function jouertouradvesaire()
{
    if (gameState.currentTurn !== "opponent" || gameState.gameOver)
    {
        return;
    }

    const opponent = gameState.opponent;

    if (opponent.hand.length > 0)
    {
        invoauercarte(opponent.hand[0], "opponent");
    }

    for (let i = 0; i < opponent.battlefield.length; i++)
    {
        if (gameState.gameOver)
        {
            break;
        }

        const attaquant = opponent.battlefield[i];
        const cible = gameState.player.battlefield[0] || null;

        attaquer(attaquant, cible, "opponent");
    }
}