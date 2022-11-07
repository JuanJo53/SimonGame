var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
	if (!started) {
		nextSequence();
		started = true;
	}
});

$(".btn").click(function () {
	var userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	userClickedPattern = [];
	level++;
	var randNum = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randNum];
	gamePattern.push(randomChosenColour);

	$("#level-title").text("Level " + level);
	$("#" + randomChosenColour)
		.fadeOut()
		.fadeIn();
	playSound(randomChosenColour);
}
function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			console.log("success");
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		gameOver();
		console.log("wrong");
	}
}

function gameOver() {
	started = false;
	var audio = new Audio("sounds/wrong.mp3");
	audio.play();
	gamePattern = [];
	userClickedPattern = [];
	$("body").addClass("game-over");
	setTimeout(function () {
		$("body").removeClass("game-over");
	}, 200);
	$("#level-title").text("Game Over, Press Any Key to Restart");
	level = 0;
}
