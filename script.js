import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById('ping-pong'))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const npcPaddle = new Paddle(document.getElementById("npc-paddle"))
const playerScore = document.getElementById("player-points")
const computerScore = document.getElementById("computer-points")

let lastTime

function update(time){
    if(lastTime != null){
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), npcPaddle.rect()])
        npcPaddle.update(delta, ball.y)

        if(isLose()) handleLoss()
    }

    
    lastTime = time;
    window.requestAnimationFrame(update)
}

function isLose(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLoss() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
      playerScore.textContent = parseInt(playerScore.textContent) + 1
    } else {
      computerScore.textContent = parseInt(computerScore.textContent) + 1
    }
    ball.reset()
    npcPaddle.reset()
  }

  document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
  })

window.requestAnimationFrame(update)