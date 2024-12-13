import p5 from "p5";
import Entity from "./Entity";
import Grid, { TileType } from "./Grid";
import User from "./User";

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
    if (!e.hasComponent(User)) return

    const grid = e.getComponent(Grid)!;
    const user = e.getComponent(User)!;

    const randomRow = p.random(grid.grid);
    const randomCol = p.random(randomRow.filter(t => t.type === TileType.empty));
    const y = grid.grid.indexOf(randomRow);
    const x = randomRow.indexOf(randomCol);
    user.setPos(x, y);
    grid.occupy(x, y, user.id);

    p.push();

    for (let i = 0; i < grid.rows; i++) {
      for (let j = 0; j < grid.cols; j++) {
        const tile = grid.grid[i][j];
        p.fill(tile.color);
        p.stroke(0);
        p.rect(
          j * grid.tileSize,
          i * grid.tileSize,
          grid.tileSize,
          grid.tileSize
        );
      }
    }

    p.pop();

    /* straight
    p.push()
    // draw a square with a straight line inside
    p.fill("#FFF")
    p.stroke(0)
    p.rect(0, 0, 40, 40)

    p.fill("#F00")
    p.stroke("#0F0")
    p.strokeWeight(5)
    p.line(0, 20, 40, 20)

    p.pop()
    */
   /* cross
    p.push()
    // draw a square with a straight line inside
    p.fill("#FFF")
    p.stroke(0)
    p.rect(0, 0, 40, 40)

    p.fill("#F00")
    p.stroke("#0F0")
    p.strokeWeight(5)
    p.line(0, 20, 40, 20)

    p.line(20, 0, 20, 40)

    p.pop()
    */
    /** arc
    p.push()
    p.fill("#F00")
    p.stroke("#0F0")
    p.strokeWeight(5)
    p.line(20, 20, 40, 20)
    p.line(20, 20, 20, 40)
    p.pop()
     **/
  }
}
