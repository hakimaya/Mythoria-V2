import { affichercarte } from "./ui.js";
import { carte, deckid} from "./state.js";

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
        console.log(deck);
    })
    .catch(function(erreur)
    {
        console.error(erreur);
    })
;