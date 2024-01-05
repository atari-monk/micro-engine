import {
  ICollisionHandler,
  ICollisionInfo,
  IEntityDataModel,
  IEntityManager,
  IEventSystem,
  IManager,
  IScoreInfo,
} from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'
import Vector2 from '../../math/vector/Vector2'
import GameStateComponent from '../component/GameStateComponent'
import IdleState from '../state_machine/IdleState'
import { EventNames } from '../event_system/EventNames'
import { EntityId } from '../entity/EntityId'

export default class BallGateCollisionHandler implements ICollisionHandler {
  constructor(
    private readonly _entityManager: IEntityManager,
    private readonly _entityDataManager: IManager<IEntityDataModel>,
    private readonly _eventSystem: IEventSystem
  ) {}

  handleCollision(collisionInfo: ICollisionInfo) {
    const player1Data = this._entityDataManager.getStrict(EntityId.Player1)
    const player2Data = this._entityDataManager.getStrict(EntityId.Player2)
    const ballData = this._entityDataManager.getStrict(EntityId.Ball)

    const player1ObjComponent = this._entityManager
      .getStrict(EntityId.Player1)
      .getComponentByTypeStrict(ObjectComponent)
    const player2ObjComponent = this._entityManager
      .getStrict(EntityId.Player2)
      .getComponentByTypeStrict(ObjectComponent)
    const ballObjComponent = this._entityManager
      .getStrict(EntityId.Ball)
      .getComponentByTypeStrict(ObjectComponent)

    player1ObjComponent.position = Vector2.getNew(player1Data.object.position)
    player1ObjComponent.velocity = Vector2.getNew(player1Data.object.velocity)
    player2ObjComponent.position = Vector2.getNew(player2Data.object.position)
    player2ObjComponent.velocity = Vector2.getNew(player2Data.object.velocity)
    ballObjComponent.velocity = new Vector2()
    ballObjComponent.position = Vector2.getNew(ballData.object.position)

    const gameState = this._entityManager
      .getStrict(EntityId.GameState)
      .getComponentByTypeStrict(GameStateComponent)

    if (collisionInfo.object1.id === EntityId.LeftGate) {
      if (gameState.lastCollisionInfo.object1.id === EntityId.Player2) {
        player2ObjComponent.score++
        this.sendEvents(
          player1ObjComponent,
          player2ObjComponent,
          ballObjComponent
        )
      }
    }

    if (collisionInfo.object1.id === EntityId.RightGate) {
      if (gameState.lastCollisionInfo.object1.id === EntityId.Player1) {
        player1ObjComponent.score++
        this.sendEvents(
          player1ObjComponent,
          player2ObjComponent,
          ballObjComponent
        )
      }
    }
  }

  private sendEvents(
    player1Component: ObjectComponent,
    player2Component: ObjectComponent,
    ballCompoent: ObjectComponent
  ) {
    this._eventSystem.publish(EventNames.UpdateScore, {
      redScore: player1Component.score,
      blueScore: player2Component.score,
    } as IScoreInfo)
    this._eventSystem.publish(EventNames.ChangeState, {
      id: ballCompoent.id,
      newState: new IdleState(this._eventSystem),
    })
  }
}
