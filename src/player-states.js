export const playerStates = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State {
    state = null

    constructor(stateCode) {
        this.state = stateCode
    }
}

export class Sitting extends State {
    player = null

    constructor(player) {
        super('SITTING');
        this.player = player
    }

    enter() {
        this.player.frameX = 0
        this.player.frameY = 5
        this.player.frameMax = 4
    }

    handleInput(keysPressed) {
        if (keysPressed.includes('ArrowLeft') || keysPressed.includes('ArrowRight')) {
            this.player.setState(playerStates.RUNNING, 1)
        }
    }
}

export class Running extends State {
    player = null

    constructor(player) {
        super('RUNNING');
        this.player = player
    }

    enter() {
        this.player.frameX = 0
        this.player.frameY = 3
        this.player.frameMax = 8
    }

    handleInput(keysPressed) {
        if (keysPressed.includes('ArrowDown')) {
            this.player.setState(playerStates.SITTING, 0)
        } else if (keysPressed.includes('ArrowUp')) {
            this.player.setState(playerStates.JUMPING, 1)
        }
    }
}

export class Jumping extends State {
    player = null

    constructor(player) {
        super('JUMPING');
        this.player = player
    }

    enter() {
        this.player.frameX = 0
        this.player.frameY = 1
        this.player.frameMax = 6

        if (this.player.isOnGround()) this.player.speedVertical -= 30
    }

    handleInput() {
        if (this.player.speedVertical > this.player.weight) {
            this.player.setState(playerStates.FALLING, 1)
        }
    }
}

export class Falling extends State {
    player = null

    constructor(player) {
        super('FALLING');
        this.player = player
    }

    enter() {
        this.player.frameX = 0
        this.player.frameY = 2
        this.player.frameMax = 6
    }

    handleInput() {
        if (this.player.isOnGround()) {
            this.player.setState(playerStates.RUNNING, 1)
        }
    }
}