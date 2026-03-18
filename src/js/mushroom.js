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
        this.occupiedPositions = [];
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
        let safetyCounter = 0;
        const maxAttempts = this.tileCount * this.tileCount;
        do {
            newX = Math.floor(Math.random() * this.tileCount);
            newY = Math.floor(Math.random() * this.tileCount);
            safetyCounter += 1;
        } while (this.isPositionOccupied(newX, newY) && safetyCounter < maxAttempts);
        
        if (safetyCounter < maxAttempts) {
            this.x = newX;
            this.y = newY;
            this.isActive = true;
        }
    }
    
    isPositionOccupied(x, y) {
        if (!Array.isArray(this.occupiedPositions)) {
            return false;
        }
        return this.occupiedPositions.some(position => position.x === x && position.y === y);
    }
    
    setOccupiedPositions(snakeSegments, foodPosition) {
        const occupied = snakeSegments.map(seg => ({x: seg.x, y: seg.y}));
        if (foodPosition) {
            occupied.push({x: foodPosition.x, y: foodPosition.y});
        }
        this.occupiedPositions = occupied;
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
        this.occupiedPositions = [];
    }
}
