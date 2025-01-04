export enum TileType {
  empty,
  ending,
  occupied,
  vertical,
  horizontal,
  cross,
  arc1, // top left
  arc2, // top right
  arc3, // bottom right
  arc4 // bottom left
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
  emptyColor = colors[TileType.empty]
  strokeColor = colors[TileType.ending]

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

  put(x: number, y: number, type: TileType, id: string) {
    this.grid[y][x] = {
      color: this.colors[TileType.empty],
      type,
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