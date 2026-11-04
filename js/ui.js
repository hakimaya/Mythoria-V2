import { gameState } from "./state";
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
}
export function carterestante()
{
    const len = document.getElementById("len");
    len.textContent = gameState.player.deck.length + " cartes restantes.";
}

