import {
  ICollisionInfo,
  IEntityManager,
  IEventSystem,
  IRendererV2,
  IScoreInfo,
} from 'engine_api'
import Component from '../entity_component/Component'
import { IGameState } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'
import StateComponent from '../state_machine/StateComponent'
import MoveState from '../state_machine/MoveState'
import IdleState from '../state_machine/IdleState'

export default class GameStateComponent
  extends Component
  implements IGameState
{
  public lastCollisionInfo: ICollisionInfo = {} as ICollisionInfo
  public score: IScoreInfo = { redScore: 0, blueScore: 0 } as IScoreInfo

  constructor(
    private readonly _eventSystem: IEventSystem,
    private readonly _renderer: IRendererV2,
    private readonly _entityManager: IEntityManager
  ) {
    super('GameStateComponent')
    this._eventSystem.subscribe(
      'playerBallCollision',
      this.collisionHandler.bind(this)
    )
    this._eventSystem.subscribe('updateScore', this.scoreHandler.bind(this))
    this._eventSystem.subscribe('ballMove', this.ballMoveHandler.bind(this))
    this._eventSystem.subscribe('ballStop', this.ballStopHandler.bind(this))
  }

  update(dt: number) {}

  render(dt: number) {
    this._renderer.drawText(
      this.score.redScore.toString(),
      new Vector2(370 - 20, 20),
      'red',
      '20px Arial'
    )
    this._renderer.drawText(':', new Vector2(370, 20), 'yellow', '20px Arial')
    this._renderer.drawText(
      this.score.blueScore.toString(),
      new Vector2(370 + 15, 20),
      'blue',
      '20px Arial'
    )
  }

  private collisionHandler(data: ICollisionInfo) {
    this.lastCollisionInfo = data
    //console.log('recived collision info', this.lastCollisionInfo)
  }

  private scoreHandler(data: IScoreInfo) {
    this.score = data
    this.ballStopHandler()
  }

  private ballMoveHandler() {
    const ballAnim = this._entityManager
      .getStrict('ball')
      .getComponentByType(StateComponent)
    ballAnim.changeState(new MoveState())
  }

  private ballStopHandler() {
    const ballAnim = this._entityManager
      .getStrict('ball')
      .getComponentByType(StateComponent)
    ballAnim.changeState(new IdleState())
  }
}
