"use client"
import React from "react";
import p5Types from "p5"; // Import p5 types
import Sketch from "react-p5"

type GridColor = p5Types.Color[][];

const GridSketch: React.FC = () => {
  let grid: GridColor;
  let rows: number, cols: number;
  let tileSize: number;
  const endTile = { row: 20, col: 20 };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1920, 1080).parent(canvasParentRef);
    tileSize = 40; // Ensure square tiles (1080 / 10 = 108)
    rows = Math.floor(p5.height / tileSize);
    cols = Math.floor(p5.width / tileSize);
    grid = create2DArray(rows, cols, p5);

    const { row, col } = endTile

    grid[row][col] = p5.color(0, 255, 0); // Green for start
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

  const mousePressed = () => {

  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Sketch setup={setup as any} draw={draw as any} mousePressed={mousePressed as any} />;
};

export default GridSketch;
