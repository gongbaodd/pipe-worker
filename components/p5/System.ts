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

  constructor() { }

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

  click(currentCard: TileType | null, resetCard: () => void) {
    if (!this.p5) return;
    const p = this.p5;
    if (currentCard) {
      this.entities.forEach((e) => {
        this.clickGrid(p, e, currentCard);
      });

      resetCard();
    }
  }

  clickGrid(p: p5, e: Entity, currentCard: TileType | null) {
    if (!e.hasComponent(Grid)) return
    if (!currentCard) return
    const grid = e.getComponent(Grid)!;
    const user = e.getComponent(User)!;

    const x = p.mouseX
    const y = p.mouseY

    if (x > 800) return;
    if (y < 0) return;
    if (y > 600) return;

    const gridX = Math.floor(x / grid.tileSize)
    const gridY = Math.floor(y / grid.tileSize)

    if (grid.grid[gridY][gridX].type === TileType.empty) {
      grid.put(gridX, gridY, currentCard, user.id)
    }

    p.redraw()
  }

  updateGrid(p: p5, e: Entity) {
    if (!e.hasComponent(Grid)) return
    if (!e.hasComponent(User)) return

    const grid = e.getComponent(Grid)!;

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

        if (tile.type === TileType.vertical) {
          p.push()
          p.translate(j * grid.tileSize, i * grid.tileSize)
          p.stroke(grid.strokeColor)
          p.strokeWeight(5)
          p.line(20, 0, 20, 40)
          p.pop()
        }

        if (tile.type === TileType.horizontal) {
          p.push()
          p.translate(j * grid.tileSize, i * grid.tileSize)
          p.stroke(grid.strokeColor)
          p.strokeWeight(5)
          p.line(0, 20, 40, 20)
          p.pop()
        }

        if (tile.type === TileType.cross) {
          p.push()
          p.translate(j * grid.tileSize, i * grid.tileSize)
          p.stroke(grid.strokeColor)

          p.strokeWeight(5)
          p.line(0, 20, 40, 20)
          p.line(20, 0, 20, 40)
          p.pop()
        }

        if (tile.type === TileType.arc1) {
          p.push()
          p.translate(j * grid.tileSize, i * grid.tileSize)
          p.stroke(grid.strokeColor)
          p.strokeWeight(5)
          p.line(0, 20, 20, 20)
          p.line(20, 20, 20, 0)
          p.pop()
        }

        if (tile.type === TileType.arc2) {
          p.push()
          p.translate(j * grid.tileSize, i * grid.tileSize)
          p.stroke(grid.strokeColor)
          p.strokeWeight(5)
          p.line(20, 0, 20, 20)
          p.line(20, 20, 40, 20)
          p.pop()
        }

        if (tile.type === TileType.arc3) {
          p.push()
          p.translate(j * grid.tileSize, i * grid.tileSize)
          p.stroke(grid.strokeColor)
          p.strokeWeight(5)
          p.line(20, 20, 40, 20)
          p.line(20, 20, 20, 40)
          p.pop()
        }

        if (tile.type === TileType.arc4) {
          p.push()
          p.translate(j * grid.tileSize, i * grid.tileSize)
          p.stroke(grid.strokeColor)
          p.strokeWeight(5)
          p.line(20, 20, 20, 40)
          p.line(0, 20, 20, 20)
          p.pop()
        }
      }
    }

    p.pop();


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
