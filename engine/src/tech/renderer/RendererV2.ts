import { IObject, IRendererV2, IVector2 } from 'engine_api'
import BaseRenderer from './BaseRenderer'
import Vector2 from '../../math/vector/Vector2'

export default class RendererV2 extends BaseRenderer implements IRendererV2 {
  constructor(canvasId: string) {
    super(canvasId)
  }

  drawRect(position: IVector2, size: IVector2, color: string): void {
    this.context.fillStyle = color
    this.context.fillRect(position.x, position.y, size.x, size.y)
  }

  drawFrame(
    position: IVector2,
    size: IVector2,
    color: string,
    lineWidth: number
  ): void {
    this.context.strokeStyle = color
    this.context.lineWidth = lineWidth
    this.context.strokeRect(position.x, position.y, size.x, size.y)
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

  drawObject(object: IObject): void {
    this.drawCollisionBox(object)
    const arrowScale = 5
    const arrowEnd = new Vector2(
      object.position.x + object.velocity.x * arrowScale,
      object.position.y + object.velocity.y * arrowScale
    )

    this.context.beginPath()
    this.context.moveTo(object.position.x, object.position.y)
    this.context.lineTo(arrowEnd.x, arrowEnd.y)
    this.context.strokeStyle = object.color
    this.context.lineWidth = 2
    this.context.stroke()

    const centerSize = 3
    this.context.fillStyle = object.color
    this.context.fillRect(
      object.position.x - centerSize / 2,
      object.position.y - centerSize / 2,
      centerSize,
      centerSize
    )
  }

  private drawCollisionBox(object: IObject, fill = false) {
    if (fill) {
      this.drawRect(object.position, object.size, object.color)
    } else {
      this.drawFrame(object.position, object.size, object.color, 2)
    }
  }
}
