var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var level=0;
var started=false;
var userClickPattern=[];

function nextSequence() {
    level++;
    userClickPattern= [];
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random() * (3 + 1)); // Generating a random number between 0 and 3

    var randomChosenColour=buttonColours[randomNumber]; // Choosing a random number 
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    
}

$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickPattern.push(userChosenColour);
    checkAnswer(userClickPattern.length-1);
});

function playSound(name) {
    $("#"+name).fadeOut(100).fadeIn(100);
    const audio = new Audio("sounds/"+name+".mp3" );
    audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+ currentColour).removeClass("pressed")
    },100);
}


$("body").keypress(function() {
    if(!started)
    nextSequence();
    started=true;
});

function checkAnswer(currentLevel) {
    if(userClickPattern[currentLevel]===gamePattern[currentLevel]){

        if(currentLevel === gamePattern.length-1){
            console.log("success");
            setTimeout(function(){
                nextSequence();
              }, 1000);
          }
    }
    else{
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }
