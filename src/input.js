/** Class for handling keyboard inputs */
export class InputHandler {
    keysPressed = []
    keysToTrack = [
        'ArrowDown',
        'ArrowUp',
        'ArrowLeft',
        'ArrowRight',
        'Enter',
        'Space',
    ]

    constructor() {
        window.addEventListener('keydown', (event) => {
            if (this.keysToTrack.includes(event.key) && this.keysPressed.indexOf(event.key) === -1) {
                this.keysPressed.push(event.key)
            }
        })

        window.addEventListener('keyup', (event) => {
            if (this.keysToTrack.includes(event.key)) {
                this.keysPressed.splice(this.keysPressed.indexOf(event.key), 1)
            }
        })
    }
}