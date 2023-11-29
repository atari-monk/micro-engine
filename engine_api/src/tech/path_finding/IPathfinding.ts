import IGridNode from './IGridNode'
import IPathfindingResult from './IPathfindingResult'

export default interface IPathfinding {
  findPath(start: IGridNode, end: IGridNode): IPathfindingResult
}
