export enum TileType {
    empty,
    ending,
    occupied,
    vertical,
    horizontal,
    cross,
    arc1,
    arc2,
    arc3,
    arc4
}

export interface Tile {
  color: string,
  type: TileType,
  user: string | null
}

const colors = {
  [TileType.empty]: "#FFF",
  [TileType.ending]: "#0F0",
  [TileType.occupied]: "#F00"
}

export default class Grid {
    rows: number
    cols: number
    grid: Tile[][]
    tileSize = 40
    endTile = { rows: 10, cols: 10 }
    colors = colors 

    constructor(width: number, height: number) {
      {
        const rows = Math.floor(height / this.tileSize);
        const cols = Math.floor(width / this.tileSize);
        const grid = create2DArray(rows, cols)

        this.cols = Math.floor(width / this.tileSize);
        this.rows = Math.floor(height / this.tileSize);
        this.grid = grid
      }
      {
        const { rows, cols } = this.endTile
        this.grid[rows][cols] = { 
          color: this.colors[TileType.ending], 
          type: TileType.ending, 
          user: null 
        }
      }
        
    }

    occupy(x: number, y: number, id: string) {
      this.grid[y][x] = { 
        color: this.colors[TileType.occupied], 
        type: TileType.occupied, 
        user: id 
      }
    }
}

function create2DArray(rows: number, cols: number) {
    const arr: Tile[][] = [];
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < cols; j++) {
        arr[i][j] = { 
          color: colors[TileType.empty], 
          type: TileType.empty, 
          user: null 
        };
      }
    }
    return arr;
  }