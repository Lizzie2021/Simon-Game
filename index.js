var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = "faulse";
var level = 0;
var index = 0;
var checkCount = 0;

function nextSequence() {
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var randomId = "#" + randomChosenColor;
  $(randomId).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}
startOver();
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(index);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    checkCount++;
    index++;
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart.");
    startOver();
  }
  if (checkCount === level && started === "true") {
    index = 0;
    checkCount = 0;
    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }
}

function startOver() {
  started = "faulse";
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  index = 0;
  checkCount = 0;
  $("body").keypress(function() {
    if (started === "faulse") {
      nextSequence();
      started = "true";
    }
  });
}
