export class GameRenderer {
    constructor(ctx, gridSize) {
        this.ctx = ctx;
        this.gridSize = gridSize;
    }
    
    draw(snake, food, mushroom, gameState) {
        this.clearCanvas();
        this.drawSnake(snake);
        this.drawFood(food);
        this.drawMushroom(mushroom);
        this.drawGameMessages(gameState);
        this.drawPowerUpStatus(mushroom);
    }
    
    clearCanvas() {
        this.ctx.fillStyle = '#f0f4f8';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    
    drawSnake(snake) {
        const segments = snake.getSegments();
        segments.forEach((segment, index) => {
            const x = segment.x * this.gridSize + this.gridSize / 2;
            const y = segment.y * this.gridSize + this.gridSize / 2;
            const radius = this.gridSize / 2 - 1;
            
            if (index === 0) {
                this.drawSnakeHead(x, y, radius);
            } else {
                this.drawSnakeBody(x, y, radius, index);
            }
        });
    }
    
    drawSnakeHead(x, y, radius) {
        // Draw main head circle
        this.ctx.fillStyle = '#2d5a2d';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add darker outline
        this.ctx.strokeStyle = '#1a3d1a';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw eyes
        this.ctx.fillStyle = '#ffffff';
        const eyeRadius = radius * 0.3;
        const eyeOffset = radius * 0.4;
        
        // Left eye
        this.ctx.beginPath();
        this.ctx.arc(x - eyeOffset, y - eyeOffset, eyeRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Right eye
        this.ctx.beginPath();
        this.ctx.arc(x + eyeOffset, y - eyeOffset, eyeRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Eye pupils
        this.ctx.fillStyle = '#000000';
        const pupilRadius = eyeRadius * 0.6;
        this.ctx.beginPath();
        this.ctx.arc(x - eyeOffset, y - eyeOffset, pupilRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + eyeOffset, y - eyeOffset, pupilRadius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    drawSnakeBody(x, y, radius, index) {
        // Create gradient for body segments
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        
        // Alternate green colors for a more snake-like appearance
        if (index % 2 === 0) {
            gradient.addColorStop(0, '#4ade80');
            gradient.addColorStop(1, '#22c55e');
        } else {
            gradient.addColorStop(0, '#22c55e');
            gradient.addColorStop(1, '#16a34a');
        }
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add subtle outline
        this.ctx.strokeStyle = '#16a34a';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        // Add scale-like pattern (small circles)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        const scaleRadius = radius * 0.2;
        const scaleOffset = radius * 0.6;
        
        // Top scale
        this.ctx.beginPath();
        this.ctx.arc(x, y - scaleOffset, scaleRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Bottom scale
        this.ctx.beginPath();
        this.ctx.arc(x, y + scaleOffset, scaleRadius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    drawFood(food) {
        const position = food.getPosition();
        const x = position.x * this.gridSize + this.gridSize / 2;
        const y = position.y * this.gridSize + this.gridSize / 2;
        const radius = this.gridSize / 2 - 2;
        
        // Draw food with a gradient
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, '#ef4444');
        gradient.addColorStop(1, '#dc2626');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add shine effect
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.beginPath();
        this.ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.4, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    drawMushroom(mushroom) {
        if (!mushroom.isActive) return;
        
        const position = mushroom.getPosition();
        const x = position.x * this.gridSize + this.gridSize / 2;
        const y = position.y * this.gridSize + this.gridSize / 2;
        const radius = this.gridSize / 2 - 2;
        
        // Draw mushroom cap (red with white spots)
        this.ctx.fillStyle = '#dc2626';
        this.ctx.beginPath();
        this.ctx.arc(x, y - radius * 0.3, radius * 0.8, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw mushroom stem (white)
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x - radius * 0.4, y, radius * 0.8, radius * 0.8);
        
        // Draw white spots on cap
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x - radius * 0.3, y - radius * 0.4, radius * 0.15, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + radius * 0.2, y - radius * 0.3, radius * 0.12, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x, y - radius * 0.1, radius * 0.1, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add glow effect
        this.ctx.shadowColor = '#dc2626';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        
        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
    }
    
    drawPowerUpStatus(mushroom) {
        if (!mushroom.isInvincible()) return;
        
        const progress = mushroom.getPowerUpProgress();
        const barWidth = 200;
        const barHeight = 20;
        const x = (this.ctx.canvas.width - barWidth) / 2;
        const y = 10;
        
        // Draw background bar
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw progress bar
        this.ctx.fillStyle = '#22c55e';
        this.ctx.fillRect(x, y, (barWidth * progress) / 100, barHeight);
        
        // Draw border
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, barWidth, barHeight);
        
        // Draw text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('INVINCIBLE!', this.ctx.canvas.width / 2, y + 35);
        
        // Draw time remaining
        const timeLeft = Math.ceil((10000 - (progress * 100)) / 1000);
        this.ctx.fillText(`${timeLeft}s remaining`, this.ctx.canvas.width / 2, y + 55);
    }
    
    drawGameMessages(gameState) {
        // Draw game over message
        if (gameState.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over!', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 20);
            
            this.ctx.font = '20px Arial';
            this.ctx.fillText(`Final Score: ${gameState.getScore()}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 20);
            this.ctx.fillText('Press Reset to play again', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 50);
        }
        
        // Draw pause message
        if (gameState.gamePaused && gameState.gameRunning) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PAUSED', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        }
    }
}
