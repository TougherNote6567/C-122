x = 0;
y = 0;

screenWidth = 0;
screenHeight = 0;

apple = "";
drawApple = "";
speakData = "";

toNumber = 0;

function preload(){
apple = loadImage("Apple.png");
}

speechRecognition = window.webkitSpeechRecognition;
Recognition = new speechRecognition();

function start(){
document.getElementById("status").innerHTML = "Please speak. The system is listening.";
Recognition.start();
}

Recognition.onresult = function (event){
    console.log(event);
    Content = event.results[0][0].transcript;
    console.log(Content);
    document.getElementById("status").innerHTML = "Speech has been recognized." + Content;
    toNumber = Number(Content);
    if (Number.isInteger(toNumber)){
        document.getElementById("status").innerHTML= "Started drawing apple";
        drawApple = "set";
    }
    else{
        document.getElementById("status").innerHTML = "Speech entered is not a valid number.";
    }
}

function setup(){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas = createCanvas(screenWidth, screenHeight-150);
    canvas.position(0, 150);
}

function draw(){
if (drawApple == "set"){
    for (var i = 1; i<= toNumber; i++){
        x = Math.floor(Math.random()*900);
        y = Math.floor(Math.random()*400);
        image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = toNumber + " apples have been drawn.";
    speakData = toNumber + " apples have been drawn.";
    speak();
    drawApple = "";
}
}

function speak(){
    synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
    speakData = "";
}

