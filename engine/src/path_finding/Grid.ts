import { IGridNode } from 'engine_api'

export default class Grid {
  private grid: IGridNode[][]

  constructor(grid: IGridNode[][]) {
    this.grid = grid
  }

  getNeighbors(node: IGridNode): IGridNode[] {
    const neighbors: IGridNode[] = []
    const { x, y } = node

    // Check left neighbor
    if (x > 0) {
      neighbors.push(this.grid[y][x - 1])
    }

    // Check right neighbor
    if (x < this.grid[y].length - 1) {
      neighbors.push(this.grid[y][x + 1])
    }

    // Check top neighbor
    if (y > 0) {
      neighbors.push(this.grid[y - 1][x])
    }

    // Check bottom neighbor
    if (y < this.grid.length - 1) {
      neighbors.push(this.grid[y + 1][x])
    }

    return neighbors
  }
}
