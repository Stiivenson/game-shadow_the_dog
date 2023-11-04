import {createImage} from "./utils/index.js";
import layer1Src from './assets/layer-1.png'
import layer2Src from './assets/layer-2.png'
import layer3Src from './assets/layer-3.png'
import layer4Src from './assets/layer-4.png'
import layer5Src from './assets/layer-5.png'

class Layer {
    game = null
    image = null
    x = 0
    y = 0
    width = 0
    height = 0
    speedModifier = 0

    constructor(game, image, width, height, speedModifier) {
        this.game = game
        this.image = image
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
    }

    /** Scroll images from right to left */
    update() {
        // When fst image disappears completely jump to its start
        if (this.x <= -this.width) this.x = 0
        else this.x -= this.game.speed * this.speedModifier
    }

    /** Draw two images (one after another) for seamless transition between them = infinite background effect  */
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

/** Class for drawing game background image, store multiple layers for parallax effect */
export class Background {
    game = null
    width = 0
    height = 0
    layers = []

    constructor(game) {
        this.game = game
        this.width = game.width
        this.height = game.height
        this.layers = [
            new Layer(game, createImage(layer1Src), this.width, this.height, 0),
            new Layer(game, createImage(layer2Src), this.width, this.height, 0.2),
            new Layer(game, createImage(layer3Src), this.width, this.height, 0.4),
            new Layer(game, createImage(layer4Src), this.width, this.height, 0.6),
            new Layer(game, createImage(layer5Src), this.width, this.height, 1),
        ]
    }

    update() {
        this.layers.forEach((layer) => layer.update())
    }

    draw(ctx) {
        this.layers.forEach((layer) => layer.draw(ctx))
    }
}