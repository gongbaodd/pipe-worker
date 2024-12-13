import p5 from "p5";
import Entity from "./Entity";
import Grid from "./Grid";

export enum IDS {
  grid,
}

export default class System {
  entities: Entity[] = [];
  p5: p5 | null = null;

  constructor() {}

  setup(p: p5, e: Entity[]) {
    this.entities = e;
    this.p5 = p;
  }

  update() {
    if (!this.p5) return;

    const p = this.p5;

    this.entities.forEach((e) => {
      this.updateGrid(p, e);
    });
  }

  updateGrid(p: p5, e: Entity) {
    if (!e.hasComponent(Grid)) return

    const grid = e.getComponent(Grid)!;

    for (let i = 0; i < grid.rows; i++) {
      for (let j = 0; j < grid.cols; j++) {
        p.fill("#F00");
        p.stroke(0);
        p.rect(
          j * grid.tileSize,
          i * grid.tileSize,
          grid.tileSize,
          grid.tileSize
        );
      }
    }
  }
}
