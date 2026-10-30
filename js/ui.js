import { carte } from "./state.js";

const mainplayer = document.querySelector("#player-hand");
const bouton = document.createElement("button");
bouton.textContent = carte.nom;
const image = document.createElement("img");
image.src = carte.image;
image.alt = carte.nom;
bouton.append(image);
mainplayer.append(bouton);


const spanatk = document.createElement("span");
spanatk.textContent = "ATK : " + carte.attaque;
bouton.append(spanatk);

const spanhp = document.createElement("span");
spanhp.textContent = " · HP :" + carte.hp;
bouton.append(spanhp);



