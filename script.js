var draw_normal = new Audio('draw_normal.wav');
var draw_suspense = new Audio('draw_suspense.mp3');
var draw_suspense_letter = new Audio('draw_suspense_letter.wav');
var draw_heartbeat = new Audio('draw_heartbeat.mp3');
var bgmusic = new Audio('bgmusic.mp3');
var clear_balls = new Audio('clear_balls.mp3');
var reset_pattern = new Audio('reset_pattern.mp3');

window.onload = function () {

	if (mainbingo) {
		playBGMusic();
		createPatternTable();

		bgmusic.addEventListener('ended', function () {
			this.currentTime = 0;
			this.play();
		}, false);
		draw_heartbeat.addEventListener('ended', function () {
			this.currentTime = 0;
			this.play();
		}, false);
	} else {
		generateCards(1);
	}

}

function playBGMusic() {
	bgmusic.play();
}

var currentGeneratedCard = 1;
function generateCards(cardNum) {
	mgaNalagayNa = [];
	var cardContents = "<tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr>";
	for (var yaxis = 1; yaxis <= 5; yaxis++) {
		cardContents += "<tr>";
		for (var xaxis = 1; xaxis <= 5; xaxis++) {

			if (yaxis == 3 && xaxis == 3) {
				cardContents += "<td class='free'>FREE</td>";
			} else {
				newData = tryGettingNumber(mgaNalagayNa, xaxis);
				if (newData != undefined) {
					cardContents += newData.generated;
					mgaNalagayNa = newData.mgaNalagayNa;
				} else {
					generateCards(cardNum);
				}


			}
		}
		cardContents += "</tr>";
	}
	if (currentGeneratedCard <= 6) {
		document.getElementById('card-' + cardNum).innerHTML = cardContents;
	}

	if (currentGeneratedCard != 7) {
		currentGeneratedCard++;
		generateCards(currentGeneratedCard);
	} else {

		document.getElementById('generating').style.transform = "scale(1.5)";
		document.getElementById('generating').style.opacity = "0";

		var allTables = document.getElementsByTagName('table');
		for (var i = 0; i < allTables.length; i++) {
			allTables[i].style.opacity = 1;
			allTables[i].style.transform = "scale(1) rotate(0deg)";
		}

		setTimeout(function () {
			document.getElementById('generating').style.display = "none";
			draw_normal.play();
		}, 1000);
	}
}

document.addEventListener("keypress", function (event) {
	if (isToClear) {
		if (event.keyCode == 49) {
			clearBalls();
		} else if (event.keyCode == 48) {
			noClearBalls();
		}
	} else {
		if (event.keyCode == 49) {
			drawBall(1);
		} else if (event.keyCode == 50) {
			drawBall(2);
		} else if (event.keyCode == 51) {
			showSuspense();
		} else if (event.keyCode == 48) {
			clearBalls();
		} else if (event.keyCode == 57) {
			resetPattern();
		} else if (event.keyCode == 56) {
			var tglMscBtn = document.getElementById('control-3');
			toggleMusic(tglMscBtn);
		} else if (event.keyCode == 55) {
			var tglSfxBtn = document.getElementById('control-33');
			toggleSfx(tglSfxBtn);
		} else if (event.keyCode == 54) {
			changeGameType();
		} else if (event.keyCode == 116 || event.keyCode == 84) { //tT
			var tglTTSBtn = document.getElementById('control-333');
			toggleTTS(tglTTSBtn);
		}
	}

	if (event.keyCode == 53) {
		if (refreshCounter == 5) {
			location.reload();
		} else {
			refreshCounter++;
		}
	} else {
		refreshCounter = 0;
	}

});

var curGameType = 1;

function changeGameType() {
	curGameType++;

	if (curGameType > 3) {
		curGameType = 1;
	}

	console.log(document.getElementById('game-input'));

	switch (curGameType) {
		case 1:
			document.getElementById('game-input').value = "NORMAL";
			break;
		case 2:
			document.getElementById('game-input').value = "LUCKY 7";
			break;
		case 3:
			document.getElementById('game-input').value = "BLACKOUT";
			break;
	}
}

function noClearBalls() {
	document.getElementById('reset-div').style.top = "-50%";
	isToClear = false;
}

var refreshCounter = 0;

var bg_music = true;
function toggleMusic(element) {
	if (!suspense) {
		if (bg_music) {
			bgmusic.pause();
			//bgmusic.currentTime = 0;
			element.innerHTML = 'TURN ON MUSIC [8]';
			bg_music = false;
		} else {
			bgmusic.play();
			element.innerHTML = 'TURN OFF MUSIC [8]';
			bg_music = true;
		}
	}

}

var sfx = true;
function toggleSfx(element) {
	if (sfx) {
		element.innerHTML = 'TURN ON SFX [7]';
		sfx = false;
	} else {
		element.innerHTML = 'TURN OFF SFX [7]';
		sfx = true;
	}
}

var tts = false;
function toggleTTS(element) {
	if (tts) {
		element.innerHTML = 'TURN ON HOST';
		tts = false;
	} else {
		element.innerHTML = 'TURN OFF HOST';
		tts = true;
	}
}

function createPatternTable() {
	var ptrn_tbl = document.getElementById('pattern-table');

	var patternContent = "<tr>" +
		"<th rowspan='6' class='other-cell'><span class='vertical-txt'>PATTERN</span></th>" +
		"<th class='tbl-head'>B</th>" +
		"<th class='tbl-head'>I</th>" +
		"<th class='tbl-head'>N</th>" +
		"<th class='tbl-head'>G</th>" +
		"<th class='tbl-head'>O</th>" +
		"</tr>";

	var letters = ['b', 'i', 'n', 'g', 'o'];

	for (var i = 1; i <= 5; i++) {
		patternContent += "<tr>";
		for (var x = 0; x < 5; x++) {
			if (i == 3 && x == 2) {
				patternContent += "<td class='tbl-free'>";
				patternContent += "FREE";
				patternContent += "</td>";
			} else {
				patternContent += "<td>";
				patternContent += "<input type='checkbox' id='ptrn-chkbx-" + letters[x] + i + "' class='ptrn-bx'>";
				patternContent += "<label for='ptrn-chkbx-" + letters[x] + i + "' class='ptrn-lbl'></label>";
				patternContent += "</td>";
			}

		}
		patternContent += "</tr>";
	}

	ptrn_tbl.innerHTML = patternContent;
}

function tryGettingNumber(nalagayNa, pos) {
	switch (pos) {
		case 1:
			randomInt = getRandomInt(1, 15);
			break;
		case 2:
			randomInt = getRandomInt(16, 30);
			break;
		case 3:
			randomInt = getRandomInt(31, 45);
			break;
		case 4:
			randomInt = getRandomInt(46, 60);
			break;
		case 5:
			randomInt = getRandomInt(61, 75);
			break;
	}

	if (nalagayNa.includes(randomInt)) {
		setTimeout(function () {
			tryGettingNumber(nalagayNa, pos);
		}, 10);
	} else {
		nalagayNa.push(randomInt);
		newData = {
			mgaNalagayNa: nalagayNa,
			generated: "<td>" + randomInt + "</td>"
		}
		return newData;

	}
}

function getRandomInt(min, max) {
	/*switch(pos) {
		case 0:
			min = 1;
			max = 15;
			break;
		case 1:
			min = 16;
			max = 30;
			break;
		case 2:
			min = 31;
			max = 45;
			break;
		case 3:
			min = 46;
			max = 60;
			break;
		case 4:
			min = 61;
			max = 75;
			break;
	}*/

	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var mgaNabolaNa = new Array();

function drawBall(type) {
	if (ballCount < 75) {
		if (!suspense) {
			bgmusic.volume = 0.2;
			var ball = document.getElementById('ball-draw');
			var randomInt = getRandomInt(1, 75);

			ball.style.transform = "scale(0) rotate(20deg)";

			if (mgaNabolaNa.includes(randomInt)) {
				drawBall(type);
			} else {

				if (type == 1) {
					setTimeout(function () {
						setBallDrawClass(ball, randomInt);
						if (sfx) {
							draw_normal.play();
						}

						ball.innerHTML = randomInt;
						ball.style.transform = "scale(1.2) rotate(-5deg)";
						setTimeout(function () {
							ball.style.transform = "scale(1) rotate(0deg)";
							if (tts) {
								var msg = new SpeechSynthesisUtterance();
								msg.text = "Number " + randomInt;
								msg.pitch = 2;
								msg.volume = 1;
								msg.rate = 0.7;
								speechSynthesis.speak(msg);
							}
							addToHistoryBoard(randomInt);
						}, 300);
					}, 300);

				} else {
					suspense = true;
					ball.style.filter = "blur(50px) grayscale(1)";
					ball.style.transition = "all 1.5s";
					if (sfx) {
						draw_heartbeat.play();
					}

					ball.style.top = "150px";
					setTimeout(function () {
						if (bg_music) {
							bgmusic.pause();
							//bgmusic.currentTime = 0;
						}

						document.getElementById('draw-history').style.opacity = "0";
						document.getElementById('bg').style.opacity = "0";
						document.getElementById('pattern-table').style.opacity = "0";
						document.getElementById('prize-div').style.opacity = "0";
						document.getElementById('game-div').style.opacity = "0";
						document.getElementById('control-0').style.opacity = "0";
						document.getElementById('control-1').style.opacity = "0";
						document.getElementById('control-2').style.opacity = "0";
						document.getElementById('control-3').style.opacity = "0";
						document.getElementById('control-33').style.opacity = "0";
						document.getElementById('control-4').style.opacity = "0";
						document.getElementById('control-5').style.opacity = "0";
						document.getElementById('control-6').style.opacity = "1";
						document.getElementById('ball-count').style.opacity = "0";

						if (sfx) {
							draw_suspense.play();
						}

						setBallDrawClass(ball, randomInt, true);
						ball.style.transform = "scale(2.2) rotate(-20deg)";
						setTimeout(function () {
							ball.innerHTML = "";
							ball.style.filter = "blur(0px) grayscale(0)";
							ball.style.transition = "all 0.3s";
							setTimeout(function () {
								if (sfx) {
									draw_suspense_letter.play();
								}
								setTimeout(function () {
									notYet = true;
								}, 1000);
								ball.style.transform = "scale(2) rotate(0deg)";
								suspenseBall = randomInt;
							}, 300);
						}, 1500);
					}, 300);
				}

				mgaNabolaNa.push(randomInt);
			}
		}
	}

}

var suspense = false;
var suspenseBall = 0;
var notYet = false;

function genRandomSuspense(min, max) {
	if (suspense) {
		document.getElementById('ball-draw').innerHTML = "<span>" + getRandomInt(min, max) + "</span>";
		setTimeout(function () {
			genRandomSuspense(min, max);
		}, 100);
	}
}

function showSuspense() {
	if (suspense && notYet) {
		suspense = false;
		notYet = false;
		document.getElementById('ball-draw').innerHTML = suspenseBall;
		if (bg_music) {
			bgmusic.play();
		}
		document.getElementById('draw-history').style.opacity = "1";
		document.getElementById('bg').style.opacity = "1";
		document.getElementById('pattern-table').style.opacity = "1";
		document.getElementById('prize-div').style.opacity = "1";
		document.getElementById('game-div').style.opacity = "1";
		document.getElementById('control-0').style.opacity = "1";
		document.getElementById('control-1').style.opacity = "1";
		document.getElementById('control-2').style.opacity = "1";
		document.getElementById('control-3').style.opacity = "1";
		document.getElementById('control-33').style.opacity = "1";
		document.getElementById('control-4').style.opacity = "1";
		document.getElementById('control-5').style.opacity = "1";
		document.getElementById('control-6').style.opacity = "0";
		document.getElementById('ball-count').style.opacity = "1";

		if (sfx) {
			draw_heartbeat.pause();
			draw_heartbeat.currentTime = 0;
			draw_normal.play();
		}

		document.getElementById('ball-draw').style.transform = "scale(2.2) rotate(-30deg)";
		setTimeout(function () {
			document.querySelector('#suspense-box').style.display = "none";
			document.getElementById('ball-draw').style.transform = "scale(2) rotate(0deg)";
			setTimeout(function () {
				document.getElementById('ball-draw').style.transform = "scale(1) rotate(0deg)";
				document.getElementById('ball-draw').style.top = "0px";
				setTimeout(function () {
					if (tts) {
						var msg = new SpeechSynthesisUtterance();
						msg.text = "Number " + randomInt;
						msg.pitch = 2;
						msg.volume = 1;
						msg.rate = 0.7;
						speechSynthesis.speak(msg);
					}
					addToHistoryBoard(suspenseBall);
				}, 300);
			}, 400);
		}, 400);
	}
}


var ballCount = 0;

function countBalls() {
	ballCount++;
	document.getElementById('ball-count').innerHTML = "Ball Count: " + ballCount + " / 75";
}

function setBallDrawClass(ball, randomInt, isSuspense = false) {
	ball.removeAttribute('class');
	var letter = "B";
	var borderColor = "";
	if (randomInt >= 1 && randomInt <= 15) {
		genRandomSuspense(1, 15);
		ball.classList.add('ball-draw-b');
		letter = "B";
		borderColor = "#ff3b3b";
	} else if (randomInt >= 16 && randomInt <= 30) {
		genRandomSuspense(16, 30);
		ball.classList.add('ball-draw-i');
		letter = "I";
		borderColor = "#0f95ab";
	} else if (randomInt >= 31 && randomInt <= 45) {
		genRandomSuspense(31, 45);
		ball.classList.add('ball-draw-n');
		letter = "N";
		borderColor = "#da8402";
	} else if (randomInt >= 46 && randomInt <= 60) {
		genRandomSuspense(46, 60);
		ball.classList.add('ball-draw-g');
		letter = "G";
		borderColor = "#26b303";
	} else if (randomInt >= 61 && randomInt <= 75) {
		genRandomSuspense(61, 75);
		ball.classList.add('ball-draw-o');
		letter = "O";
		borderColor = "#9C27B0";
	}

	setTimeout(function () {
		if (isSuspense) {
			document.querySelector('#suspense-box').style.borderColor = borderColor;
			document.querySelector('#suspense-box').style.display = "block";
		}

		if (tts) {
			var msg = new SpeechSynthesisUtterance();
			msg.text = "Sah letra nang " + letter;
			msg.pitch = 2;
			msg.volume = 1;
			msg.rate = 0.7;
			speechSynthesis.speak(msg);
		}
	}, 1500);
}

drawBoard();
function drawBoard() {
	var boards = ['b', 'i', 'n', 'g', 'o'];

	boards.forEach(function (e, i) {
		document.querySelector('#draw-history-' + e).innerHTML = "";
	});

	for (var bolillo = 1; bolillo <= 75; bolillo++) {
		if (bolillo >= 1 && bolillo <= 15) {
			letter = "b";
		} else if (bolillo >= 16 && bolillo <= 30) {
			letter = "i";
		} else if (bolillo >= 31 && bolillo <= 45) {
			letter = "n";
		} else if (bolillo >= 46 && bolillo <= 60) {
			letter = "g";
		} else if (bolillo >= 61 && bolillo <= 75) {
			letter = "o";
		}
		document.querySelector('#draw-history-' + letter).innerHTML += "<span>" + bolillo + "</span>";
	}
}

function addToHistoryBoard(bolillo) {
	countBalls();

	if (ballCount >= 75) {
		bgmusic.volume = 0.8;
	}

	var ballIndex = 0;
	if (bolillo >= 1 && bolillo <= 15) {
		letter = "b";
		ballIndex = bolillo;
	} else if (bolillo >= 16 && bolillo <= 30) {
		letter = "i";
		ballIndex = bolillo - 15;
	} else if (bolillo >= 31 && bolillo <= 45) {
		letter = "n";
		ballIndex = bolillo - 30;
	} else if (bolillo >= 46 && bolillo <= 60) {
		letter = "g";
		ballIndex = bolillo - 45;
	} else if (bolillo >= 61 && bolillo <= 75) {
		letter = "o";
		ballIndex = bolillo - 60;
	}

	var ball = document.querySelector('#draw-history-' + letter + ' span:nth-child(' + ballIndex + ')');
	if (ball) {
		ball.style.zIndex = ballCount + 1;
		ball.classList.add('drawn');
		ball.style.transform = "scale(3)";
		ball.style.boxShadow = "0px 5px 15px rgba(0,0,0,0.5)";
		setTimeout(function () {
			ball.style.transform = "scale(3) rotate(-45deg)"
			setTimeout(function () {
				ball.style.transform = "scale(3) rotate(45deg)"
				setTimeout(function () {
					ball.style.transform = "scale(3) rotate(0)"
					setTimeout(function () {
						ball.style.transform = "unset";
						ball.style.boxShadow = "unset";
					}, 100);
				}, 100);
			}, 100);
		}, 100);
	}

	// var content = document.getElementById('draw-history-' + letter).innerHTML;
	// content += "<span>" + bolillo + "</span>";
	// document.getElementById('draw-history-' + letter).innerHTML = content;
}

function resetPattern() {
	if (sfx) {
		reset_pattern.play();
	}

	var boxes = document.getElementsByClassName('ptrn-bx');

	for (var i = 0; i < boxes.length; i++) {
		boxes[i].checked = false;
	}
}

var isToClear = false;

function clearBalls() {

	if (isToClear) {

		document.getElementById('reset-div').style.top = "-50%";
		isToClear = false;

		if (suspense) {
			document.getElementById('draw-history').style.opacity = "1";
			document.getElementById('bg').style.opacity = "1";
			document.getElementById('pattern-table').style.opacity = "1";
			document.getElementById('prize-div').style.opacity = "1";
			document.getElementById('game-div').style.opacity = "1";
			document.getElementById('control-0').style.opacity = "1";
			document.getElementById('control-1').style.opacity = "1";
			document.getElementById('control-2').style.opacity = "1";
			document.getElementById('control-3').style.opacity = "1";
			document.getElementById('control-33').style.opacity = "1";
			document.getElementById('control-4').style.opacity = "1";
			document.getElementById('control-5').style.opacity = "1";
			document.getElementById('control-6').style.opacity = "0";
			document.getElementById('ball-count').style.opacity = "1";
			document.getElementById('ball-draw').style.top = "0px";
		}
		suspense = false;

		if (bg_music) {
			bgmusic.play();
		}

		if (sfx) {
			draw_heartbeat.pause();
			draw_heartbeat.currentTime = 0;
		}

		ballCount = 0;
		document.getElementById('ball-count').innerHTML = "Ball Count: 0 / 75";

		bgmusic.volume = 0.8;
		if (sfx) {
			clear_balls.play();
		}

		mgaNabolaNa = [];
		document.getElementById('ball-draw').style.transform = "scale(0) rotate(20deg)";
		document.getElementById('ball-draw').innerHTML = "0";

		var letters = ['b', 'i', 'n', 'g', 'o'];

		var span = document.querySelectorAll('#draw-history span');
		console.log(span);

		for (var x = 0; x < span.length; x++) {
			span[x].style.transform = "scale(0)";
		}

		setTimeout(function () {
			drawBoard();
			// for (var i = 0; i < 5; i++) {
			// 	document.getElementById('draw-history-' + letters[i]).innerHTML = "";
			// }
		}, 300);

		/*for(var i = 0; i < 5; i++) {
			document.getElementById('draw-history-'+letters[i]).style.filter = "blur(20px)";
			document.getElementById('draw-history-'+letters[i]).style.opacity = "0";
		}*/

		/*setTimeout(function(){
			for(var i = 0; i < 5; i++) {
				document.getElementById('draw-history-'+letters[i]).innerHTML = "";
			}
			setTimeout(function(){
				for(var i = 0; i < 5; i++) {
					document.getElementById('draw-history-'+letters[i]).style.filter = "blur(0px)";
					document.getElementById('draw-history-'+letters[i]).style.opacity = "1";
				}
			},300);
		},300);*/

	} else {
		document.getElementById('reset-div').style.top = "0";
		isToClear = true;
	}
}