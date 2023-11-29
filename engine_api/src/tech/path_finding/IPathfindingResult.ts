import IGridNode from './IGridNode'

export default interface IPathfindingResult {
  success: boolean
  path: IGridNode[] | null
}
