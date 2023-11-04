import {createImage} from "./utils/index.js";
import flyAssetSrc from './assets/enemy-fly.png'
import plantAssetSrc from './assets/enemy-plant.png'
import spiderAssetSrc from './assets/enemy-spider.png'

class BaseUnit {
    game = null
    image = null

    width = 0
    height = 0
    x = 0
    y = 0

    frameX = 0
    frameY = 0
    frameMax = 5
    fps = 60
    frameInterval = 1000 / this.fps
    frameTimer = 0

    speedX = 0
    speedY = 0

    isEscaped = false

    constructor(game) {
        this.game = game
    }

    update(deltaTime) {
        /** Moving */

        this.x -= this.speedX + this.game.speed
        this.y += this.speedY

        if (this.x + this.width < 0) this.isEscaped = true

        /** Sprite animation */

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0

            if (this.frameX < this.frameMax) ++this.frameX
            else this.frameX = 0
        } else {
            this.frameTimer += deltaTime
        }

    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.frameX * this.width, this.frameY * this.height, this.width, this.height,
            this.x, this.y, this.width, this.height
        )
    }
}

/** Class for enemy "Fly" */
export class EnemyFlying extends BaseUnit {
    angle = 0
    angleVelocity = 0

    constructor(game) {
        super(game)
        this.image = createImage(flyAssetSrc)
        this.width = 60
        this.height = 44
        this.x = game.width
        this.y = Math.random() * game.height * 0.5
        this.speedX = 2
        this.frameMax = 5
        this.angleVelocity = Math.random() * 0.1 + 0.1
    }

    update(deltaTime) {
        super.update(deltaTime)
        // Add special waving movement
        this.angle += this.angleVelocity
        this.y += Math.sin(this.angle)
    }
}

/** Class for enemy "Plant" */
export class EnemyGrounded extends BaseUnit {
    constructor(game) {
        super(game)
        this.image = createImage(plantAssetSrc)
        this.width = 60
        this.height = 87
        this.x = game.width
        this.y = game.height - game.groundMargin - this.height
        this.frameMax = 1
    }
}

/** Class for enemy "Spider" */
export class EnemyClimbing extends BaseUnit {
    constructor(game) {
        super(game)
        this.image = createImage(spiderAssetSrc)
        this.width = 120
        this.height = 144
        this.x = game.width
        this.y = Math.random() * game.height * 0.5
        this.speedY = Math.random() > 0.5 ? 1 : -1
        this.frameMax = 5
    }

    update(deltaTime) {
        super.update(deltaTime)
        if (this.y > this.game.height - this.game.groundMargin - this.height) this.speedY *= -1
        if (this.y < -this.height) this.isEscaped = true
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.x + this.width * 0.5, 0)
        ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5)
        ctx.stroke()

        super.draw(ctx)
    }
}