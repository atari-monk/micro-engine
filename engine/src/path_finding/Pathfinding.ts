import { IGridNode, IPathfinding, IPathfindingResult } from 'engine_api'
import Grid from './Grid'

export default class Pathfinding implements IPathfinding {
  private grid: Grid

  constructor(grid: Grid) {
    this.grid = grid
  }

  findPath(start: IGridNode, end: IGridNode): IPathfindingResult {
    const openSet: IGridNode[] = [start]
    const closedSet: IGridNode[] = []

    while (openSet.length > 0) {
      const currentNode = openSet[0]
      openSet.splice(0, 1)
      closedSet.push(currentNode)

      if (currentNode === end) {
        return { success: true, path: this.reconstructPath(start, end) }
      }

      const neighbors = this.grid.getNeighbors(currentNode)

      for (const neighbor of neighbors) {
        if (closedSet.includes(neighbor) || !neighbor.walkable) {
          continue
        }

        openSet.push(neighbor)
      }
    }

    return { success: false, path: null }
  }

  private reconstructPath(start: IGridNode, end: IGridNode): IGridNode[] {
    const path: IGridNode[] = []
    let currentNode = end

    while (currentNode !== start) {
      path.unshift(currentNode)
      currentNode = currentNode.parent!
    }

    path.unshift(start)
    return path
  }
}
