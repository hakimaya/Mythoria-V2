import { invoauercarte } from "./combat.js";
import { gameState } from "./state.js";
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
    const battlefield =document.getElementById("player-battlefield");
    const slots = battlefield.children;
    for(let i = 0;i < slots.length;i++)
    {
        slots[i].textContent="";
        if (gameState.player.battlefield[i])
        {   
            const img = document.createElement("img");
            img.setAttribute("src",gameState.player.battlefield[i].image);
             img.setAttribute("alt",gameState.player.battlefield[i].nom);
            slots[i].append(img);
        }
    }
}
export function afficherterrainadversaire()
{
    const battlefieldop =document.getElementById("opponent-battlefield");
    const slots = battlefieldop.children;
    for(let i = 0;i < slots.length;i++)
    {
        slots[i].textContent="";
        if (gameState.opponent.battlefield[i])
        {   
            const img = document.createElement("img");
            img.setAttribute("src",gameState.opponent.battlefield[i].image);
             img.setAttribute("alt",gameState.opponent.battlefield[i].nom);
            slots[i].append(img);
        }
    }
}