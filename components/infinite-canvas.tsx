/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"

// Dynamically import react-p5 to avoid SSR issues
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

interface Block {
  x: number
  y: number
  size: number
}

export default function InfiniteCanvas() {
  const [blocks, setBlocks] = useState<Block[]>([])

  let canvas: any
  let offsetX = 0
  let offsetY = 0
  let isDragging = false
  let lastX: number
  let lastY: number

  const setup = (p5: any, canvasParentRef: Element) => {
    canvas = p5.createCanvas(800, 600).parent(canvasParentRef)
    p5.frameRate(60)
  }

  const draw = (p5: any) => {
    p5.background(240)

    // Apply the offset to move the entire canvas
    p5.translate(offsetX, offsetY)

    // Draw grid
    p5.stroke(200)
    const gridSize = 50
    for (let x = 0; x < p5.width * 2; x += gridSize) {
      p5.line(x, 0, x, p5.height * 2)
    }
    for (let y = 0; y < p5.height * 2; y += gridSize) {
      p5.line(0, y, p5.width * 2, y)
    }

    // Draw blocks
    p5.fill(100, 200, 255)
    p5.noStroke()
    blocks.forEach(block => {
      p5.rect(block.x, block.y, block.size, block.size)
    })
  }

  const mousePressed = (p5: any) => {
    isDragging = true
    lastX = p5.mouseX
    lastY = p5.mouseY
  }

  const mouseReleased = () => {
    isDragging = false
  }

  const mouseDragged = (p5: any) => {
    if (isDragging) {
      offsetX += p5.mouseX - lastX
      offsetY += p5.mouseY - lastY
      lastX = p5.mouseX
      lastY = p5.mouseY
    }
  }

  const addBlock = () => {
    const newBlock: Block = {
      x: Math.random() * 800 - offsetX,
      y: Math.random() * 600 - offsetY,
      size: 50
    }
    setBlocks([...blocks, newBlock])
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button onClick={addBlock}>Add Block</Button>
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseReleased={mouseReleased}
        mouseDragged={mouseDragged}
      />
    </div>
  )
}

