export function shuffleDeck(deck)
{
    for(let i = deck.length - 1 ; i > 0;i--)
    {
        let j = Math.floor(Math.random() * (i + 1))
        let swap = deck[i];
        deck[i]=deck[j];
        deck[j] = swap;
    }
    return deck;
}