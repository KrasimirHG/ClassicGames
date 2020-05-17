window.onload = function() {
	var cardArray = [
		{
			name: "cheese",
			img: "img/cheeses1.png",
		},
		{
			name: "chocolate",
			img: "img/chocolate1.png",
		},

		{
			name: "hamburger",
			img: "img/hamburger1.png",
		},
		{
			name: "hotdog",
			img: "img/hotdog.png",
		},
		{
			name: "icecream",
			img: "img/IceCream.png",
		},
		{
			name: "pizza",
			img: "img/pizza1.png",
		},
		{
			name: "cheese",
			img: "img/cheeses1.png",
		},
		{
			name: "chocolate",
			img: "img/chocolate1.png",
		},

		{
			name: "hamburger",
			img: "img/hamburger1.png",
		},
		{
			name: "hotdog",
			img: "img/hotdog.png",
		},
		{
			name: "icecream",
			img: "img/IceCream.png",
		},
		{
			name: "pizza",
			img: "img/pizza1.png",
		},
	];

	cardArray.sort(() => 0.5 - Math.random());

	const grid = document.querySelector(".grid");
	const resultDisplay = document.querySelector("#result");
	var cardsChosen = [];
	var cardsChosenId = [];
	var cardsWon = [];

	function createBoard() {
		for (let i = 0; i < cardArray.length; i++) {
			var card = document.createElement("img");
			card.setAttribute("src", "img/cover.png");
			card.setAttribute("data-id", i);
			card.addEventListener("click", flipcard);
			grid.appendChild(card);
		}
	}

	function checkForMatch() {
		var cards = document.querySelectorAll("img");
		const optionOneId = cardsChosenId[0];
		const optionTwoId = cardsChosenId[1];
		if (cardsChosen[0] === cardsChosen[1]) {
			alert("You find a match");
			cards[optionOneId].setAttribute("src", "img/white.png");
			cards[optionTwoId].setAttribute("src", "img/white.png");
			cardsWon.push(cardsChosen);
		} else {
			cards[optionOneId].setAttribute("src", "img/cover.png");
			cards[optionTwoId].setAttribute("src", "img/cover.png");
			alert("Sorry, Try again !");
		}
		cardsChosenId = [];
		cardsChosen = [];
		resultDisplay.textContent = cardsWon.length;
		if (cardsWon.length === cardArray.length / 2) {
			resultDisplay.textContent = "Congratulations ! You finnd All";
		}
	}

	function flipcard() {
		var cardId = this.getAttribute("data-id");
		cardsChosen.push(cardArray[cardId].name);
		cardsChosenId.push(cardId);
		console.log(cardsChosen);
		this.setAttribute("src", cardArray[cardId].img);
		if (cardsChosen.length === 2) {
			setTimeout(checkForMatch, 500);
		}
	}

	//
	createBoard();
};
