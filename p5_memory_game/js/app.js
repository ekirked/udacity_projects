// define variables

var cards = [];
var openCards = [];

// iterate through all cards in DOM and run a function against each one
// $('.card').each(function(index){
	// add current element in the loop to the cards array
	// cards.push($(this));
// });

// create a starting deck of cards
var cardsStart = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];

// testing: print list of cards
console.log(cards);


// shuffle function from http://stackoverflow.com/a/2450976
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


// restart function shuffles the list of cards and adds each card's HTML to the page
function restart(cards) {

	// call shuffle function on array of cards
    cards = shuffle(cards);

    // get deck from DOM and empty it
    var deck = $('.deck');
    deck.empty();

    // start with empty string
    var buildDeck = '';
    // use for...of loop to loop over the entire deck of cards
    for (const card of cards) {
    	// use template literals to build HTML for each card
        buildDeck += `<li class="card" data-name="${card}"><i class="fa fa-${card}"></i></li>`;
    }
    // use jquery .html method to create HTML for all the card
    deck.html(buildDeck);

    // testing: show all the cards by adding "open show" to each card
    // deck.find('li').addClass('open show');

	// testing: print list of shuffled cards
	console.log(cards);

	// add event listener to each card
	cards = cardClick();

}

restart(cardsStart);

// cardClick function adds event listener for showing a card when clicked
function cardClick() {
	$('.card').on('click', function(event) {

		card = $(this)
	
		// call cardShow on this card to display it		
		cardShow(card);

		// call addCard on this card to add it to the current list of open cards
		addCard(card);

		// call checkCard on this card to see if it matches an open card
		checkCard(card);
		
		// testing: print message to console
		console.log("individual card clicked, end of cardClick")
	});
}

// cardShow function shows an individual card by adding "open show"
function cardShow(card) {
	card.addClass('open show');
}

// addCard function adds the card to openCards list
function addCard(card) {
	openCards.push(card);

	// testing: print message to console
	console.log("individual card added to list of open cards")

	// testing: print current list of open cards
	console.log(openCards);
}

// checkCard function checks to see if a new card matches an open card
function checkCard(card) {

	// testing: print current length of list of open cards to console
	console.log("length of list of open cards: " + openCards.length);

	// checks whether the current list of open cards has a card in it already
	if (openCards.length > 1) {

		// testing: print message to console
		console.log("prints if openCards has something in it");

		// gets the name of the card that's already open
		const openedCard = $('.deck li').get(openCards[0]);

		// testing: print name of current card
		console.log("current card: " + card.attr('data-name'));

		// testing: print name of opened card
		console.log("opened card: " + openCards[0].attr('data-name'));

		// check to see if the two open cards match
		if (card.attr('data-name') === openCards[0].attr('data-name')) {

			// testing: print message to console
			console.log("these two cards match: " + card + " & " + openedCard);

		} else {

			// testing: print message to console
			console.log("these two cards do not match: " + card + " & " + openedCard);

		}

	} else {

		// this means the new card is the only one open
		console.log("there are no other open cards to compare against");

	}

}


// set up event listener for restart button
// let restartButton = $('.fa-repeat').val();
$('.fa-repeat').on('click', function(event) {
	// event.preventDefault();
	restart(cardsStart);
	// testing: print message to console
	console.log("restart button clicked")
});





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that 
      you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another 
      function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this 
        functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the 
        card's symbol (put this functionality in another function that you call 
        from this one)
 *    + increment the move counter and display it on the page (put this 
        functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put 
        this functionality in another function that you call from this one)
 */
