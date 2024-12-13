"use client"
import React from "react";
import p5Types from "p5"; // Import p5 types
import Grid, { TileType } from "./p5/Grid";
import Entity from "./p5/Entity";
import System, { IDS } from "./p5/System";
import User from "./p5/User";
import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("react-p5"), { ssr: false });

const GridSketch: React.FC = () => {
  const system = new System();

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(800, 600).parent(canvasParentRef);

    const entities = [];

    {
      const gridEntity = new Entity(IDS.grid);
      const gridComponent = new Grid(p5.width, p5.height);
      const randomRow = p5.random(gridComponent.grid);
      const randomCol = p5.random(randomRow.filter((t: { type: TileType; }) => t.type === TileType.empty));
      const y = gridComponent.grid.indexOf(randomRow);
      const x = randomRow.indexOf(randomCol);
      const userComponent = new User(x, y);
      gridComponent.occupy(x, y, userComponent.id);
      
      gridEntity.addComponent(gridComponent);
      gridEntity.addComponent(userComponent);
      entities.push(gridEntity);
    }

    system.setup(p5, entities);
  };

  const draw = (p5: p5Types) => {
    p5.background(220);
    system.update();
    p5.noLoop();
  };


  const mousePressed = () => {
    system.click();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Sketch setup={setup as any} draw={draw as any} mousePressed={mousePressed as any} />;
};

export default dynamic(() => Promise.resolve(GridSketch), { ssr: false });
