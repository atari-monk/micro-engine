import { Grid } from 'engine'
import { IGridNode } from 'engine_api'

describe('Grid', () => {
  test('getNeighbors should return valid neighbors', () => {
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
    const neighbors = gridInstance.getNeighbors(grid[0][0])

    expect(neighbors).toEqual(expect.any(Array))
    expect(neighbors).toHaveLength(2)
    expect(neighbors).toContainEqual({ x: 0, y: 1, walkable: true })
    expect(neighbors).toContainEqual({ x: 1, y: 0, walkable: true })
  })
})
