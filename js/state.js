export const deckid = JSON.parse(localStorage.getItem("deckMythoria"));
export const gameState = 
    {player : 
    {
        hp : 3000,camp : null,deck:[],hand:[],battlefield:[]
    } , opponent : {
        hp : 3000,camp : null,deck:[],hand:[],battlefield:[]
    } ,
    currentTurn : null,
    turnNumber : 1,
    gameOver : false,
};