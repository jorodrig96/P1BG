const STARTING_VELOC = .040
const SPEED_INCREASE = .00001

export default class Ball {
    constructor(ballElement){
        this.ballElement = ballElement;
        this.reset()
    }


get x(){
    return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'))
}

set x(value){
    this.ballElement.style.setProperty('--x', value)
}

get y(){
    return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'))
}

set y(value){
    this.ballElement.style.setProperty('--y', value)
}

rect(){
    return this.ballElement.getBoundingClientRect()
}

reset(){
    this.x = 50
    this.y = 50
    this.direction = { x: 0.75, y: 0.5 }
    while(
        Math.abs(this.direction.x) <= 0.2 || 
        Math.abs(this.direction.x) >= 0.9
    ){
        const traveling = randomNumber(0, 2 * Math.PI)
        this.direction = { x: Math.cos(traveling), y: Math.sin(traveling) }
    }
    this.velocity = STARTING_VELOC
}

update(delta){
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += SPEED_INCREASE * delta 
    const rect = this.rect()

    if(rect.bottom >= window.innerHeight || rect.top <= 0){
        this.direction.y *= -1
    }
    if(rect.right >= window.innerHeight || rect.left <= 0){
        this.direction.x *= -1
    }
}
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min
}