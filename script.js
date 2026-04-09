const enterName = prompt("Please enter your name:");
if (enterName) {
    const userName = enterName.trim().slice(0, 1).toUpperCase() + enterName.trim().slice(1).toLowerCase();
    console.log(userName);
} else {
    alert("Invalid input. Please enter a valid name.");
}
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

setInterval(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    document.getElementById("date").textContent = months[month] + " " + day + ", " + year;
}, 1000);


let guess = 0;
let answer = 0;
let guessCount = 0;
let wins = 0;
const scores = [];

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeguess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function play() {
    let range = 0;
    let level = document.getElementsByName("level");
    for(let i=0; i<level.length; i++) {
        if(level[i].checked) {
            range = parseInt(level[i].value);
        }
        level[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Game started! Guess a number between 1 and " + range + ".";
    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;

    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
}

function makeguess() {
    let range = 0;
  let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("msg").textContent = "Please enter a valid integer between 1 and 100.";
        return;
    }
    guessCount++;
    if (guess == answer) {
        wins++;
        document.getElementById("msg").textContent = 'Congratulations! You\'ve guessed the number in ' + guessCount + ' attempts.';
            updateScore(guessCount);
            resetScore();
        } else if (guess < answer) {
        document.getElementById("msg").textContent = 'Too low! Try again.';
    } else {
        document.getElementById("msg").textContent = 'Too high! Try again.';
    }
    if(guess >= answer - 2 && guess <= answer + 2) {
        document.getElementById('msg').textContent = 'You\'re hot!'
    }else if(guess >= answer - 5 && guess <= answer + 5) {
        document.getElementById('msg').textContent = 'You\'re warm!'
    }else {
        document.getElementById('msg').textContent = 'You\'re cold!'
    }
}
function updateScore(score) {
    scores.push(score);
    document.getElementById("wins").textContent = "Total wins: " + wins;    
    avgScore.textContent = "Average score: " + (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    scores.sort((a, b) => a - b);

    let lb = document.getElementById("leaderboard");
    for (let i = 0; i < scores.length; i++) {
        if(i < scores.length) {
            lb[i].textContent = scores[i];
        } else {
            lb[i].textContent = '';
        }
    }
}
function resetScore() {
    document.getElementById("guess").value = '';
    document.getElementById("guess").disabled = true;
    document.getElementById("playBtn").disabled = false;
    document.getElementById("e").disabled = false;
    document.getElementById("m").disabled = false;
    document.getElementById("h").disabled = false;
}

function giveUp() {

    let range = 0;
    let level = document.getElementsByName("level");
    for(let i=0; i<level.length; i++) {
        if(level[i].checked) {
            range = parseInt(level[i].value);
        }
    }

    const score = range;
    updateScore(score);

    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    for(let i = 0; i < level.length; i++) {
        level[i].disabled = false;
    }
    document.getElementById('guess').disabled = true;
    document.getElementById('guess').value = '';
    document.getElementById("msg").textContent = "You gave up! The correct number was " + answer + ".";
}