import {createImage} from "./utils/index.js";
import playerImgSrc from './assets/player.png'
import dogBarkingSrc from './assets/dog_barking.wav'
import {Falling, Jumping, playerStates, Running, Sitting} from "./player-states.js";

export class Player {
    game = null
    image = null
    width = 100
    height = 91.3
    spriteWidth = 100
    spriteHeight = 91.3

    x = 0
    y = 0

    weight = 2
    speed = 0
    // Pixels per frame
    speedMax = 10
    speedVertical = 0

    frameX = 0
    frameY = 0
    frameMax = 5
    fps = 60
    frameInterval = 1000 / this.fps
    frameTimer = 0

    sound = null

    states = []
    stateCurrent = null


    constructor(game) {
        this.game = game
        this.image = createImage(playerImgSrc)
        this.sound = new Audio()
        this.sound.src = new URL(dogBarkingSrc, import.meta.url).href

        this.states = [
            new Sitting(this),
            new Running(this),
            new Jumping(this),
            new Falling(this),
        ]
        this.setState(playerStates.SITTING)

        this.y = this.getGroundPosition()
    }

    update(deltaTime, keysPressed) {
        this.stateCurrent.handleInput(keysPressed)

        /** Horizontal movement */

        this.x += this.speed

        if (keysPressed.includes('ArrowRight')) this.speed = this.speedMax
        else if (keysPressed.includes('ArrowLeft')) this.speed = -this.speedMax
        else this.speed = 0

        // Prevent player overflow out of screen
        if (this.x < 0) this.x = 0
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width

        /** Vertical movement */

        this.y += this.speedVertical

        if (!this.isOnGround()) this.speedVertical += this.weight
        else this.speedVertical = 0

        /** Sprite animation */

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0

            if (this.frameX < this.frameMax) ++this.frameX
            else this.frameX = 0
        } else {
            this.frameTimer += deltaTime
        }

        /** Sound */    

        if (keysPressed.includes('Enter')) this.sound.play()
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height
        )
    }

    setState(state, speed = 0) {
        this.stateCurrent = this.states[state]
        this.game.speed = this.game.speedMax * speed
        this.stateCurrent.enter()
    }

    isOnGround() {
        return this.y >= this.getGroundPosition()
    }

    getGroundPosition() {
        return this.game.height - this.game.groundMargin - this.height
    }
}