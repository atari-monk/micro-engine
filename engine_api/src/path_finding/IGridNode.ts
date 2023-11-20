export default interface IGridNode {
  x: number
  y: number
  walkable: boolean
  parent?: IGridNode
}
