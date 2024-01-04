import { ICollisionInfo, IScoreInfo } from 'engine_api'
import Component from '../entity_component/Component'
import { IGameState } from 'engine_api'

export default class GameStateComponent
  extends Component
  implements IGameState
{
  public lastCollisionInfo: ICollisionInfo = {} as ICollisionInfo
  public score: IScoreInfo = { redScore: 0, blueScore: 0 } as IScoreInfo

  constructor() {
    super('GameStateComponent')
  }
}
