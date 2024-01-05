import {
  ICollisionHandler,
  ICollisionInfo,
  IEventSystem,
  IObject,
} from 'engine_api'
import Vector2 from '../../math/vector/Vector2'
import MoveState from '../state_machine/MoveState'
import { EventNames } from '../event_system/EventNames'

export default class PlayerBallCollisionHandler implements ICollisionHandler {
  private _cor: number = 0.9
  private _collisionCooldown: boolean = false
  private _speedMultiplier: number = 10
  private _maxSpeed = 100

  constructor(private readonly _eventSystem: IEventSystem) {}

  handleCollision(collisionInfo: ICollisionInfo) {
    if (this._collisionCooldown) {
      return
    }

    const obj1 = collisionInfo.object1
    const obj2 = collisionInfo.object2

    this.moveBall(obj1, obj2)

    const v1 = Vector2.getNew(obj1.velocity)
    const v2 = Vector2.getNew(obj2.velocity)
    const relativeV = v2.subtract(v1)

    const obj2MassFactor = (2 * obj1.mass) / (obj1.mass + obj2.mass)

    const newObj2Velocity = Vector2.getNew(obj2.velocity)
      .subtract(Vector2.getNew(relativeV).multiply(obj2MassFactor))
      .multiply(this._cor)

    obj2.velocity
      .setValues(newObj2Velocity)
      .multiply(this._speedMultiplier)
      .clampLength(0, this._maxSpeed)

    this._eventSystem.publish(EventNames.StoreLastCollisionInfo, collisionInfo)
    if (Math.abs(obj2.velocity.x) > 0 || Math.abs(obj2.velocity.y) > 0)
      this._eventSystem.publish(EventNames.ChangeState, {
        id: obj2.id,
        newState: new MoveState(this._eventSystem),
      })

    this._collisionCooldown = true

    setTimeout(() => {
      this._collisionCooldown = false
    }, 200)
  }

  private moveBall(player: IObject, ball: IObject) {
    const separationVector = {
      x: player.position.x - ball.position.x,
      y: player.position.y - ball.position.y,
    }

    const length = Math.sqrt(
      separationVector.x * separationVector.x +
        separationVector.y * separationVector.y
    )

    const normalizedVector = {
      x: separationVector.x / length,
      y: separationVector.y / length,
    }

    const moveAmount = 1.1
    ball.position.x += normalizedVector.x * moveAmount
    ball.position.y += normalizedVector.y * moveAmount
  }
}
