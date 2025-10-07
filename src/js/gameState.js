export class GameState {
    constructor() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameOver = false;
        this.gamePaused = false;
        this.score = 0;
        this.updateScore();
        this.updateHighScore();
    }
    
    endGame() {
        this.gameOver = true;
        this.gameRunning = false;
        this.updateHighScore();
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        this.gamePaused = !this.gamePaused;
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        this.score = 0;
        this.updateScore();
        this.updateHighScore();
    }
    
    addScore(points) {
        this.score += points;
        this.updateScore();
        this.updateHighScore();
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
    
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
        }
        document.getElementById('highScore').textContent = this.highScore;
    }
    
    getScore() {
        return this.score;
    }
    
    getHighScore() {
        return this.highScore;
    }
}
