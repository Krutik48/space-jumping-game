score = 0;
cross = true;
var game = true



audio = new Audio('./music.mp3');
audiogo = new Audio('./gameover.mp3');


setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.key)
    if (e.key == " " && game) {
        char = document.querySelector('.amongChar');
        char.classList.add('animateChar');
        console.log("here")
        setTimeout(() => {
            char.classList.remove('animateChar')
        }, 930);
    }
}

let interval = setInterval(() => {
    char = document.querySelector('.amongChar');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(char, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(char, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    console.log(offsetX,offsetY);
    // console.log(window.getComputedStyle(char,null).getPropertyValue('background'));
    if (offsetX < 100 && offsetY < 80) {
        gameOver.style.visibility = 'visible';
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        // obstacle.classList.remove('obstacleAni')
        obstacle.style.animationPlayState = "Paused";
        char.style.backgroundImage = "url(./Images/Dead.png)" 
        audiogo.play();
        game =false;
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        clearInterval(interval);
    }
    else if (offsetX < 145 && cross) {
        score += 100;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);

    }

}, 10);

function updateScore(score) {
    document.querySelector('.scoreCount').innerHTML = "Your Score: " + score
}