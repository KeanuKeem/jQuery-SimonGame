


var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var index = 0;
buttonHide();

$(document).keydown(function () {
    if (!started) {
        $("h1").text("Level " + level);

        nextSequence();
        started = true;
        buttonShow();
    }
});


function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour);



}


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(index);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        index++;

        if (index === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
                index = 0;
            }, 1000);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    index = 0;
}

function buttonHide() {
    for(var i = 0; i < buttonColours.length; i++) {
        $("#" + buttonColours[i]).hide();
    }
}

function buttonShow() {
    for(var i = 0; i < buttonColours.length; i++) {
        $("#" + buttonColours[i]).show();
    }
}    





