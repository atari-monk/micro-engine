import { Direction, IEntity, InputDto } from 'engine_api'
import MovementSubSystemBase from './MovementSubSystemBase'
import ClientMovementComponent from '../../../component/ClientMovementComponent'

export default class ClientMovementSubSystem extends MovementSubSystemBase {
  private _inputDto!: InputDto
  private _keyToDirectionMap: { [key: string]: Direction } = {
    ArrowLeft: Direction.Left,
    ArrowRight: Direction.Right,
    ArrowUp: Direction.Up,
    ArrowDown: Direction.Down,
  }

  subscribeInput(entity: IEntity): void {
    super.subscribeInput(entity)
    this._inputDto = entity.getComponentByTypeStrict(
      ClientMovementComponent
    ).inputDto
  }

  protected OnLeft(): void {
    this._inputDto.addDirection(Direction.Left)
  }

  protected OnRight(): void {
    this._inputDto.addDirection(Direction.Right)
  }

  protected OnUp(): void {
    this._inputDto.addDirection(Direction.Up)
  }

  protected OnDown(): void {
    this._inputDto.addDirection(Direction.Down)
  }

  protected onKeyDown(key: string): void {
    const action = this._keyActions[key]
    if (action) {
      action()
    }
  }

  protected onKeyUp(key: string): void {
    const releasedDirection = this.getDirectionForKey(key)
    if (releasedDirection) {
      this._inputDto.removeDirection(releasedDirection)
    }
  }

  private getDirectionForKey(key: string): Direction | undefined {
    return this._keyToDirectionMap[key]
  }
}
