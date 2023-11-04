import {GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT} from './const.js'
import {Player} from "./player.js";
import {InputHandler} from "./input.js";
import {Background} from "./background.js";
import {EnemyClimbing, EnemyFlying, EnemyGrounded} from "./enemy.js";

/** Core class for Game instance */
class GameInstance {
    // Canvas context
    ctx = null

    width = 0
    height = 0
    groundMargin = 80

    speed = 0
    speedMax = 3

    player = null
    input = null
    background = null

    enemies = []
    enemyTimer = 0
    enemyInterval = 1000


    constructor() {
        const canvas = document.getElementById('screen')
        this.ctx = canvas.getContext('2d')
        this.width = canvas.width = GAME_SCREEN_WIDTH
        this.height = canvas.height = GAME_SCREEN_HEIGHT

        this.player = new Player(this)
        this.input = new InputHandler()
        this.background = new Background(this)
    }

    update(deltaTime) {
        this.background.update()
        this.player.update(deltaTime, this.input.keysPressed)

        /** Enemies logic */

        // Constantly add new enemies
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy()
            this.enemyTimer = 0
        }
        else this.enemyTimer += deltaTime

        this.enemies = this.enemies.filter((enemy) => !enemy.isEscaped)
        this.enemies.forEach((enemy) => enemy.update(deltaTime))
    }

    draw() {
        this.clearScreen()
        this.background.draw(this.ctx)
        this.player.draw(this.ctx)
        this.enemies.forEach((enemy) => enemy.draw(this.ctx))
    }

    addEnemy() {
        this.enemies.push(new EnemyFlying(this))

        // Randomly add enemies while running
        if (this.speed > 0 && Math.random() < 0.3) this.enemies.push(new EnemyGrounded(this))
        else if (this.speed > 0) this.enemies.push(new EnemyClimbing(this))
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
}

export const Game = new GameInstance()
