//Generate random number and get corresponding random color picked
var randomNumber;
var buttonColor = ["green", "red", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var userChosenColor;
var level = 0;
var gameStarted = false;


//Game Start
$(document).keydown(function() {
  $("h1").text("level " + level);
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

//User button click
$(".btn").click(function() {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePressed(userChosenColor);
  CheckAnswer((userClickedPattern.length) - 1);

});


//function to simulate the behavior of computer cliking the button
function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
  level++;
  $("h1").text("level " + level);
}

//function to play sound
function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//fucntion to animate user button click
function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//fucntion to check answer and call the next step if it is matching, else end the game.
function CheckAnswer(curentLevel) {
  if (gamePattern[curentLevel] === userClickedPattern[curentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    playsound ("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over at level " + level + ", Press Any Key to Restart");
    startOver();
  }
}

//fuction to reset the params post game over
function startOver () {
  level = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}
