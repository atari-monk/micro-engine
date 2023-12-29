import { ICollisionInfo, IEventSystem } from 'engine_api'
import Component from '../entity_component/Component'
import { IGameState } from 'engine_api'

export default class GameStateComponent
  extends Component
  implements IGameState
{
  public lastCollisionInfo: ICollisionInfo = {} as ICollisionInfo

  constructor(private readonly _eventSystem: IEventSystem) {
    super('GameStateComponent')
    this._eventSystem.subscribe(
      'playerBallCollision',
      this.collisionHandler.bind(this)
    )
  }

  update(dt: number) {}

  render(dt: number) {}

  private collisionHandler(data: ICollisionInfo) {
    this.lastCollisionInfo = data
    console.log('recived collision info', this.lastCollisionInfo)
  }
}
