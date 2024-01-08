import { Direction, InputDto } from 'engine_api'
import MovementSubSystemBase from './MovementSubSystemBase'

export default class ClientMovementSubSystem extends MovementSubSystemBase {
  private _inputDto: InputDto = new InputDto()
  private _keyToDirectionMap: { [key: string]: Direction } = {
    ArrowLeft: Direction.Left,
    ArrowRight: Direction.Right,
    ArrowUp: Direction.Up,
    ArrowDown: Direction.Down,
  }

  get inputDto(): InputDto {
    return this._inputDto
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
