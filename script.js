let guess = 0;
let answer = 0;
let guessCount = 0;
const scores = [];

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeguess);

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
  let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("message").textContent = "Please enter a valid integer between 1 and 100.";
        return;
    }
    guessCount++;
    if (guess == answer) {
        document.getElementById("message").textContent = 'Congratulations! You\'ve guessed the number in ' + guessCount + ' attempts.';
            updateScore();
            resetScore();
        } else if (guess < answer) {
        document.getElementById("message").textContent = 'Too low! Try again.';
    } else {
        document.getElementById("message").textContent = 'Too high! Try again.';
    }
}
function updateScore(score) {
    scores.push(score);
    wins.textContent = "Total wins: " + scores.length;
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
    document.getElementById("message").value = '';
    document.getElementById("giveup").value = 'false';
    document.getElementById("guess").disabled = true;
    document.getElementById("playBtn").disabled = false;
    document.getElementById("easy").disabled = false;
    document.getElementById("medium").disabled = false;
    document.getElementById("hard").disabled = false;
}