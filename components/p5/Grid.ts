export default class Grid {
    rows: number
    cols: number
    grid: number[][]
    tileSize = 10

    constructor(width: number, height: number) {
        const rows = Math.floor(height / this.tileSize);
        const cols = Math.floor(width / this.tileSize);
        const grid = create2DArray(rows, cols)

        this.cols = cols
        this.rows = rows
        this.grid = grid
    }
}

function create2DArray(rows: number, cols: number) {
    const arr: number[][] = [];
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < cols; j++) {
        arr[i][j] = 255;
      }
    }
    return arr;
  }