window.onload = function () {
	let currentIndex = 76;
	const x = 9;
	const y = 9;
	const squares = document.querySelectorAll(".grid div");
	const carsLeft = document.querySelectorAll(".car-left");
	const carsRight = document.querySelectorAll(".car-right");
	const logsRight = document.querySelectorAll(".log-right");
	const logsLeft = document.querySelectorAll(".log-left");
	const newGame = document.getElementById("newGame");
	const mask = document.querySelector(".mask");
	let interval = 0;
	let timeLeft = 11;

	function moveFrog(e) {
		console.log(e.keyCode);
		squares[currentIndex].classList.remove("frog");
		switch (e.keyCode) {
			case 38: //up
				if (currentIndex - x >= 0) currentIndex -= x;
				break;
			case 40: //down
				if (currentIndex + x < x * y) currentIndex += x;
				break;
			case 37: //left
				if (currentIndex % x !== 0) currentIndex -= 1;
				break;
			case 39: //right
				if (currentIndex % x !== x - 1) currentIndex += 1;
				break;
		}
		squares[currentIndex].classList.add("frog");
		win();
		lose();
		// if (win() || lose()) newGame.setAttribute("disabled", false);
	}

	function moveCars() {
		carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
		carsRight.forEach((carRight) => moveCarRight(carRight));
	}

	//move the car left on a time loop
	function moveCarLeft(carLeft) {
		switch (true) {
			case carLeft.classList.contains("c1"):
				carLeft.classList.remove("c1");
				carLeft.classList.add("c2");
				break;
			case carLeft.classList.contains("c2"):
				carLeft.classList.remove("c2");
				carLeft.classList.add("c3");
				break;
			case carLeft.classList.contains("c3"):
				carLeft.classList.remove("c3");
				carLeft.classList.add("c1");
				break;
		}
	}

	//move the car right on a time loop
	function moveCarRight(carRight) {
		// if (carRight.classList.contains("car-right", "c1"))
		// 			carRight.style.backgroundImage = "url('car3.svg')"; //work
		// carRight.style.backgroundColor = "green"; //work
		switch (true) {
			case carRight.classList.contains("c4"):
				carRight.classList.remove("c4");
				carRight.classList.add("c3");

				break;
			case carRight.classList.contains("c2"):
				carRight.classList.remove("c2");
				carRight.classList.add("c4");

				break;
			case carRight.classList.contains("c3"):
				carRight.classList.remove("c3");
				carRight.classList.add("c2");

				break;
		}
	}

	function moveLogs() {
		logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
		logsRight.forEach((logRight) => moveLogRight(logRight));
	}
	function moveLogLeft(logLeft) {
		switch (true) {
			case logLeft.classList.contains("l1"):
				logLeft.classList.remove("l1");
				logLeft.classList.add("l2");
				break;
			case logLeft.classList.contains("l2"):
				logLeft.classList.remove("l2");
				logLeft.classList.add("l3");
				break;
			case logLeft.classList.contains("l3"):
				logLeft.classList.remove("l3");
				logLeft.classList.add("l4");
				break;
			case logLeft.classList.contains("l4"):
				logLeft.classList.remove("l4");
				logLeft.classList.add("l5");
				break;
			case logLeft.classList.contains("l5"):
				logLeft.classList.remove("l5");
				logLeft.classList.add("l1");
				break;
		}
	}
	function moveLogRight(logRight) {
		switch (true) {
			case logRight.classList.contains("l1"):
				logRight.classList.remove("l1");
				logRight.classList.add("l5");
				break;
			case logRight.classList.contains("l2"):
				logRight.classList.remove("l2");
				logRight.classList.add("l1");
				break;
			case logRight.classList.contains("l3"):
				logRight.classList.remove("l3");
				logRight.classList.add("l2");
				break;
			case logRight.classList.contains("l4"):
				logRight.classList.remove("l4");
				logRight.classList.add("l3");
				break;
			case logRight.classList.contains("l5"):
				logRight.classList.remove("l5");
				logRight.classList.add("l4");
				break;
		}
	}

	function frogOnLogRight() {
		if (currentIndex > 18 && currentIndex <= 26) {
			squares[currentIndex].classList.remove("frog");
			currentIndex -= 1;
			squares[currentIndex].classList.add("frog");
		}
	}

	function frogOnLogLeft() {
		if (currentIndex >= 27 && currentIndex < 35) {
			squares[currentIndex].classList.remove("frog");
			currentIndex += 1;
			squares[currentIndex].classList.add("frog");
		}
	}

	function win() {
		if (squares[4].classList.contains("frog")) {
			alert("You Win");
			clearInterval(interval);
			//document.removeEventListener("keydown", moveFrog);
			// newGame.disabled = false;
			mask.style.display = "none";
		}
	}

	function lose() {
		if (
			timeLeft === 0 ||
			squares[currentIndex].classList.contains("c1") ||
			squares[currentIndex].classList.contains("c4") ||
			squares[currentIndex].classList.contains("l4") ||
			squares[currentIndex].classList.contains("l5")
		) {
			alert("You Lose");
			clearInterval(interval);
			//document.removeEventListener("keydown", moveFrog);
			// newGame.disabled = false;
			mask.style.display = "none";
		}
	}

	function moveAll() {
		timeLeft--;
		result.textContent = timeLeft;
		moveCars();
		moveLogs();
		frogOnLogLeft();
		frogOnLogRight();
		lose();
	}

	function start() {
		// newGame.disabled = true;
		mask.style.display = "block";
		squares[currentIndex].classList.remove("frog");
		currentIndex = 76;
		timeLeft = 10;
		document.addEventListener("keydown", moveFrog);
		interval = setInterval(moveAll, 1000);
	}

	newGame.addEventListener("click", start);
	document.addEventListener("keydown", moveFrog);
};
