import { Direction, IEntity, IUpdateable, InputDto } from 'engine_api'
import ObjectComponent from '../../../component/ObjectComponent'
import ServerMovementComponent from '../../../component/ServerMovementComponent'

export default class ServerMovementSubSystem implements IUpdateable {
  private readonly _keyActions: {
    [key in Direction]: (deltaTime: number) => void
  }
  private _inputDto: InputDto

  constructor(entity: IEntity) {
    const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)
    const serverMovementComponent = entity.getComponentByTypeStrict(
      ServerMovementComponent
    )
    this._inputDto = serverMovementComponent.inputDto

    this._keyActions = {
      [Direction.Up]: (deltaTime) => {
        objectComponent.position.y -= Math.round(
          objectComponent.moveStep.y * deltaTime
        )
      },
      [Direction.Down]: (deltaTime) => {
        objectComponent.position.y += Math.round(
          objectComponent.moveStep.y * deltaTime
        )
      },
      [Direction.Left]: (deltaTime) => {
        objectComponent.position.x -= Math.round(
          objectComponent.moveStep.x * deltaTime
        )
      },
      [Direction.Right]: (deltaTime) => {
        objectComponent.position.x += Math.round(
          objectComponent.moveStep.x * deltaTime
        )
      },
    }
  }

  update(deltaTime: number): void {
    if (!this._inputDto.direction) return
    for (const direction of this._inputDto.direction) {
      if (!this._keyActions[direction]) continue
      this._keyActions[direction](deltaTime)
    }
  }
}
