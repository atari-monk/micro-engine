import { IGridNode } from 'engine_api'

export default class Grid {
  private grid: IGridNode[][]

  constructor(grid: IGridNode[][]) {
    this.grid = grid
  }

  getNeighbors(node: IGridNode): IGridNode[] {
    const neighbors: IGridNode[] = []

    // Implement logic to get valid neighbors here
    // For example, add neighboring nodes to the left, right, top, and bottom

    return neighbors
  }
}
