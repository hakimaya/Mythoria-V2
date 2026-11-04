import { affichercarte } from "./ui.js";
import {deckid,gameState} from "./state.js";
import { shuffleDeck } from "./utils.js";

fetch("./data/cards.json")
    .then(function(response)
    {
        if(!response.ok){
            throw new Error("impossible");
        }
    
    return response.json();
})
    .then(function(cartes)
    {
        const deck = deckid.map(function(id){
            return cartes.find(function(carte){
                return carte.id === id;
            })
        })
        gameState.player.deck = shuffleDeck(deck);
        for(let i = 0;i<5;i++)
        {
            if(gameState.player.deck.length > 0 && gameState.player.hand.length < 5)
            {
                let drawn = gameState.player.deck.pop();
                gameState.player.hand.push(drawn);
            }
        }
        for(let i = 0 ; i < gameState.player.hand.length ; i++)
        {
            affichercarte(gameState.player.hand[i]);
        }
    })
    .catch(function(erreur)
    {
        console.error(erreur);
    })
;