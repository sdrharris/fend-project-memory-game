/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');

// Global Scope
let openedCards = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Adding Event Listener
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') &&
    openedCards.length < 2) {
        openCard(clickTarget);
        addOpenCard(clickTarget);
        if (openedCards.length === 2) {
           checkForMatch(clickTarget);
        }
    }
});

// Toggling function
function openCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addOpenCard(clickTarget) {
    openedCards.push(clickTarget);
    console.log(openedCards);
}

// Check for match
function checkForMatch() {
    if (
        openedCards[0].firstElementChild.className ===
        openedCards[1].firstElementChild.className
    ) {
        openedCards[0],classList.toggle('match');
        openedCards[1].classList.toggle('match');
        openedCards = [];
    } else {
        setTimeout(() => { // setTimeout (callback function)
            openCard(openedCards[0]); // calling function
            openCard(openedCards[1]); // calling function
            openedCards = [];
        }, 1000); //designated time (1000ms)
    }
}