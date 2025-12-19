
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer after a user has clicked and chosen their answer
  // passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // Check if the most recent user answer is the same as the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    console.log("userClickedPattern: " + userClickedPattern);
    console.log("gamePattern: " + gamePattern);
    
    // Check if the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay
      setTimeout(function() {
        nextSequence();
        // Reset the userClickedPattern to an empty array ready for the next level
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
    console.log("userClickedPattern: " + userClickedPattern);
    console.log("gamePattern: " + gamePattern);
    
    // Play wrong.mp3 sound
    playSound("wrong");
    
    // Apply "game-over" class to body for 200 milliseconds
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    
    // Change h1 title to say "Game Over, Press Any Key to Restart"
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    // Reset game state so the game can be restarted
    startOver();
  }
}

function startOver() {
  // Reset game variables
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
