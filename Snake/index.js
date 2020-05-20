window.onload = function() {
	const grid = document.querySelector(".grid");

	const result = document.querySelector("#result");

	let interval = 0;
	let score = 0;
	let currentIndex = 0;
	let currentSnake = [2, 1, 0];
	let appleIndex = 0;
	let direction = 1;
	let speed = 0.9;
	let intervalTime = 0;

	function createBoard() {
		const y = parseInt(document.querySelector("#dim-y").value);
		console.log("redovete sa: ", y);
		const x = parseInt(document.querySelector("#dim-x").value);
		console.log("colonite sa: ", x);
		let wid = 20 * x;
		let hei = 20 * y;
		grid.style.width = wid;
		grid.style.height = hei;
		for (let i = 0; i < x * y; i++) {
			var block = document.createElement("div");
			grid.appendChild(block);
		}
	}
	createBoard();
	function start() {
		const squares = document.querySelectorAll(".grid div");
		//first reset
		squares.forEach((squeare) => squeare.classList.remove("snake"));
		squares.forEach((squeare) => squeare.classList.remove("apple"));
		clearInterval(interval);
		currentIndex = 0;
		currentSnake = [2, 1, 0];
		direction = 1;
		score = 0;
		intervalTime = 1000;
		randomApple();
		result.innerHTML = score;
		currentSnake.forEach((sn) => squares[sn].classList.add("snake"));
		interval = setInterval(moveSnake, intervalTime);
	}

	function randomApple() {
		const squares = document.querySelectorAll(".grid div");
		do {
			appleIndex = Math.floor(Math.random() * squares.length);
		} while (squares[appleIndex].classList.contains("snake"));
		squares[appleIndex].classList.add("apple");
	}

	function moveSnake() {
		//check for borders
		const squares = document.querySelectorAll(".grid div");
		const x = parseInt(document.querySelector("#dim-x").value);
		const y = parseInt(document.querySelector("#dim-y").value);
		let posX = currentSnake[0];
		// if (currentSnake[0] < x) {
		// 	posX = currentSnake[0];
		// } else {
		// 	posX = currentSnake[0] % x;
		// }
		// console.log(currentSnake[0]);
		// if (
		// 	(posX + direction === x && direction === 1) || // the right side is reached
		// 	(posX + direction < 0 && direction === -1) || //left side
		// 	(currentSnake[0] + x >= squares.length && direction === x) || //bottom
		// 	(currentSnake[0] - x < 0 && direction === -x) || //top
		// 	squares[currentSnake[0] + direction].classList.contains("snake")
		// )
		if (
			(posX % x === x - 1 && direction === 1) || // the right side is reached
			(posX % x === 0 && direction === -1) || //left side
			(posX + x >= x * y && direction === x) || //bottom
			(posX - x < 0 && direction === -x) || //top
			squares[posX + direction].classList.contains("snake")
		) {
			clearInterval(interval);
		}
		//ako nqkoe ot gornite e izpylnenno igrata svyrshva ako ne

		const tail = currentSnake.pop();
		squares[tail].classList.remove("snake");
		currentSnake.unshift(currentSnake[0] + direction);

		//deals with snake getting apple
		if (squares[currentSnake[0]].classList.contains("apple")) {
			squares[currentSnake[0]].classList.remove("apple");
			squares[tail].classList.add("snake");
			currentSnake.push(tail);
			randomApple();
			score++;
			result.textContent = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveSnake, intervalTime);
		}

		squares[currentSnake[0]].classList.add("snake");
	}

	function control(e) {
		// const squares = document.querySelectorAll(".grid div");
		// squares[currentIndex].classList.remove("snake"); //we are removing the class of snake from ALL the squares.
		const x = parseInt(document.querySelector("#dim-x").value);
		if (e.keyCode === 39) {
			direction = 1;
		} else if (e.keyCode === 38) {
			direction = -x;
		} else if (e.keyCode === 37) {
			direction = -1;
		} else if (e.keyCode === 40) {
			direction = +x;
		}
	}

	function clearBoard() {
		grid.innerHTML = "";
		result.innerHTML = "";
	}

	function playAgain() {
		clearBoard();
		createBoard();
	}

	const dims = document.querySelectorAll(".dimensions");
	dims.forEach((dim) => dim.addEventListener("change", playAgain));

	document.addEventListener("keyup", control);

	document.getElementById("newGame").addEventListener("click", start);
};
