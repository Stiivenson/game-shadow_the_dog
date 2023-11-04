import {Game} from "./game-core.js";

let timestampPrev = 0

function animate(timestamp) {
    // In most cases deltaTime is ~16, that equivalents to 60 frame per 1000 ms
    const deltaTime = timestamp - timestampPrev
    timestampPrev = timestamp

    Game.update(deltaTime)
    Game.draw()

    requestAnimationFrame(animate)
}

animate(0)