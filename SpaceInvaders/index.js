window.onload = function () {
	const grid = document.querySelector(".grid");
	const result = document.querySelector("#result");
	let interval = 0;
	let score = 0;
	let currentShooterIndex = 202;
	let currentIndex = 0;
	let direction = 1;
	const invadersTakenDown = [];

	const invaders = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		30,
		31,
		32,
		33,
		34,
		35,
		36,
		37,
		38,
		39,
	];

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
		const squares = document.querySelectorAll(".grid div");
		let currentIndex = 0;
		let currentShooterIndex = 202;
		squares[202].classList.add("shooter");
		invaders.forEach((invader) =>
			squares[currentIndex + invader].classList.add("invaders")
		);
	}

	createBoard();

	function start() {
		//reset
		clearInterval(interval);
		let score = 0;
		let currentShooterIndex = 202;
		let currentIndex = 0;
		let direction = 1;
		const invadersTakenDown = [];
		clearBoard();
		// const squares = document.querySelectorAll(".grid div");
		// let currentIndex = 0;
		// let currentShooterIndex = 202;
		// squares.forEach((sq) => sq.classList.remove("invaders"));
		// squares.forEach((sq) => sq.classList.remove("shooter"));
		// for (let i = 0; i < invaders.length; i++) {
		// 	squares[invaders[currentIndex + i]].classList.add("invaders");
		// }
		// squares[202].classList.add("shooter");
		// console.log(squares);
		interval = setInterval(invMove, 500);
	}

	//Invaders move
	function invMove() {
		const x = parseInt(document.querySelector("#dim-x").value);
		const squares = document.querySelectorAll(".grid div");
		// let leftEdge = 0;
		// let rightEdge = x;
		// let lastLeft = aliens[0];
		// let lastRight = aliens[aliens.length - 1];
		// if (lastRight % x === x - 1 && direction === 1) {
		// 	currentIndex += x;
		// 	direction = -1;
		// } else if (lastLeft % x === 0 && direction === -1) {
		// 	currentIndex += x;
		// 	direction = 1;
		// }

		const leftEdge = invaders[0] % x === 0;
		const rightEdge = invaders[invaders.length - 1] % x === x - 1;

		if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
			direction = x;
		} else if (direction === x) {
			if (leftEdge) direction = 1;
			else direction = -1;
		}

		// squares.forEach((sq) => sq.classList.remove("invaders"));
		for (let i = 0; i <= invaders.length - 1; i++) {
			squares[invaders[i]].classList.remove("invaders");
		}
		for (let i = 0; i <= invaders.length - 1; i++) {
			invaders[i] += direction;
		}
		// for (let i = 0; i < invaders.length; i++) {
		// 	squares[invaders[currentIndex + i]].classList.add("invaders");
		// }
		for (let i = 0; i <= invaders.length - 1; i++) {
			//ADD IF LATER
			if (!invadersTakenDown.includes(i)) {
				squares[invaders[i]].classList.add("invaders");
			}
		}

		// win();
		// lose();

		if (
			squares[currentShooterIndex].classList.contains("invaders", "shoot")
		) {
			result.textContent = "Game Over";
			squares[currentShooterIndex].classList.add("bam");
			clearInterval(interval);
		}

		for (let i = 0; i <= invaders.length - 1; i++) {
			if (invaders[i] > squares.length - (x - 1)) {
				result.textContent = "Game Over";
				clearInterval(interval);
			}
		}

		//ADD LATER
		if (invadersTakenDown.length === invaders.length) {
			result.textContent = "You Win";
			clearInterval(interval);
		}
	}

	//Shooter move
	function shooterMove(e) {
		console.log(e.keyCode);
		const squares = document.querySelectorAll(".grid div");
		const x = parseInt(document.querySelector("#dim-x").value);
		squares[currentShooterIndex].classList.remove("shooter");
		if (e.keyCode === 37 && currentShooterIndex % x > 0)
			currentShooterIndex -= 1;
		else if (e.keyCode === 39 && currentShooterIndex % x < x - 1)
			currentShooterIndex += 1;
		squares[currentShooterIndex].classList.add("shooter");
	}

	//shooter one shoot
	function shoot(e) {
		const squares = document.querySelectorAll(".grid div");
		const x = parseInt(document.querySelector("#dim-x").value);
		let currentShoot = currentShooterIndex;
		let shootInterval;
		// if (e.keyCode === 13) shootInterval = setInterval(shootDown, 100);

		function shootDown() {
			// squares[currentShoot].classList.remove("shoot");

			// currentShoot -= x;
			// squares[currentShoot].classList.add("shoot");
			// if (squares[currentShoot].classList.contains("invaders")) {
			// 	squares[currentShoot].classList.remove("invaders");
			// 	squares[currentShoot].classList.remove("shoot");
			// 	squares[currentShoot].classList.add("bam");
			// 	setTimeout(() => {
			// 		squares[currentShoot].classList.remove("bam");
			// 	}, 200);
			// 	score++;
			// 	invadersTakkenDown.push("invader");
			// 	clearInterval(shootInterval);
			// 	console.log("Indeksa e ", invaders.indexOf(currentShoot));
			// 	let ind = invaders.indexOf(currentShoot);
			// 	invaders.splice(ind, 1);
			// }
			// if (currentShoot < x) {
			// 	clearInterval(shootInterval);
			// 	setTimeout(
			// 		squares[currentShoot].classList.remove("shoot"),
			// 		100
			// 	);
			// }
			console.log("TCSh is ", currentShoot);
			squares[currentShoot].classList.remove("shoot");
			currentShoot -= x;
			squares[currentShoot].classList.add("shoot");
			if (squares[currentShoot].classList.contains("invaders")) {
				squares[currentShoot].classList.remove("shoot");
				squares[currentShoot].classList.remove("invaders");
				squares[currentShoot].classList.add("bam");

				setTimeout(
					() => squares[currentShoot].classList.remove("bam"),
					250
				);
				clearInterval(shootInterval);

				const alienTakenDown = invaders.indexOf(currentShoot);
				invadersTakenDown.push(alienTakenDown);
				console.log(invadersTakenDown);
				score++;
				result.textContent = score;
			}

			if (currentShoot < x) {
				clearInterval(shootInterval);
				setTimeout(
					() => squares[currentShoot].classList.remove("shoot"),
					100
				);
			}
		}
		switch (e.keyCode) {
			case 38:
				shootInterval = setInterval(shootDown, 100);
				break;
		}
	}

	function win() {
		if (invadersTakenDown.length === invaders.length) {
			clearInterval(interval);
			alert("You win");
		}
	}

	function lose() {
		const squares = document.querySelectorAll(".grid div");
		const x = parseInt(document.querySelector("#dim-x").value);
		if (
			squares[currentShooterIndex].classList.contains(
				"invaders",
				"shooter"
			) ||
			squares[squares.length - x].classList.contains("invaders")
		) {
			clearInterval(interval);
			alert("You lose");
		}
	}

	function clearBoard() {
		grid.innerHTML = "";
		createBoard();
	}

	document.querySelector("#newGame").addEventListener("click", start);
	document.addEventListener("keydown", shooterMove);
	document.addEventListener("keyup", shoot);
};
