# Snake Game

A classic Snake game built with HTML5 Canvas, CSS, and JavaScript. Control a snake to eat food and grow longer while avoiding walls and yourself.

## Features

- **Smooth Gameplay**: Responsive controls with smooth snake movement
- **Score System**: Track your current score and high score (saved locally)
- **Game Controls**: Start, pause/resume, and reset functionality
- **Progressive Difficulty**: Game speed increases as you eat more food
- **🍄 Mushroom Power-ups**: Mushrooms spawn every 10 seconds for invincibility
- **Invincibility Mode**: 10 seconds of invincibility when eating mushrooms
- **Wall Wrapping**: Pass through walls to the opposite side when invincible
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## How to Play

1. **Start the Game**: Click the "Start Game" button
2. **Control the Snake**: Use arrow keys or WASD keys
   - ↑ or W: Move up
   - ↓ or S: Move down
   - ← or A: Move left
   - → or D: Move right
3. **Objective**: Eat the red food to grow longer and increase your score
4. **Avoid**: Hitting the walls or your own tail
5. **Controls**: Use the pause/resume and reset buttons as needed

## Game Rules

- The snake moves continuously in the direction you choose
- Eating food increases your score by 10 points
- The snake grows longer with each food eaten
- Game speed increases slightly with each food eaten
- Game ends if you hit a wall or yourself
- Your high score is automatically saved

## Project Structure

```
SnakeGame/
├── index.html                 # Main entry point
├── README.md                  # Project documentation
└── src/
    ├── css/
    │   └── style.css         # Game styling and responsive design
    ├── js/
    │   ├── game.js           # Main game controller and game loop
    │   ├── snake.js          # Snake class for movement and collision detection
    │   ├── food.js           # Food class for food generation and positioning
    │   ├── gameState.js      # Game state management and scoring
    │   ├── renderer.js       # Game rendering and drawing operations
    │   └── inputHandler.js   # Keyboard input handling
    └── components/
        └── index.html        # Alternative HTML file (can be removed)
```

## Files Description

- **`index.html`** - Main entry point for the game
- **`src/css/style.css`** - Game styling and responsive design
- **`src/js/game.js`** - Main game controller and game loop
- **`src/js/snake.js`** - Snake class for movement and collision detection
- **`src/js/food.js`** - Food class for food generation and positioning
- **`src/js/mushroom.js`** - Mushroom class for power-up system
- **`src/js/gameState.js`** - Game state management and scoring
- **`src/js/renderer.js`** - Game rendering and drawing operations
- **`src/js/inputHandler.js`** - Keyboard input handling

## How to Run

1. Simply open `index.html` in any modern web browser
2. No additional setup or dependencies required
3. The game works offline

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with HTML5 Canvas support

## Game Mechanics

The game uses a grid-based system where:
- Canvas size: 400x400 pixels
- Grid size: 20x20 pixels
- Snake and food are positioned on the grid
- Collision detection ensures fair gameplay
- Food spawns randomly but never on the snake

Enjoy playing! Try to beat your high score and challenge your friends.
