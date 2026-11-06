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

export function attaquer(attaquant, cible = null)
{
    if (gameState.currentTurn !== "player" || gameState.gameOver === true)
    {
        return;
    }

    if (!gameState.player.battlefield.includes(attaquant))
    {
        return;
    }

    const adversaire = gameState.opponent;

    if (cible === null)
    {
        if (adversaire.battlefield.length === 0)
        {
            adversaire.hp = adversaire.hp - attaquant.attaque;

            if (adversaire.hp <= 0)
            {
                adversaire.hp = 0;
                gameState.gameOver = true;
            }
        }

        return;
    }

    for (let i = 0; i < adversaire.battlefield.length; i++)
    {
        if (adversaire.battlefield[i] === cible)
        {
            cible.vie = cible.vie - attaquant.attaque;

            if (cible.vie <= 0)
            {
                adversaire.battlefield.splice(i, 1);
            }

            break;
        }
    }
}