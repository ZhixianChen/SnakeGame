export class Food {
    constructor(gridSize, tileCount) {
        this.gridSize = gridSize;
        this.tileCount = tileCount;
        this.x = 0;
        this.y = 0;
        this.generateNew();
    }
    
    generateNew(snake = null, mushroom = null) {
        const maxAttempts = this.tileCount * this.tileCount;
        let attempts = 0;
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            attempts++;
        } while (
            attempts < maxAttempts &&
            ((snake && snake.getSegments().some(segment =>
                segment.x === newFood.x && segment.y === newFood.y
            )) ||
            (mushroom && mushroom.isActive &&
             mushroom.getPosition().x === newFood.x &&
             mushroom.getPosition().y === newFood.y))
        );

        this.x = newFood.x;
        this.y = newFood.y;
    }
    
    getPosition() {
        return {x: this.x, y: this.y};
    }
}
