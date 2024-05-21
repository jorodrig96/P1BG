import Ball from './Ball.js'
import Paddles from './Paddles.js'

const ball = new Ball(document.getElementById('ping-pong'))
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const npcPaddle = new Paddle(document.getElementById('npc-paddle'))

let lastTime

function update(time){
    if(lastTime != null){
        const delta = time - lastTime;
        ball.update(delta)
    }

    
    lastTime = time;
    window.requestAnimationFrame(update)
}

document.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)