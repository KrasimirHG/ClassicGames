window.onload = function() {
	const images = document.querySelectorAll("img");
	const squares = document.querySelectorAll(".square");
	let lastSquare;
	const scoreB = document.querySelector("#result");
	let score = 0;
	let remTime = 10;
	const dispTime = document.querySelector("#rem-time");

	function randomImage(squares) {
		const idx = Math.floor(Math.random() * squares.length);
		const square = squares[idx];
		if (square === lastSquare) {
			return randomImage(squares);
		}
		lastSquare = square;
		console.log(square);
		return square;
	}

	function randomTime(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	function whack() {
		let square = randomImage(squares);
		let time = randomTime(500, 900);

		square.firstElementChild.style.display = "block";
		setTimeout(() => {
			square.firstElementChild.style.display = "none";
			if (remTime > 0) whack();
		}, time);
	}

	function bam(e) {
		score++;
		scoreB.textContent = score;
	}

	function start() {
		score = 0;
		scoreB.textContent = score;
		remTime = 10;
		dispTime.textContent = remTime;
		whack();
		let timer = setInterval(function() {
			remTime--;
			console.log(remTime);
			dispTime.textContent = remTime;
			if (remTime < 1) clearInterval(timer);
		}, 1000);
	}

	images.forEach((img) => img.addEventListener("click", bam));
	document.querySelector("button").addEventListener("click", start);
};
