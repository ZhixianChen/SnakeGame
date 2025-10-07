export class InputHandler {
    constructor() {
        this.setupControls = this.setupControls.bind(this);
    }
    
    setupControls(snake, gameState) {
        document.addEventListener('keydown', (e) => {
            if (!gameState.gameRunning || gameState.gamePaused) return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    snake.setDirection(0, -1);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    snake.setDirection(0, 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    snake.setDirection(-1, 0);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    snake.setDirection(1, 0);
                    break;
            }
        });
    }
}
