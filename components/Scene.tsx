/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import type P5 from "p5"

// Dynamically import react-p5 to avoid SSR issues
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

export default function Scene() {
  const setup = (_p5: any, canvasParentRef: Element) => {
    const p5: P5 = _p5

    p5.createCanvas(1920, 1080).parent(canvasParentRef)
  }

  const draw = (_p5: any) => {
    const p5: P5 = _p5

    p5.background(240)
  }

  const mousePressed = (_p5: any) => {
    const p5: P5 = _p5

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

