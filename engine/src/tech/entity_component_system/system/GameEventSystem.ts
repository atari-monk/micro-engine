import {
  ICollisionInfo,
  IEntity,
  IEntityManager,
  IEventSystem,
  IScoreInfo,
} from 'engine_api'
import NewGameStateComponent from '../../component/GameStateComponent'
import InitLogicSystemBase from './init_logic/InitLogicSystemBase'
import StateComponent from '../../component/StateComponent'
import MoveState from '../../state_machine/MoveState'
import IdleState from '../../state_machine/IdleState'

export default class GameEventSystem extends InitLogicSystemBase {
  constructor(
    entityManager: IEntityManager,
    private readonly _eventSystem: IEventSystem
  ) {
    super(entityManager)
    this._eventSystem.subscribe('ballMove', this.ballMoveHandler.bind(this))
    this._eventSystem.subscribe(
      'entityStopped',
      this.entityStoppedHandler.bind(this)
    )
    this._eventSystem.subscribe('playerMove', this.playerMoveHandler.bind(this))
  }

  initLogic(entity: IEntity): void {
    const gameStateComponent = entity.getComponentByTypeStrict(
      NewGameStateComponent
    )

    this._eventSystem.subscribe(
      'playerBallCollision',
      this.collisionHandler.bind(this, gameStateComponent)
    )
    this._eventSystem.subscribe(
      'updateScore',
      this.scoreHandler.bind(this, gameStateComponent)
    )
  }

  private collisionHandler(
    component: NewGameStateComponent,
    eventData: ICollisionInfo
  ) {
    component.lastCollisionInfo = eventData
  }

  private scoreHandler(
    component: NewGameStateComponent,
    eventData: IScoreInfo
  ) {
    component.score = eventData
    this.entityStoppedHandler('ball')
  }

  private ballMoveHandler() {
    const ballAnim = this._entityManager
      .getStrict('ball')
      .getComponentByTypeStrict(StateComponent)
    ballAnim.changeState(new MoveState(this._eventSystem))
  }

  private entityStoppedHandler(id: string) {
    if (id === 'ball') {
      const ballAnim = this._entityManager
        .getStrict('ball')
        .getComponentByTypeStrict(StateComponent)
      ballAnim.changeState(new IdleState(this._eventSystem))
    }
  }

  private playerMoveHandler(data: string) {
    const anim = this._entityManager
      .getStrict(data)
      .getComponentByTypeStrict(StateComponent)

    if (anim.changeState(new MoveState(this._eventSystem))) {
      setTimeout(() => {
        anim.changeState(new IdleState(this._eventSystem))
      }, 2000)
    }
  }
}
