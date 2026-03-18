import { Snake } from './snake.js';
import { Food } from './food.js';
import { Mushroom } from './mushroom.js';
import { GameRenderer } from './renderer.js';
import { GameState } from './gameState.js';
import { InputHandler } from './inputHandler.js';

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // Initialize game components
        this.gameState = new GameState();
        this.snake = new Snake(this.gridSize, this.tileCount);
        this.food = new Food(this.gridSize, this.tileCount);
        this.mushroom = new Mushroom(this.gridSize, this.tileCount);
        this.renderer = new GameRenderer(this.ctx, this.gridSize);
        this.inputHandler = new InputHandler();
        
        // Game settings
        this.baseSpeed = 150;
        this.speed = this.baseSpeed;
        this.lastTime = 0;
        this.snakeMoveTimer = 0;
        
        // Initialize
        this.init();
    }
    
    init() {
        this.gameState.updateHighScore();
        this.setupEventListeners();
        this.food.generateNew(this.snake, this.mushroom);
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('startBtn').disabled = false;
        this.renderer.draw(this.snake, this.food, this.mushroom, this.gameState);
    }
    
    setupEventListeners() {
        // Setup input handling
        this.inputHandler.setupControls(this.snake, this.gameState);
        
        // Button controls
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
    }
    
    startGame() {
        if (this.gameState.gameRunning) return;
        
        this.gameState.startGame();
        this.speed = this.baseSpeed;
        this.lastTime = 0;
        this.snakeMoveTimer = 0;
        this.snake.reset();
        this.mushroom.reset();
        this.food.generateNew(this.snake, this.mushroom);
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        
        this.gameLoop();
    }
    
    togglePause() {
        if (!this.gameState.gameRunning) return;
        
        this.gameState.togglePause();
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (this.gameState.gamePaused) {
            pauseBtn.textContent = 'Resume';
        } else {
            pauseBtn.textContent = 'Pause';
            this.lastTime = 0;
            this.gameLoop();
        }
    }
    
    resetGame() {
        this.gameState.resetGame();
        this.speed = this.baseSpeed;
        this.lastTime = 0;
        this.snakeMoveTimer = 0;
        this.snake.reset();
        this.mushroom.reset();
        this.food.generateNew(this.snake, this.mushroom);
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('pauseBtn').textContent = 'Pause';
        
        this.renderer.draw(this.snake, this.food, this.mushroom, this.gameState);
    }
    
    gameLoop(currentTime = 0) {
        if (!this.gameState.gameRunning || this.gameState.gamePaused || this.gameState.gameOver) return;
        
        // Calculate delta time for smooth mushroom spawning
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.mushroom.setOccupiedPositions(this.snake.getSegments(), this.food.getPosition());

        // Update mushroom system every frame for smooth spawning
        this.mushroom.update(deltaTime);
        
        // Only move snake at the specified speed
        this.snakeMoveTimer += deltaTime;
        
        if (this.snakeMoveTimer >= this.speed) {
            this.update();
            this.snakeMoveTimer = 0;
        }
        
        // Always render for smooth visuals
        this.renderer.draw(this.snake, this.food, this.mushroom, this.gameState);
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update() {
        // Move snake
        const head = this.snake.move();
        this.mushroom.setOccupiedPositions(this.snake.getSegments(), this.food.getPosition());
        
        // Handle wall collision based on invincibility
        if (this.snake.checkWallCollision()) {
            if (this.mushroom.isInvincible()) {
                // Wrap around to opposite side when invincible
                this.snake.wrapAround();
            } else {
                // Game over if not invincible
                this.gameState.endGame();
                return;
            }
        }
        
        // Check self collision (only if not invincible)
        if (!this.mushroom.isInvincible() && this.snake.checkSelfCollision()) {
            this.gameState.endGame();
            return;
        }
        
        // Check food collision
        if (this.snake.checkFoodCollision(this.food)) {
            this.gameState.addScore(10);
            this.food.generateNew(this.snake, this.mushroom);
            
            // Increase speed slightly
            if (this.speed > 50) {
                this.speed -= 2;
            }
        }
        
        // Check mushroom collision
        if (this.mushroom.checkCollision(head)) {
            this.gameState.addScore(25); // Bonus points for mushroom
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});
