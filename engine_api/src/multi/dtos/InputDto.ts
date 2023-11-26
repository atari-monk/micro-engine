import { Direction } from './Direction'

export default class InputDto {
  private _id: string = ''
  private _direction: Direction[] | undefined = []

  get id(): string {
    return this._id
  }

  set id(id: string) {
    this._id = id
  }

  get direction(): Direction[] | undefined {
    return this._direction
  }

  addDirection(direction: Direction) {
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
