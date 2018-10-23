/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');

// Shuffling the Cards
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) { // Adding new decks to the DOM
        deck.appendChild(card);
    }
}
shuffleDeck();

// Global Scope
let openedCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;


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
    if (isClickValid(clickTarget)) { 
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        openCard(clickTarget);
        addOpenCard(clickTarget);
        if (openedCards.length === 2) {
           checkForMatch(clickTarget);
           addMove();
           checkScore();
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

function isClickValid(clickTarget) {
    return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') && //bug fix to ensure target does NOT contain the class "match"
    openedCards.length < 2 &&
    !openedCards.includes(clickTarget)); // bug fix to return Boolean value withing the array
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
        matched++;
    } if (matched === TOTAL_PAIRS) {
        gameOver();
    } else { // if not a match
        setTimeout(() => { // setTimeout (callback function)
            openCard(openedCards[0]); // calling function
            openCard(openedCards[1]); // calling function
            openedCards = [];
        }, 1000); //designated time (1000ms)
    }
}

// Adding moves
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

// Check Score function
function checkScore() {
    if (moves === 16 || moves === 24) {
        hideStar();
    }
}

// Hiding Stars
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}
hideStar();
hideStar();

// setInterval for startClock
function startClock() {
    let clockId = setInterval(() => {
        time++;
        console.log(time);
    }, 1000);
}
startClock();

// Displaying the time
function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    clock.innerHTML = time;
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

// clearInterval to stop the clock
function stopClock() {
    clearInterval(clockId);
}

function toggleModal() {
    const modal = document.querySelector('.popup-modal__background');
    modal.classList.toggle('hide');
}
toggleModal(); // Open modal
toggleModal(); // Close modal

// Modal Statistics
function writeModalStats() {
    const timeStat = document.querySelector('.popup-time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.popup-moves');
    const starsStat = document.querySelector('.popup-stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(starCount);
    return starCount;
}

// Modal Buttons
document.querySelector('.popup_button_close').addEventListener('click', () => {
    toggleModal();
});

document.querySelector('.popup_button_replay').addEventListener('click', replayGame);

// Resetting the Game
function resetGame() {
    resetClockAndTime();
    resetMoves();
    resetStars();
    shuffleDeck();
    matched = 0;
    openedCards = [];
}

// Resetting ClockAndTime
function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

// Resetting Moves
function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

// Reseting Stars
function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.popup_button_replay').addEventListener('click', resetGame);

// gameOver
function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}