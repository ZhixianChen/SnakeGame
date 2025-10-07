export class Mushroom {
    constructor(gridSize, tileCount) {
        this.gridSize = gridSize;
        this.tileCount = tileCount;
        this.x = -1;
        this.y = -1;
        this.isActive = false;
        this.spawnTimer = 0;
        this.spawnInterval = 10000; // 10 seconds in milliseconds
        this.powerUpDuration = 10000; // 10 seconds of invincibility
        this.isPowerUpActive = false;
        this.powerUpTimer = 0;
    }
    
    update(deltaTime) {
        // Update spawn timer
        if (!this.isActive) {
            this.spawnTimer += deltaTime;
            if (this.spawnTimer >= this.spawnInterval) {
                this.spawn();
                this.spawnTimer = 0;
            }
        }
        
        // Update power-up timer
        if (this.isPowerUpActive) {
            this.powerUpTimer += deltaTime;
            if (this.powerUpTimer >= this.powerUpDuration) {
                this.deactivatePowerUp();
            }
        }
    }
    
    spawn() {
        // Generate random position that doesn't overlap with snake
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * this.tileCount);
            newY = Math.floor(Math.random() * this.tileCount);
        } while (this.isPositionOccupied(newX, newY));
        
        this.x = newX;
        this.y = newY;
        this.isActive = true;
    }
    
    isPositionOccupied(x, y) {
        // This will be set by the game to check against snake and food positions
        return false;
    }
    
    setOccupiedPositions(snakeSegments, foodPosition) {
        this.occupiedPositions = [
            ...snakeSegments.map(seg => ({x: seg.x, y: seg.y})),
            {x: foodPosition.x, y: foodPosition.y}
        ];
    }
    
    checkCollision(snakeHead) {
        if (!this.isActive) return false;
        
        if (snakeHead.x === this.x && snakeHead.y === this.y) {
            this.activatePowerUp();
            return true;
        }
        return false;
    }
    
    activatePowerUp() {
        this.isActive = false;
        this.isPowerUpActive = true;
        this.powerUpTimer = 0;
        this.x = -1;
        this.y = -1;
    }
    
    deactivatePowerUp() {
        this.isPowerUpActive = false;
        this.powerUpTimer = 0;
    }
    
    isInvincible() {
        return this.isPowerUpActive;
    }
    
    getPosition() {
        return {x: this.x, y: this.y};
    }
    
    getPowerUpProgress() {
        if (!this.isPowerUpActive) return 0;
        return (this.powerUpTimer / this.powerUpDuration) * 100;
    }
    
    reset() {
        this.x = -1;
        this.y = -1;
        this.isActive = false;
        this.spawnTimer = 0;
        this.isPowerUpActive = false;
        this.powerUpTimer = 0;
    }
}
