import {
  ICollisionHandler,
  ICollisionInfo,
  IEventSystem,
  IObject,
} from 'engine_api'
import Vector2 from '../../math/vector/Vector2'

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

    //const obj1MassFactor = (2 * obj2.mass) / (obj1.mass + obj2.mass)
    const obj2MassFactor = (2 * obj1.mass) / (obj1.mass + obj2.mass)

    // const newObj1Velocity = Vector2.getNew(obj1.velocity)
    //   .add(Vector2.getNew(relativeV).multiply(obj1MassFactor))
    //   .multiply(this._cor)

    const newObj2Velocity = Vector2.getNew(obj2.velocity)
      .subtract(Vector2.getNew(relativeV).multiply(obj2MassFactor))
      .multiply(this._cor)

    //obj1.velocity.setValues(newObj1Velocity)
    obj2.velocity
      .setValues(newObj2Velocity)
      .multiply(this._speedMultiplier)
      .clampLength(0, this._maxSpeed)

    //console.log(obj1.color, obj2.mass)
    //console.log(obj2.velocity.x, obj2.velocity.y)

    this._eventSystem.publish('playerBallCollision', collisionInfo)
    if (Math.abs(obj2.velocity.x) > 0 || Math.abs(obj2.velocity.y) > 0)
      this._eventSystem.publish('ballMove')

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

    // Adjust the multiplier as needed
    const moveAmount = 1.1
    ball.position.x += normalizedVector.x * moveAmount
    ball.position.y += normalizedVector.y * moveAmount
  }
}
