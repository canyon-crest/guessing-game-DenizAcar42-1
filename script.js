let userName = '';
const enterName = prompt("Please enter your name:");
if (enterName) {
    userName = enterName.trim().slice(0, 1).toUpperCase() + enterName.trim().slice(1).toLowerCase();
} else {
    alert("Invalid input. Please enter a valid name.");
}

function getSuffix(day) {
    if (day >= 11 && day <= 13) return 'th';
    if (day % 10 === 1) return 'st';
    if (day % 10 === 2) return 'nd';
    if (day % 10 === 3) return 'rd';
    return 'th';
}
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];




const now = new Date();
const initHours = now.getHours();
const initMinutes = now.getMinutes().toString().padStart(2, '0');
const initSeconds = now.getSeconds().toString().padStart(2, '0');
document.getElementById("date").textContent = months[now.getMonth()] + " " + now.getDate() + getSuffix(now.getDate()) + ", " + now.getFullYear() + " " + initHours + ":" + initMinutes + ":" + initSeconds;


setInterval(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    if (hours > 12) {
        document.getElementById("time").textContent = "Current time: " + (hours - 12) + ":" + minutes + ":" + seconds + " PM";
    } else {
        document.getElementById("time").textContent = "Current time: " + hours + ":" + minutes + ":" + seconds + " AM";
    }


document.getElementById("date").textContent = months[month] + " " + day + getSuffix(day) + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
}, 1000);


let guess = 0;
let answer = 0;
let guessCount = 0;
let wins = 0;
let losses = 0;
let roundTime = 0;
const scores = [];
const times = [];


document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeguess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function play() {
    roundTime = new Date().getTime();
    let range = 0;
    let level = document.getElementsByName("level");
    for(let i=0; i<level.length; i++) {
        if(level[i].checked) {
            range = parseInt(level[i].value);
        }
        level[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Game started! Guess a number between 1 and " + range + " " + userName + "!";
    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
    document.getElementById("guess").disabled = false;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
}

function makeguess() {
    let range = 0;
  let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("msg").textContent = "Please enter a valid integer between 1 and 100 " + userName + "!";
        return;
    }
    guessCount++;
    if (guess == answer) {
        wins++;
        document.getElementById("msg").textContent = 'Correct! ' + userName + ', you\'ve guessed the number in ' + guessCount + ' attempts.';

            updateScore(guessCount);
            resetScore();
            document.getElementById("hotCold").textContent = '';
        } else if (guess < answer) {
        document.getElementById("msg").textContent = 'Too low! Try again.';
    } else {
        document.getElementById("msg").textContent = 'Too high! Try again.';
    }
    if(answer !== 0){
        if(guess >= answer - 2 && guess <= answer + 2) {
            document.getElementById("msg").textContent += 'You\'re hot!'
        }else if(guess >= answer - 5 && guess <= answer + 5) {
            document.getElementById("msg").textContent += 'You\'re warm!'
        }else {
            document.getElementById("msg").textContent += 'You\'re cold!'
        }
    }
}
function updateScore(score) {
    const elapsed = ((new Date().getTime() - roundTime) / 1000).toFixed(1);
    times.push(parseFloat(elapsed)); 

    scores.push(score);
    document.getElementById("wins").textContent = "Total wins: " + wins;
    document.getElementById("avgScore").textContent = "Average score: " + (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    document.getElementById("fastest").textContent = "Fastest Game: " + Math.min(...times) + "s";
    document.getElementById("avgTime").textContent = "Average Time: " + (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) + "s";
    scores.sort((a, b) => a - b);

    let lb = document.getElementsByName("leaderboard");
    for (let i = 0; i < scores.length; i++) {
        lb[i].textContent = scores[i];
    }
}

function resetScore() {
    document.getElementById("guess").value = '';
    document.getElementById("guess").disabled = true;

    document.getElementById("playBtn").disabled = false;
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;

    let level = document.getElementsByName("level");
    for (let i = 0; i < level.length; i++) {
        level[i].disabled = false;
    }

    answer = 0;
    guessCount = 0;
}

function giveUp() {
    losses++;
    wins++;
    let range = 0;
    let level = document.getElementsByName("level");
    for(let i=0; i<level.length; i++) {
        if(level[i].checked) {
            range = parseInt(level[i].value);
        }
    }

    document.getElementById("msg").textContent = 'The correct number was: ' + answer + '. Better luck next time '+userName+'!';
    document.getElementById("hotCold").textContent = '';
    document.getElementById("losses").textContent = "Losses: " + losses;
    updateScore(range);
    resetScore();
}


