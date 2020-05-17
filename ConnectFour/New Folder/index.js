window.onload = function() {
	//simulira istinska igra - pula pada vyzmojno na-dolu
	//broi redove 4 y=4 - broq redove
	// const y = 6;
	// const x = 7; //broi coloni
	const y = document.querySelector("#dim-y").value;
	const x = document.querySelector("#dim-x").value;
	var red = 0;

	function createBoard() {
		for (let i = 0; i < x * y - 1; i++) {
			var block = document.createElement("div");
			grid.appendChild(block);
		}
		for (let i = 0; i < x - 1; i++) {
			var block = document.createElement("div");
			block.classList.add("taken");
			grid.appendChild(block);
		}
	}

	const squares = document.querySelectorAll(".grid div");
	console.log(squares);
	let currentPlayer = 1;
	const cPlayer = document.querySelector("#current-player");

	for (let i = 0; i < squares.length; i++) {
		squares[i].onclick = function() {
			for (let j = 1; j < y; j++) {
				if (squares[i + x * j].classList.contains("taken")) {
					red = j - 1;
					break;
				} else red = j;
			}
			console.log(red);
			if (
				currentPlayer === 1 &&
				!squares[i + x * red].classList.contains("player-1") &&
				!squares[i + x * red].classList.contains("player-2")
			) {
				squares[i + x * red].classList.add("player-1");
				squares[i + x * red].classList.add("taken");
				squares[
					i + x * red
				].style.backgroundColor = document.querySelector(
					"#color1"
				).value;
				//
				currentPlayer = 2;
				cPlayer.innerHTML = currentPlayer;
				checkBoard(i + x * red);
			} else if (
				currentPlayer === 2 &&
				!squares[i + x * red].classList.contains("player-1") &&
				!squares[i + x * red].classList.contains("player-2")
			) {
				squares[i + x * red].classList.add("player-2");
				squares[i + x * red].classList.add("taken");
				squares[
					i + x * red
				].style.backgroundColor = document.querySelector(
					"#color2"
				).value;
				//
				currentPlayer = 1;
				cPlayer.innerHTML = currentPlayer;
				checkBoard(i + x * red);
			} else alert("Can't move there");
		};
	}

	function positX(i) {
		let positionX;
		if (i < x) {
			positionX = i;
		} else {
			positionX = i % x;
		}
		return positionX;
	}

	//proverka za pobeditel
	//pyrvo se generirat vyzmojnite pechelivshi kombinacii - masivi
	//i slsed tova dali vsqko pole sydyrja plaier-1 ili 2
	//obshto 12 vyzmovni varianta max
	function checkBoard(i) {
		let len = squares.length - x;
		let winArrs = [];
		//vyzmovni comb po x
		let posArr1 = [squares[i]];
		let positionX;
		if (i < x) {
			positionX = i;
		} else {
			positionX = i % x;
		}
		console.log("positionX is ", positionX);
		if (positionX + 1 < x) {
			posArr1.push(squares[i + 1]);
		}
		if (positionX + 2 < x) {
			posArr1.push(squares[i + 2]);
		}
		if (positionX + 3 < x) {
			posArr1.push(squares[i + 3]);
		}
		if (posArr1.length === 4) {
			winArrs.push(posArr1);
		}
		let posArr2 = [squares[i]];
		if (positionX + 1 < x) {
			posArr2.push(squares[i + 1]);
		}
		if (positionX + 2 < x) {
			posArr2.push(squares[i + 2]);
		}
		if (positionX - 1 >= 0) {
			posArr2.push(squares[i - 1]);
		}
		if (posArr2.length === 4) {
			winArrs.push(posArr2);
		}
		let posArr3 = [squares[i]];
		if (positionX + 1 < x) {
			posArr3.push(squares[i + 1]);
		}
		if (positionX - 1 >= 0) {
			posArr3.push(squares[i - 1]);
		}
		if (positionX - 2 >= 0) {
			posArr3.push(squares[i - 2]);
		}
		if (posArr3.length === 4) {
			winArrs.push(posArr3);
		}
		let posArr4 = [squares[i]];
		if (positionX - 1 >= 0) {
			posArr4.push(squares[i - 1]);
		}
		if (positionX - 2 >= 0) {
			posArr4.push(squares[i - 2]);
		}
		if (positionX - 3 >= 0) {
			posArr4.push(squares[i - 3]);
		}
		if (posArr4.length === 4) {
			winArrs.push(posArr4);
		}
		//************* x *************
		//vyzmovni comb po y
		let positionY;
		if (i < y) {
			positionY = i;
		} else {
			positionY = i % y;
		}
		console.log("positionY is ", positionY);
		let posArr5 = [squares[i]];
		if (i + x < squares.length - x) {
			posArr5.push(squares[i + x]);
		}
		if (i + x * 2 < squares.length - x) {
			posArr5.push(squares[i + x * 2]);
		}
		if (i + x * 3 < squares.length - x) {
			posArr5.push(squares[i + x * 3]);
		}
		if (posArr5.length === 4) {
			winArrs.push(posArr5);
		}
		let posArr6 = [squares[i]];
		if (i + x < squares.length - x) {
			posArr6.push(squares[i + x]);
		}
		if (i + x * 2 < squares.length - x) {
			posArr6.push(squares[i + x * 2]);
		}
		if (i - x >= 0) {
			posArr6.push(squares[i - x]);
		}
		if (posArr6.length === 4) {
			winArrs.push(posArr6);
		}
		let posArr7 = [squares[i]];
		if (i + x < squares.length - x) {
			posArr7.push(squares[i + x]);
		}
		if (i - x >= 0) {
			posArr7.push(squares[i - x]);
		}
		if (i - x * 2 >= 0) {
			posArr7.push(squares[i - x * 2]);
		}
		if (posArr7.length === 4) {
			winArrs.push(posArr7);
		}
		let posArr8 = [squares[i]];
		if (i - x >= 0) {
			posArr8.push(squares[i - x]);
		}
		if (i - x * 2 >= 0) {
			posArr8.push(squares[i - x * 2]);
		}
		if (i - x * 3 >= 0) {
			posArr8.push(squares[i - x * 3]);
		}
		if (posArr8.length === 4) {
			winArrs.push(posArr8);
		}
		//1st diagonal
		let posArr9 = [squares[i]];
		if (
			i + x + 1 > i &&
			i + x + 1 < len &&
			Math.abs(positionX - positX(i + x + 1)) < 4 //proverka vsichki
			//poleta da sa na razlichni redove
		) {
			posArr9.push(squares[i + x + 1]);
		}
		if (
			i + x * 2 + 2 > i &&
			i + x * 2 + 2 < len &&
			Math.abs(positionX - positX(i + x * 2 + 2)) < 4
		) {
			posArr9.push(squares[i + x * 2 + 2]);
		}
		if (
			i + x * 3 + 3 > i &&
			i + x * 3 + 3 < len &&
			Math.abs(positionX - positX(i + x * 3 + 3)) < 4
		) {
			posArr9.push(squares[i + x * 3 + 3]);
		}
		if (posArr9.length === 4) {
			winArrs.push(posArr9);
		}
		let posArr10 = [squares[i]];
		if (
			i + x + 1 > i &&
			i + x + 1 < len &&
			Math.abs(positionX - positX(i + x + 1)) < 4
		) {
			posArr10.push(squares[i + x + 1]);
		}
		if (
			i + x * 2 + 2 > i &&
			i + x * 2 + 2 < len &&
			Math.abs(positionX - positX(i + x * 2 + 2)) < 4
		) {
			posArr10.push(squares[i + x * 2 + 2]);
		}
		if (
			i - x - 1 < i &&
			i - x - 1 >= 0 &&
			Math.abs(positionX - positX(i - x - 1)) < 4
		) {
			posArr10.push(squares[i - x - 1]);
		}
		if (posArr10.length === 4) {
			winArrs.push(posArr10);
		}
		let posArr11 = [squares[i]];
		if (
			i + x + 1 > i &&
			i + x + 1 < len &&
			Math.abs(positionX - positX(i + x + 1)) < 4
		) {
			posArr11.push(squares[i + x + 1]);
		}
		if (
			i - x - 1 < i &&
			i - x - 1 >= 0 &&
			Math.abs(positionX - positX(i - x - 1)) < 4
		) {
			posArr11.push(squares[i - x - 1]);
		}
		if (
			i - x * 2 - 2 < i &&
			i - x * 2 - 2 >= 0 &&
			Math.abs(positionX - positX(i - x * 2 - 2)) < 4
		) {
			posArr11.push(squares[i - x * 2 - 2]);
		}
		if (posArr11.length === 4) {
			winArrs.push(posArr11);
		}
		let posArr12 = [squares[i]];
		if (
			i - x - 1 < i &&
			i - x - 1 >= 0 &&
			Math.abs(positionX - positX(i - x - 1)) < 4
		) {
			posArr12.push(squares[i - x - 1]);
		}
		if (
			i - x * 2 - 2 < i &&
			i - x * 2 - 2 >= 0 &&
			Math.abs(positionX - positX(i - x * 2 - 2)) < 4
		) {
			posArr12.push(squares[i - x * 2 - 2]);
		}
		if (
			i - x * 3 - 3 < i &&
			i - x * 3 - 3 >= 0 &&
			Math.abs(positionX - positX(i - x * 3 - 3)) < 4
		) {
			posArr12.push(squares[i - x * 3 - 3]);
		}
		if (posArr12.length === 4) {
			winArrs.push(posArr12);
		}
		//2nd diagonal
		let posArr13 = [squares[i]];
		if (
			i + x - 1 > i &&
			i + x - 1 < len &&
			Math.abs(positionX - positX(i + x - 1)) < 4
		) {
			posArr13.push(squares[i + x - 1]);
		}
		if (
			i + 2 * x - 2 > i &&
			i + 2 * x - 2 < len &&
			Math.abs(positionX - positX(i + 2 * x - 2)) < 4
		) {
			posArr13.push(squares[i + 2 * x - 2]);
		}
		if (
			i + 3 * x - 3 > i &&
			i + 3 * x - 3 < len &&
			Math.abs(positionX - positX(i + 3 * x - 3)) < 4
		) {
			posArr13.push(squares[i + 3 * x - 3]);
		}
		if (posArr13.length === 4) {
			winArrs.push(posArr13);
		}
		let posArr14 = [squares[i]];
		if (
			i + x - 1 > i &&
			i + x - 1 < len &&
			Math.abs(positionX - positX(i + x - 1)) < 4
		) {
			posArr14.push(squares[i + x - 1]);
		}
		if (
			i + 2 * x - 2 > i &&
			i + 2 * x - 2 < len &&
			Math.abs(positionX - positX(i + 2 * x - 2)) < 4
		) {
			posArr14.push(squares[i + 2 * x - 2]);
		}
		if (
			i - x + 1 < i &&
			i - x + 1 >= 0 &&
			Math.abs(positionX - ((i - x + 1) % x)) <= 3
		) {
			posArr14.push(squares[i - x + 1]);
		}
		if (posArr14.length === 4) {
			winArrs.push(posArr14);
		}
		let posArr15 = [squares[i]];
		if (
			i + x - 1 > i &&
			i + x - 1 < len &&
			Math.abs(positionX - positX(i + x - 1)) < 4
		) {
			posArr15.push(squares[i + x - 1]);
		}
		if (
			i - x + 1 < i &&
			i - x + 1 >= 0 &&
			Math.abs(positionX - positX(i - x + 1)) < 4
		) {
			posArr15.push(squares[i - x + 1]);
		}
		if (
			i - 2 * x + 2 < i &&
			i - 2 * x + 2 >= 0 &&
			Math.abs(positionX - positX(i - 2 * x + 2)) < 4
		) {
			posArr15.push(squares[i - 2 * x + 2]);
		}
		if (posArr15.length === 4) {
			winArrs.push(posArr15);
		}
		let posArr16 = [squares[i]];
		if (
			i - x + 1 < i &&
			i - x + 1 >= 0 &&
			Math.abs(positionX - positX(i - x + 1)) < 4
		) {
			posArr16.push(squares[i - x + 1]);
		}

		if (
			i - 2 * x + 2 < i &&
			i - 2 * x + 2 >= 0 &&
			Math.abs(positionX - positX(i - 2 * x + 2)) < 4
		) {
			posArr16.push(squares[i - 2 * x + 2]);
		}
		if (
			i - 3 * x + 3 < i &&
			i - 3 * x + 3 >= 0 &&
			Math.abs(positionX - positX(i - 3 * x + 3)) < 4
		) {
			posArr16.push(squares[i - 3 * x + 3]);
		}
		if (posArr16.length === 4) {
			winArrs.push(posArr16);
		}

		console.log(winArrs);

		for (let y = 0; y < winArrs.length; y++) {
			let square1 = winArrs[y][0];
			let square2 = winArrs[y][1];
			let square3 = winArrs[y][2];
			let square4 = winArrs[y][3];

			//now check those arrays to see if they all have the class of player-one
			if (
				square1.classList.contains("player-1") &&
				square2.classList.contains("player-1") &&
				square3.classList.contains("player-1") &&
				square4.classList.contains("player-1")
			) {
				//if they do, player-one is passed as the winner
				result.innerHTML = "Player one wins!";
				//remove ability to change result
			}
			//now check to see if they all have the classname player two
			else if (
				square1.classList.contains("player-2") &&
				square2.classList.contains("player-2") &&
				square3.classList.contains("player-2") &&
				square4.classList.contains("player-2")
			) {
				//if they do, player-two is passed as the winner as well as the chip positions
				result.innerHTML = "Player two wins!";
			}
		}
	}

	//1st diagonal
	// let posArr9 = [squares[i]];
	// if (positionX + x + 1 > positionX && positionY - 1 < positionY) {
	// 	posArr9.push(squares[i + x + 1]);
	// }
	// if (positionX + 2 * x + 2 > positionX && positionY - 2 < positionY) {
	// 	posArr9.push(squares[i + 2 * x + 2]);
	// }
	// if (positionX + 3 * x + 3 > positionX && positionY - 3 < positionY) {
	// 	posArr9.push(squares[i + 3 * x + 3]);
	// }
	// if (posArr9.length === 4) {
	// 	winArrs.push(posArr9);
	// }
	// let posArr10 = [squares[i]];
	// if (positionX + x + 1 > positionX && positionY - 1 < positionY) {
	// 	posArr10.push(squares[i + x + 1]);
	// }
	// if (positionX + 2 * x + 2 > positionX && positionY - 2 < positionY) {
	// 	posArr10.push(squares[i + 2 * x + 2]);
	// }
	// if (positionX - x - 1 < positionX && positionY + 1 > positionY) {
	// 	posArr10.push(squares[i - x - 1]);
	// }
	// if (posArr10.length === 4) {
	// 	winArrs.push(posArr10);
	// }
	// let posArr11 = [squares[i]];
	// if (positionX + x + 1 > positionX && positionY - 1 < positionY) {
	// 	posArr11.push(squares[i + x + 1]);
	// }
	// if (positionX - x - 1 < positionX && positionY + 1 > positionY) {
	// 	posArr11.push(squares[i - x - 1]);
	// }
	// if (positionX - 2 * x - 2 < positionX && positionY + 2 > positionY) {
	// 	posArr11.push(squares[i - 2 * x - 2]);
	// }
	// if (posArr11.length === 4) {
	// 	winArrs.push(posArr11);
	// }
	// let posArr12 = [squares[i]];
	// if (positionX - x - 1 < positionX && positionY + 1 > positionY) {
	// 	posArr12.push(squares[i - x - 1]);
	// }
	// if (positionX - 2 * x - 2 < positionX && positionY + 2 > positionY) {
	// 	posArr12.push(squares[i - 2 * x - 2]);
	// }
	// if (positionX - 3 * x - 3 < positionX && positionY + 3 > positionY) {
	// 	posArr12.push(squares[i - 3 * x - 3]);
	// }
	// if (posArr12.length === 4) {
	// 	winArrs.push(posArr12);
	// }
	// //2nd diagonal
	// let posArr13 = [squares[i]];
	// if (positionX + x - 1 < positionX && positionY - 1 < positionY) {
	// 	posArr13.push(squares[i + x - 1]);
	// }
	// if (positionX + 2 * x - 2 < positionX && positionY - 2 < positionY) {
	// 	posArr13.push(squares[i + 2 * x - 2]);
	// }
	// if (positionX + 3 * x - 3 < positionX && positionY - 3 < positionY) {
	// 	posArr13.push(squares[i + 3 * x - 3]);
	// }
	// if (posArr13.length === 4) {
	// 	winArrs.push(posArr13);
	// }
	// let posArr14 = [squares[i]];
	// if (positionX + x - 1 < positionX && positionY - 1 < positionY) {
	// 	posArr14.push(squares[i + x - 1]);
	// }
	// if (positionX + 2 * x - 2 < positionX && positionY - 2 < positionY) {
	// 	posArr14.push(squares[i + 2 * x - 2]);
	// }
	// if (positionX - x + 1 > positionX && positionY + 1 > positionY) {
	// 	posArr14.push(squares[i - x + 1]);
	// }
	// if (posArr14.length === 4) {
	// 	winArrs.push(posArr14);
	// }
	// let posArr15 = [squares[i]];
	// if (positionX + x - 1 < positionX && positionY - 1 < positionY) {
	// 	posArr15.push(squares[i + x + 1]);
	// }
	// if (positionX - x + 1 > positionX && positionY + 1 > positionY) {
	// 	posArr15.push(squares[i - x + 1]);
	// }
	// if (positionX - 2 * x + 2 > positionX && positionY + 2 > positionY) {
	// 	posArr15.push(squares[i - 2 * x + 2]);
	// }
	// if (posArr15.length === 4) {
	// 	winArrs.push(posArr15);
	// }
	// let posArr16 = [squares[i]];
	// if (positionX - x + 1 > positionX && positionY + 1 > positionY) {
	// 	posArr16.push(squares[i - x + 1]);
	// }
	// if (positionX - 2 * x + 2 > positionX && positionY + 2 > positionY) {
	// 	posArr16.push(squares[i - 2 * x + 2]);
	// }
	// if (positionX - 3 * x + 3 > positionX && positionY + 3 > positionY) {
	// 	posArr16.push(squares[i - 3 * x + 3]);
	// }
	// if (posArr16.length === 4) {
	// 	winArrs.push(posArr16);
	// }

	// for (let i = 0; i < squares.length; i++) {
	// 	squares[i].onclick = function() {
	// 		if (!squares[i + 7].classList.contains("taken")) {
	// 			if (!squares[i + 7 * 2].classList.contains("taken")) {
	// 				if (!squares[i + 7 * 3].classList.contains("taken")) {
	// 					if (currentPlayer === 1) {
	// 						squares[i + 7 * 3].classList.add("player-1");
	// 						squares[i + 7 * 3].classList.add("taken");
	// 						//
	// 						currentPlayer = 2;
	// 						cPlayer.innerHTML = currentPlayer;
	// 					} else {
	// 						squares[i + 7 * 3].classList.add("player-2");
	// 						squares[i + 7 * 3].classList.add("taken");
	// 						//
	// 						currentPlayer = 1;
	// 						cPlayer.innerHTML = currentPlayer;
	// 					}
	// 				} else {
	// 					//add
	// 					if (currentPlayer === 1) {
	// 						squares[i + 7 * 2].classList.add("player-1");
	// 						squares[i + 7 * 2].classList.add("taken");
	// 						//
	// 						currentPlayer = 2;
	// 						cPlayer.innerHTML = currentPlayer;
	// 					} else {
	// 						squares[i + 7 * 2].classList.add("player-2");
	// 						squares[i + 7 * 2].classList.add("taken");
	// 						//
	// 						currentPlayer = 1;
	// 						cPlayer.innerHTML = currentPlayer;
	// 					}
	// 				}
	// 			} else {
	// 				//add
	// 				if (currentPlayer === 1) {
	// 					squares[i + 7].classList.add("player-1");
	// 					squares[i + 7].classList.add("taken");
	// 					//
	// 					currentPlayer = 2;
	// 					cPlayer.innerHTML = currentPlayer;
	// 				} else {
	// 					squares[i + 7].classList.add("player-2");
	// 					squares[i + 7].classList.add("taken");
	// 					//
	// 					currentPlayer = 1;
	// 					cPlayer.innerHTML = currentPlayer;
	// 				}
	// 			}
	// 		} else {
	// 			//add
	// 			if (currentPlayer === 1) {
	// 				squares[i].classList.add("player-1");
	// 				squares[i].classList.add("taken");
	// 				//
	// 				currentPlayer = 2;
	// 				cPlayer.innerHTML = currentPlayer;
	// 			} else {
	// 				squares[i].classList.add("player-2");
	// 				squares[i].classList.add("taken");
	// 				//
	// 				currentPlayer = 1;
	// 				cPlayer.innerHTML = currentPlayer;
	// 			}
	// 		}
	// 	};
	// }

	// squares.forEach(
	// 	(square) =>
	// 		(square.onclick = function() {
	// 			square.classList.add("player-1");
	// 			square.style.backgroundColor = document.querySelector(
	// 				"#color1"
	// 			).value;
	// 		})
	// );
};
