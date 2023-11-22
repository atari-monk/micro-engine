import { IRendererV2, IVector2 } from 'engine_api'
import BaseRenderer from './BaseRenderer'
import Vector2 from '../math/Vector2'

export default class RendererV2 extends BaseRenderer implements IRendererV2 {
  constructor(canvasId: string) {
    super(canvasId)
  }

  drawRect(position: IVector2, size: IVector2, color: string): void {
    this.context.fillStyle = color
    this.context.fillRect(position.x, position.y, size.x, size.y)
  }

  save() {
    this.context.save()
  }

  restore() {
    this.context.restore()
  }

  translate(v: IVector2) {
    this.context.translate(v.x, v.y)
  }

  resetTranslation() {
    this.context.setTransform(1, 0, 0, 1, 0, 0)
  }

  getCenter(): IVector2 {
    return new Vector2(this.canvas.width / 2, this.canvas.height / 2)
  }

  fillCanvas(color: string): void {
    this.context.fillStyle = color
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
