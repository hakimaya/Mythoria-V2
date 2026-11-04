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
    })
    .catch(function(erreur)
    {
        console.error(erreur);
    })
;