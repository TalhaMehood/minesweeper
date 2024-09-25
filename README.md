
# Minesweeper Game

## Overview
This is a simple implementation of the classic Minesweeper game built using React. The game features a customizable grid (width, height, and number of mines) and handles basic gameplay logic including win/loss conditions.

![Minesweeper Screenshot](/src/public/minesweeperScreen.png)

## Concept
The game board is represented as a 2D array where each tile tracks whether it contains a mine, the number of adjacent mines, and its revealed state. The board generation logic is designed to randomly place mines and update adjacent tiles accordingly.

## How It Works
- **Board.js**: Handles the rendering of the board, tile click events, and game status (win/lose).
  - **Rendering**: The board is generated dynamically based on the width, height, and number of mines. Each tile is represented in a 2D array, which tracks whether the tile is mined, revealed, or has adjacent mines.
  - **Tile Click Events**: Clicking a tile reveals its content. If it’s a mine, the game ends, revealing all mines. Otherwise, it reveals the number of adjacent mines and continues.
  - **Game Status**: The game status (won or lost) is determined by whether the player has revealed all non-mine tiles or clicked on a mine.

- **2D Array**: Used for board generation and managing tile states.
- **Tile Click**: Reveals the tile content (empty, number, or mine) and checks for win/loss conditions.

## Code Evolution and Optimization

### Initial Implementation
Initially, the board generation logic was split into two distinct phases:
1. **Placing Mines**: Randomly placing mines on the board using two nested loops and checking if the spot already had a mine.
2. **Calculating Adjacent Mines**: After all mines were placed, I looped through each tile on the board, checking the 8 neighboring tiles to count how many were mines. This calculation was done for every non-mine tile, resulting in an extra pass over the board and recalculating adjacent mine counts after all mines were placed.

### Optimized Implementation
I optimized the board generation by integrating the adjacent mine count update during the mine placement phase, removing the need for a second pass through the board:
- **Placed Mines and Updated Adjacent Mines in a Single Pass**: While placing each mine, I immediately updated the adjacent tiles by iterating over their neighboring cells using predefined `directions` (8 possible neighbors). This reduces the need for a second iteration over the entire board.

### Impact of the Change
- **Time Complexity Improvement**: 
  - **Initial Version**: The original approach had a time complexity of O(n^2) for placing mines (with checks), followed by another O(n^2) pass for calculating adjacent mine counts, leading to a time complexity of approximately O(n^2 + n^2) = O(2n^2).
  - **Optimized Version**: By calculating adjacent mines during the mine placement phase, the time complexity was reduced to O(n^2) for mine placement, while updating adjacent tiles became a constant-time operation during the same pass. This results in a more efficient O(n^2) overall.

### Result
This change not only simplified the code but also improved performance, especially for larger boards where multiple iterations over the grid can be expensive. The optimization helped reduce redundant computations, making the game setup faster and more efficient.

## Fun Part: Random Alert Messages 🎉
To keep the game engaging and fun, we've added random fun messages that appear when you win or lose the game. You might get something like:
- **Win Message**: "🎉 Hooray! You’ve cleared the board! You’re unstoppable! 🏆"
- **Lose Message**: "💥 KABOOM! You just hit a mine. Game Over! 💥"

There are different messages each time, so every game might bring you a surprise!

## Preliminary Requirements
Before you can set up and run the project, ensure you have the following tools installed:
1. **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed on your system (version 18 or later is recommended).
2. **npm or yarn**: You can use either npm (comes with Node.js) or yarn for managing dependencies.

You can check if Node.js and npm are installed by running:
```bash
node -v
npm -v
```

If you don't have Node.js installed, follow the [Node.js download and installation guide](https://nodejs.org/).

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/minesweeper.git
   ```
2. Navigate to the project directory:
   ```bash
   cd minesweeper
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```
4. Start the game:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:5173` to play the game. (Port '5173' can be changed if the port is occupied.)
