import { gameState } from "./state.js";

const campsParType = {
    hero: "lumiere",
    monstre: "tenebres",
    minion: "tenebres"
};

export function invoauercarte(carte, cote = "player")
{
    if (gameState.gameOver || gameState.currentTurn !== cote)
    {
        return false;
    }

    if (gameState.player.camp === null || gameState.opponent.camp === null)
    {
        return false;
    }

    const joueur = gameState[cote];
    const index = joueur.hand.indexOf(carte);

    if (index === -1 || carte.type === "sort" || joueur.battlefield.length >= 10)
    {
        return false;
    }

    const campCarte = carte.camp || campsParType[carte.type];
    let coefficient = 1;

    if (campCarte && campCarte !== joueur.camp)
    {
        coefficient = 0.8;
    }

    const carteCombat = {
        ...carte,
        attaqueEffective: Math.round(carte.attaque * coefficient * 10) / 10,
        currentHp: Math.round(carte.vie * coefficient * 10) / 10,
        hasAttacked: false
    };

    joueur.hand.splice(index, 1);
    joueur.battlefield.push(carteCombat);
    return true;
}

export function attaquer(attaquant, cible = null, cote = "player")
{
    if (gameState.gameOver || gameState.currentTurn !== cote)
    {
        return false;
    }

    const joueur = gameState[cote];
    const adversaire = cote === "player" ? gameState.opponent : gameState.player;

    if (!joueur.battlefield.includes(attaquant) || attaquant.hasAttacked)
    {
        return false;
    }

    const degats = attaquant.attaqueEffective;

    if (cible === null)
    {
        if (adversaire.battlefield.length > 0)
        {
            return false;
        }

        adversaire.hp = Math.max(0, Math.round((adversaire.hp - degats) * 10) / 10);

        if (adversaire.hp === 0)
        {
            gameState.gameOver = true;
        }
    }
    else
    {
        const index = adversaire.battlefield.indexOf(cible);

        if (index === -1)
        {
            return false;
        }

        cible.currentHp = Math.round((cible.currentHp - degats) * 10) / 10;

        if (cible.currentHp <= 0)
        {
            adversaire.battlefield.splice(index, 1);
        }
    }

    attaquant.hasAttacked = true;
    return true;
}