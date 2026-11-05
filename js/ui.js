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
    
    titrepl.textContent = "Vous — lumiere";
    titreop.textContent = "Adversaire - tenebres";
    
}