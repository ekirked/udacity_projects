// define global variables
var cards = [];
var openCards = [];
var moves = 0;
var matches = 0;
var stars = 3;
var starsWord = "stars";
var startTime = 0;
var endTime = 0;


// create a starting deck of cards
var cardsStart = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];


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

	// reset moves counter to zero
	resetCount();

	// reset matches counter to zero
	matches = 0;

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

	// add event listener to each card
	cards = cardClick();

	// get stars panel from DOM and empty it
	var stars = $('.stars');
	stars.empty();

	// start with empty string
    var buildStars = '';
    // make three stars
    for (var i = 0; i < 3; i++) {
    	// use template literals to build HTML for each star
        buildStars += `<li><i class="fa fa-star"></i></li>`;
    }

    // use jquery .html method to create HTML for all the card
    stars.html(buildStars);

    // animate cards to indicate shuffling
    $('.card').transition({ rotate: '360deg' });

    // start game timer
    startTimer();

}


restart(cardsStart);


// cardClick function adds event listener for showing a card when clicked
function cardClick() {
	$('.card').on('click', function(event) {

		card = $(this);
	
		// call cardShow on this card to display it		
		cardShow(card);

		// call addCard on this card to add it to the current list of open cards
		addCard(card);

		// call checkCard on this card to see if it matches an open card
		checkCard(card);

	});
}


// cardShow function shows an individual card
function cardShow(card) {

	// add animation
	card.transition({
  		perspective: '100px',
  		rotateY: '-180deg'
	});

	// adds "open show" to card class
	card.addClass('open show');

}


// cardHide function hides an individual card
function cardHide(card) {

	// add animation (0 degrees reverses -180 from flip to show)
	card.transition({
  		perspective: '100px',
  		rotateY: '0deg'
	});

	// removes "open show" from card class
	card.removeClass('open show');

}


// addCard function adds the card to openCards list
function addCard(card) {

	openCards.push(card);

}


// removeCards function removes two cards from the list of opened cards
function removeCards() {

	openCards.pop();
	openCards.pop();

}


// add a little animation to the correct card
function celebrateCard(correctCard) {

	correctCard.transition({ scale: 1.3 });
	correctCard.transition({ scale: 1 });

}


// checkCard function checks to see if a new card matches an open card
function checkCard(card) {

	// checks whether the current list of open cards has a card in it already
	if (openCards.length > 1) {

		// gets the name of the card that's already open
		const openedCard = $('.deck li').get(openCards[0]);

		// call addCount to increment move counter
		addCount();

		// check to see if the two open cards match
		if (card.attr('data-name') === openCards[0].attr('data-name')) {

			// animate the two matched cards in an open position
				celebrateCard(card);
				celebrateCard(openCards[0]);

			// remove both cards from list of open cards
			removeCards();

			// increment match counter
			matches++;
			console.log("matches: " + matches);

		} else {

			// call cardHide function (with a delay) to hide incorrect matches
			setTimeout(function() {
				cardHide(card);
				console.log("hid the new card");
				cardHide(openCards[0]);
				console.log("hid the already-opened card");

				// remove both cards from list of open cards
				removeCards();

			}, 1200);			

		}

	} else {

		// this means the new card is the only one open
		return;

	}

	// if all 8 cards match, display a message with the final score
	if (matches >= 8) {

		// wait half a second before displaying success message and providing replay button
  		setTimeout(function() {

  			swal("Congrats!", "You won the game in " + moves + " moves, earning you " + stars + " " + starsWord + ".", "success", {
  				button: "Play again",
			});

  			// reset the game	
			restart(cardsStart);

		}, 500);

	} else { 
	};

}


// increment move counter
function addCount() {

	// increment the number of clicks
	moves++;

	// udpate HTML
	$('.moves').html(moves);

	// fix grammar of singular "1 move"
	if (moves === 1) {
		$('.move-word').html("Move");
	} else { 
		$('.move-word').html("Moves");
	};

	// remove one star at the 11th move and at the 17th move
	if (moves === 11) {
		$('.stars li').first().remove();
		stars--;
	} else if (moves === 17) {
		$('.stars li').first().remove();
		stars--;
		// reset starsWord to singular "star" to fix grammar
		starsWord = "star"
	} else { return };

}


// reset move counter
function resetCount() {

	// reset to zero
	moves = 0;

	// udpate HTML
	$('.moves').html(moves);

}


// set up event listener for restart button
$('.fa-repeat').on('click', function(event) {

	// event.preventDefault();
	restart(cardsStart);

	// clear current list of open cards
	removeCards();

});


// set up game timer
function startTimer() {

	startTime = Date.now();

	setInterval(function() {
		endTime = Date.now();
	    $(".clock").text(Math.floor((endTime - startTime) / 1000));
	}, 1000);

}
