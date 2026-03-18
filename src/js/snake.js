export class Snake {
    constructor(gridSize, tileCount) {
        this.gridSize = gridSize;
        this.tileCount = tileCount;
        this.reset();
    }
    
    reset() {
        this.segments = [{x: 10, y: 10}];
        this.dx = 0;
        this.dy = 0;
        this.length = 1;
    }
    
    move() {
        const head = {x: this.segments[0].x + this.dx, y: this.segments[0].y + this.dy};
        this.segments.unshift(head);
        
        // Remove tail if no food eaten
        if (this.segments.length > this.length) {
            this.segments.pop();
        }
        
        return head;
    }
    
    grow() {
        this.length++;
    }
    
    setDirection(dx, dy) {
        // Prevent reversing direction
        if (this.dx !== -dx || this.dy !== -dy) {
            this.dx = dx;
            this.dy = dy;
        }
    }
    
    checkWallCollision() {
        const head = this.segments[0];
        return head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount;
    }
    
    wrapAround() {
        const head = this.segments[0];
        
        // Wrap horizontally
        if (head.x < 0) {
            head.x = this.tileCount - 1;
        } else if (head.x >= this.tileCount) {
            head.x = 0;
        }
        
        // Wrap vertically
        if (head.y < 0) {
            head.y = this.tileCount - 1;
        } else if (head.y >= this.tileCount) {
            head.y = 0;
        }
    }
    
    checkSelfCollision() {
        const head = this.segments[0];
        return this.segments.slice(1).some(segment => 
            segment.x === head.x && segment.y === head.y
        );
    }
    
    checkFoodCollision(food) {
        const head = this.segments[0];
        if (head.x === food.x && head.y === food.y) {
            this.grow();
            return true;
        }
        return false;
    }
    
    getSegments() {
        return this.segments;
    }
    
    getHead() {
        return this.segments[0];
    }
}
