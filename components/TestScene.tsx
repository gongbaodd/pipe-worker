/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import type P5 from "p5"
import System, { IDS } from './p5/System'
import Entity from './p5/Entity'
import Grid from './p5/Grid'

// Dynamically import react-p5 to avoid SSR issues
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

export default function TestScene() {

    let grid;
    let rows, cols;
    let tileSize;


  const setup = (_p5: any, canvasParentRef: Element) => {
    const p5: P5 = _p5

    p5.createCanvas(1920, 1080).parent(canvasParentRef)

    tileSize = 108; // Ensure square tiles (1080 / 10 = 108)
    rows = p5.floor(p5.height / tileSize);
    cols = p5.floor(p5.width / tileSize);
    grid = create2DArray(rows, cols);

    function create2DArray(rows, cols) {
        let arr = [];
        for (let i = 0; i < rows; i++) {
          arr[i] = [];
          for (let j = 0; j < cols; j++) {
            arr[i][j] = p5.color(255); // Default color
          }
        }
        return arr;
      }
  }

  const draw = (_p5: any) => {
    const p5: P5 = _p5

    p5.background(240)

    drawGrid();


      
      function drawGrid() {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            p5.fill(grid[i][j]);
            p5.stroke(0);
            p5.rect(j * tileSize, i * tileSize, tileSize, tileSize);
          }
        }
      }

  }

  const mousePressed = () => {

  }

  const mouseReleased = () => {
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseReleased={mouseReleased}
      />
    </div>
  )
}
