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

export default class BallGateCollisionHandler implements ICollisionHandler {
  constructor(
    private readonly _entityManager: IEntityManager,
    private readonly _entityDataManager: IManager<IEntityDataModel>,
    private readonly _eventSystem: IEventSystem
  ) {}

  handleCollision(collisionInfo: ICollisionInfo) {
    const player1Data = this._entityDataManager.getStrict('player1')
    const player2Data = this._entityDataManager.getStrict('player2')
    const ballData = this._entityDataManager.getStrict('ball')

    const player1Obj = this._entityManager
      .getStrict('player1')
      .getComponentByTypeStrict(ObjectComponent)
    const player2Obj = this._entityManager
      .getStrict('player2')
      .getComponentByTypeStrict(ObjectComponent)
    const ballObj = this._entityManager
      .getStrict('ball')
      .getComponentByTypeStrict(ObjectComponent)

    player1Obj.position = Vector2.getNew(player1Data.object.position)
    player1Obj.velocity = Vector2.getNew(player1Data.object.velocity)
    player2Obj.position = Vector2.getNew(player2Data.object.position)
    player2Obj.velocity = Vector2.getNew(player2Data.object.velocity)
    ballObj.velocity = new Vector2()
    ballObj.position = Vector2.getNew(ballData.object.position)

    const gameState = this._entityManager
      .getStrict('gameState')
      .getComponentByTypeStrict(GameStateComponent)

    if (collisionInfo.object1.id === 'leftGate') {
      if (gameState.lastCollisionInfo.object1.id === 'player2') {
        player2Obj.score++
        this._eventSystem.publish('updateScore', {
          redScore: player1Obj.score,
          blueScore: player2Obj.score,
        } as IScoreInfo)
      }
    }

    if (collisionInfo.object1.id === 'rightGate') {
      if (gameState.lastCollisionInfo.object1.id === 'player1') {
        player1Obj.score++
        this._eventSystem.publish('updateScore', {
          redScore: player1Obj.score,
          blueScore: player2Obj.score,
        } as IScoreInfo)
      }
    }
  }
}
