import {
  ICollisionInfo,
  IEntity,
  IEntityManager,
  IEventSystem,
  IScoreInfo,
} from 'engine_api'
import GameStateComponent from '../../component/GameStateComponent'
import InitLogicSystemBase from './init_logic/InitLogicSystemBase'
import { EventNames } from '../../event_system/EventNames'

export default class GameStateSystem extends InitLogicSystemBase {
  constructor(
    entityManager: IEntityManager,
    private readonly _eventSystem: IEventSystem
  ) {
    super(entityManager)
  }

  initLogic(entity: IEntity): void {
    const gameStateComponent =
      entity.getComponentByTypeStrict(GameStateComponent)

    this._eventSystem.subscribe(
      EventNames.StoreLastCollisionInfo,
      this.handleStoreLastCollisionInfo.bind(this, gameStateComponent)
    )
    this._eventSystem.subscribe(
      EventNames.UpdateScore,
      this.handleUpdateScore.bind(this, gameStateComponent)
    )
  }

  private handleStoreLastCollisionInfo(
    component: GameStateComponent,
    eventData: ICollisionInfo
  ) {
    component.lastCollisionInfo = eventData
  }

  private handleUpdateScore(
    component: GameStateComponent,
    eventData: IScoreInfo
  ) {
    component.score = eventData
  }
}
