import { Grid, Pathfinding } from 'engine'
import { IGridNode } from 'engine_api'

describe('Pathfinding', () => {
  test('findPath should return null if no path is found', () => {
    const grid: IGridNode[][] = [
      [
        { x: 0, y: 0, walkable: true },
        { x: 0, y: 1, walkable: true },
      ],
      [
        { x: 1, y: 0, walkable: true },
        { x: 1, y: 1, walkable: true },
      ],
    ]

    const gridInstance = new Grid(grid)
    const pathfinding = new Pathfinding(gridInstance)

    const startNode: IGridNode = { x: 0, y: 0, walkable: true }
    const endNode: IGridNode = { x: 2, y: 2, walkable: true } // Assuming this is an invalid endNode

    const result = pathfinding.findPath(startNode, endNode)

    expect(result.success).toBe(false)
    expect(result.path).toBe(null)
  })
})
