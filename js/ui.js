import { invoauercarte,attaquer } from "./combat.js";
import { gameState } from "./state.js";
let attaquantSelectionne = null;
const mainplayer = document.querySelector("#player-hand");




export function affichercarte(carte){
    const bouton = document.createElement("button");
    bouton.textContent = carte.nom;
    const image = document.createElement("img");
    image.src = carte.image;
    image.alt = carte.nom;
    bouton.append(image);

    const spanatk = document.createElement("span");
    spanatk.textContent = "ATK : " + carte.attaque;
    bouton.append(spanatk);

    const spanhp = document.createElement("span");
    spanhp.textContent = " · HP :" + carte.vie;
    bouton.append(spanhp);
    mainplayer.append(bouton);

    bouton.addEventListener("click", function(){
        invoauercarte(carte);
        affichermain();
        afficherterrain();
    })
}
export function carterestante()
{
    const len = document.getElementById("len");
    len.textContent = gameState.player.deck.length + " cartes restantes.";
}

export function checkturn()
{
    let camp = document.getElementById("camp-choice");
    if(gameState.currentTurn === "player")
    {
        camp.classList.remove("hidden");
    }
    else if (gameState.currentTurn === "opponent")
    {
        camp.classList.add("hidden");
    }
}
export function afficherCamps()
{
    const titreop = document.getElementById("Adversaire");
    const titrepl = document.getElementById("player");
    
    titrepl.textContent = "Vous — " + gameState.player.camp;
    titreop.textContent = "Adversaire - " + gameState.opponent.camp;
    
}
export function affichermain()
{
    mainplayer.textContent = "";
    for(let i = 0;i<gameState.player.hand.length;i++)
    {
        affichercarte(gameState.player.hand[i]);
    }
}

export function afficherterrain()
{
    const battlefield = document.getElementById("player-battlefield");
    const slots = battlefield.children;

    for (let i = 0; i < slots.length; i++)
    {
        slots[i].textContent = "";
        const carte = gameState.player.battlefield[i];

        if (carte)
        {
            const img = document.createElement("img");
            img.src = carte.image;
            img.alt = carte.nom;
            slots[i].append(img);

            img.addEventListener("click", function ()
            {
                if (gameState.currentTurn !== "player" || gameState.gameOver)
                {
                    return;
                }

                attaquantSelectionne = carte;

                if (gameState.opponent.battlefield.length === 0)
                {
                    attaquer(carte);
                    document.getElementById("opponent-hp").textContent =
                        "HP : " + gameState.opponent.hp;
                    attaquantSelectionne = null;
                }
            });
        }
    }
}

export function afficherterrainadversaire()
{
    const battlefield = document.getElementById("opponent-battlefield");
    const slots = battlefield.children;

    for (let i = 0; i < slots.length; i++)
    {
        slots[i].textContent = "";
        const cible = gameState.opponent.battlefield[i];

        if (cible)
        {
            const img = document.createElement("img");
            img.src = cible.image;
            img.alt = cible.nom;
            slots[i].append(img);

            img.addEventListener("click", function ()
            {
                if (attaquantSelectionne === null)
                {
                    return;
                }

                attaquer(attaquantSelectionne, cible);
                attaquantSelectionne = null;
                afficherterrainadversaire();
            });
        }
    }
}