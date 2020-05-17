window.onload = function () {
	const grid = document.querySelector(".grid");

	const startButton = document.querySelector("#start");

	const y = parseInt(document.querySelector("#dim-y").value);
	console.log("y is ", y);
	document.querySelector("#dim-x").addEventListener("change", clearBoard);
	const x = parseInt(document.querySelector("#dim-x").value);
	console.log("x is ", x);
	document.querySelector("#dim-y").addEventListener("change", clearBoard);
	//let currentPosition = Math.floor(x / 2 - 1);
	let currentPosition;

	let currentRotation = 0;
	const colors = [
		"url(blue_block.png)",
		"url(purple_block.png)",
		"url(navy_block.png)",
		"url(pink_block.png)",
		"url(peach_block.png)",
		"url(yellow_block.png)",
	];
	let timer;
	const result = document.querySelector("#result");
	let currentIndex = 0;
	//let row = [];
	let score = 0;

	function createBoard() {
		const y = parseInt(document.querySelector("#dim-y").value);

		const x = parseInt(document.querySelector("#dim-x").value);
		currentPosition = Math.floor(x / 2 - 1);
		let wid = 20 * x;
		let hei = 20 * y;
		grid.style.width = wid;
		grid.style.height = hei;
		for (let i = 0; i < x * y; i++) {
			var block = document.createElement("div");
			block.classList.add("fon");
			grid.appendChild(block);
		}
		for (let i = 0; i < x; i++) {
			var block = document.createElement("div");
			block.classList.add("block3");
			grid.appendChild(block);
		}
	}

	createBoard();
	let squares = Array.from(grid.querySelectorAll("div"));

	function control(e) {
		console.log(e.keyCode);
		if (e.keyCode === 39) moveRight();
		else if (e.keyCode === 38 || e.keyCode === 82) rotate();
		else if (e.keyCode === 37) moveLeft();
		else if (e.keyCode === 40) moveDown();
		else if (e.keyCode === 68) draw();
		else if (e.keyCode === 69) erase();
	}

	// the classical behavior is to speed up the block if down button is kept pressed so doing that
	document.addEventListener("keydown", control);

	//The Tetrominoes
	const lTetromino = [
		[1, x + 1, x * 2 + 1, 2],
		[x, x + 1, x + 2, x * 2 + 2],
		[1, x + 1, x * 2 + 1, x * 2],
		[x, x * 2, x * 2 + 1, x * 2 + 2],
	];

	const zTetromino = [
		[0, x, x + 1, x * 2 + 1],
		[x + 1, x + 2, x * 2, x * 2 + 1],
		[0, x, x + 1, x * 2 + 1],
		[x + 1, x + 2, x * 2, x * 2 + 1],
	];

	const tTetromino = [
		[1, x, x + 1, x + 2],
		[1, x + 1, x + 2, x * 2 + 1],
		[x, x + 1, x + 2, x * 2 + 1],
		[1, x, x + 1, x * 2 + 1],
	];

	const oTetromino = [
		[0, 1, x, x + 1],
		[0, 1, x, x + 1],
		[0, 1, x, x + 1],
		[0, 1, x, x + 1],
	];

	const iTetromino = [
		[1, x + 1, x * 2 + 1, x * 3 + 1],
		[x, x + 1, x + 2, x + 3],
		[1, x + 1, x * 2 + 1, x * 3 + 1],
		[x, x + 1, x + 2, x + 3],
	];

	const theTetrominoes = [
		lTetromino,
		zTetromino,
		tTetromino,
		oTetromino,
		iTetromino,
	];

	//Select random tetramino
	let random = Math.floor(Math.random() * theTetrominoes.length);
	console.log("random is ", random);
	//Select current rotation
	let current = theTetrominoes[random][currentRotation];
	console.log("current is ", current);
	let color = Math.floor(Math.random() * colors.length);

	//draw the tetramino
	function draw() {
		current.forEach((index) => {
			squares[currentPosition + index].classList.add("block");
			squares[currentPosition + index].style.backgroundImage =
				colors[color];
		});
	}

	//erase tetramino
	function erase() {
		current.forEach((index) => {
			squares[currentPosition + index].classList.remove("block");
			squares[currentPosition + index].style.backgroundImage = "none";
		});
	}

	function isRightEdge(index) {
		return (index + currentPosition) % x === x - 1;
	}
	function moveRight() {
		erase();

		const rightEdge = current.some(isRightEdge);

		if (!rightEdge) {
			currentPosition++;
		}
		if (
			current.some((index) =>
				squares[currentPosition + index].classList.contains("block2")
			)
		) {
			currentPosition -= 1;
		}
		draw();
	}

	function isLeftEdge(index) {
		return (index + currentPosition) % x === 0;
	}
	function moveLeft() {
		erase();

		const leftEdge = current.some(isLeftEdge);

		if (!leftEdge) {
			currentPosition--;
		}
		if (
			current.some((index) =>
				squares[currentPosition + index].classList.contains("block2")
			)
		) {
			currentPosition += 1;
		}
		draw();
	}

	function rotate() {
		erase();
		const rightEdge = current.some(isRightEdge);
		const leftEdge = current.some(isLeftEdge);
		if (rightEdge) {
			if (random === 4) {
				currentPosition -= 2;
				currentRotation++;
			} else {
				currentPosition -= 1;
				currentRotation++;
			}
		} else if (leftEdge) {
			if (random === 4) {
				currentPosition += 2;
				currentRotation++;
			} else {
				currentPosition += 1;
				currentRotation++;
			}
		} else {
			currentRotation++;
		}
		if (currentRotation === current.length) {
			currentRotation = 0;
		}
		current = theTetrominoes[random][currentRotation];
		console.log(current);
		draw();
	}

	function moveDown() {
		erase();
		currentPosition += x;
		console.log("currentPosition is", currentPosition);
		draw();
		freeze();
	}

	function freeze() {
		if (
			current.some(
				(index) =>
					squares[currentPosition + index + x].classList.contains(
						"block3"
					) ||
					squares[currentPosition + index + x].classList.contains(
						"block2"
					)
			)
		) {
			console.log("freeze");
			current.forEach((index) =>
				squares[currentPosition + index].classList.add("block2")
			);

			random = Math.floor(Math.random() * theTetrominoes.length);
			current = theTetrominoes[random][currentRotation];
			color = Math.floor(Math.random() * colors.length);
			currentPosition = Math.floor(x / 2 - 1);
			draw();
			res();
			gameOver();
		}
	}

	//Game Over
	function gameOver() {
		if (
			current.some((index) =>
				squares[currentPosition + index].classList.contains("block2")
			)
		) {
			result.innerHTML = "Game Over";
			clearInterval(timer);
		}
	}

	function res() {
		let red = [];
		for (currentIndex = 0; currentIndex < x * y; currentIndex += x) {
			for (let i = 0; i < x; i++) {
				red.push(currentIndex + i);
			}
			const row = red;
			red = [];
			// console.log(row);
			// const row = [
			// 	currentIndex,
			// 	currentIndex + 1,
			// 	currentIndex + 2,
			// 	currentIndex + 3,
			// 	currentIndex + 4,
			// 	currentIndex + 5,
			// 	currentIndex + 6,
			// 	currentIndex + 7,
			// 	currentIndex + 8,
			// 	currentIndex + 9,
			// ];
			console.log(row);
			if (
				row.every((index) =>
					squares[index].classList.contains("block2")
				)
			) {
				score += 10;
				result.innerHTML = score;
				row.forEach((index) => {
					squares[index].style.backgroundImage = "none";
					squares[index].classList.remove("block2");
					squares[index].classList.remove("block");
				});
				const removedSquares = squares.splice(currentIndex, x);
				console.log("removedSquares ", removedSquares);
				squares = removedSquares.concat(squares);
				console.log("all squares ", squares);
				//grid.innerHTML = "";
				squares.forEach((cell) => grid.appendChild(cell));
			}
		}
	}

	function clearBoard() {
		grid.innerHTML = "";
		result.innerHTML = "";

		createBoard();
	}

	startButton.addEventListener("click", () => {
		if (timer) {
			clearInterval(timer);
			timer = null;
		} else {
			timer = setInterval(moveDown, 1000);
		}
	});
};
