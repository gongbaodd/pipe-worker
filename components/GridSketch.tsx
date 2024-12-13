import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; // Import p5 types

type GridColor = p5Types.Color[][];

const GridSketch: React.FC = () => {
  let grid: GridColor;
  let rows: number, cols: number;
  let tileSize: number;
  let startTile: { row: number; col: number } | null = null;
  let endTile: { row: number; col: number } | null = null;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1920, 1080).parent(canvasParentRef);
    tileSize = 108; // Ensure square tiles (1080 / 10 = 108)
    rows = Math.floor(p5.height / tileSize);
    cols = Math.floor(p5.width / tileSize);
    grid = create2DArray(rows, cols, p5);
  };

  const draw = (p5: p5Types) => {
    p5.background(220);
    drawGrid(p5);
  };

  const create2DArray = (rows: number, cols: number, p5: p5Types): GridColor => {
    const arr: GridColor = [];
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < cols; j++) {
        arr[i][j] = p5.color(255); // Default color
      }
    }
    return arr;
  };

  const drawGrid = (p5: p5Types) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        p5.fill(grid[i][j]);
        p5.stroke(0);
        p5.rect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
    }
  };

  const mousePressed = (p5: p5Types) => {
    const col = Math.floor(p5.mouseX / tileSize);
    const row = Math.floor(p5.mouseY / tileSize);

    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      if (!startTile) {
        startTile = { row, col };
        grid[row][col] = p5.color(0, 255, 0); // Green for start
      } else if (!endTile) {
        const distance = Math.abs(startTile.row - row) + Math.abs(startTile.col - col);
        if (distance > 5) { // Ensure the tiles are far apart
          endTile = { row, col };
          grid[row][col] = p5.color(255, 0, 0); // Red for end
        } else {
          console.log("End tile is too close to the start tile. Choose a further tile.");
        }
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Sketch setup={setup as any} draw={draw as any} mousePressed={mousePressed as any} />;
};

export default GridSketch;
