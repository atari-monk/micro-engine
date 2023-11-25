import { Direction } from './Direction'

export default class InputDto {
  private _direction: Direction[] | undefined = []

  get direction(): Direction[] | undefined {
    return this._direction
  }

  set direction(direction: Direction) {
    if (!this._direction) {
      this._direction = []
    }
    if (!this._direction.includes(direction)) {
      this._direction.push(direction)
    }
  }

  removeDirection(direction: Direction) {
    if (this._direction) {
      const index = this._direction.indexOf(direction)
      if (index !== -1) {
        this._direction.splice(index, 1)
      }
      if (this._direction.length === 0) {
        this._direction = undefined
      }
    }
  }
}
