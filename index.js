var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var a=1
var blueSound = new Audio("./sounds/blue.mp3");
var redSound = new Audio("./sounds/red.mp3");
var greenSound = new Audio("./sounds/green.mp3");
var yellowSound = new Audio("./sounds/yellow.mp3");
var wrongSound = new Audio("./sounds/wrong.mp3");

$(document).on("keypress",function(){
    if(a===1){
    $("h1").html("level : 0");
    nextSequence();
    a+=1;
    }
});

$(".btn").on("click",function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern.length-1);
    checkAnswer(userClickedPattern.length-1);

});


function nextSequence() {
    userClickedPattern = []
    level += 1;
    $("h1").html("level : "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}


// var randomChosenColor = buttonColors[nextSequence()];
gamePattern.push(randomChosenColor);

$('#' + randomChosenColor).fadeIn().fadeOut().fadeIn();

function playSound(name){
    switch (name) {
        case "green": greenSound.play();
            break;
        case "blue": blueSound.play();
            break;
        case "red": redSound.play();
            break;
        case "yellow": yellowSound.play();
            break;
        default:
            break;
    }
}

function animatePress(currentColor){
    $('.'+currentColor).addClass("pressed");
    setTimeout(function(){
        $('.'+currentColor).removeClass("pressed")
    },100);   
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
    }
    else{
        console.log("Wrong");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").html("Game Over ,Press Any Key To Start");
        startOver();
    }
    if((currentLevel+1)===gamePattern.length)
    {
        console.log("Completed");
        setTimeout(nextSequence,1000)
    }
    else{
        console.log("Not Completed");
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    a-=1;
}