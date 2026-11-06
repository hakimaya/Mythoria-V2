import {
    affichermain,
    carterestante,
    afficherterrainadversaire
} from "./ui.js";
import { deckid, gameState } from "./state.js";
import { shuffleDeck } from "./utils.js";
import { jouertouradvesaire } from "./opponent.js";

fetch("./data/cards.json")
    .then(function (response)
    {
        if (!response.ok)
        {
            throw new Error("Impossible de charger les cartes.");
        }

        return response.json();
    })
    .then(function (cartes)
    {
        const deckJoueur = [];
        const ids = deckid || [];

        for (let i = 0; i < ids.length; i++)
        {
            const carte = cartes.find(function (carte)
            {
                return carte.id === ids[i];
            });

            if (carte)
            {
                deckJoueur.push({ ...carte });
            }
        }

        gameState.player.deck = shuffleDeck(deckJoueur);

        for (let i = 0; i < 5; i++)
        {
            if (gameState.player.deck.length > 0 && gameState.player.hand.length < 5)
            {
                const carte = gameState.player.deck.pop();
                gameState.player.hand.push(carte);
            }
        }

        const creatures = [];

        for (let i = 0; i < cartes.length; i++)
        {
            if (cartes[i].type !== "sort")
            {
                creatures.push({ ...cartes[i] });
            }
        }

        gameState.opponent.deck = shuffleDeck(creatures);

        for (let i = 0; i < 5; i++)
        {
            if (gameState.opponent.deck.length > 0 && gameState.opponent.hand.length < 5)
            {
                const carte = gameState.opponent.deck.pop();
                gameState.opponent.hand.push(carte);
            }
        }

        affichermain();
        carterestante();

        if (gameState.currentTurn === "opponent")
        {
            jouertouradvesaire();
            gameState.currentTurn = "player";
            afficherterrainadversaire();
        }
    })
    .catch(function (erreur)
    {
        console.error(erreur);
    });