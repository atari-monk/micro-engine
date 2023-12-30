import ICollisionInfo from '../collision_detector/ICollisionInfo'
import IScoreInfo from './IScoreInfo'

export default interface IGameState {
  lastCollisionInfo: ICollisionInfo
  score: IScoreInfo
}
