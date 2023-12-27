import { IObject, IRendererV2, IVector2 } from 'engine_api'
import BaseRenderer from './BaseRenderer'
import Vector2 from '../../math/vector/Vector2'

export default class RendererV2 extends BaseRenderer implements IRendererV2 {
  constructor(canvasId: string) {
    super(canvasId)
  }

  drawRect(topLeft: IVector2, size: IVector2, color: string = 'yellow'): void {
    this.context.fillStyle = color
    this.context.fillRect(topLeft.x, topLeft.y, size.x, size.y)
  }

  drawRectAroundPoint(
    center: IVector2,
    size: IVector2,
    color: string = 'yellow'
  ): void {
    this.context.fillStyle = color
    this.context.fillRect(
      center.x - size.x / 2,
      center.y - size.y / 2,
      size.x,
      size.y
    )
  }

  drawFrame(
    topLeft: IVector2,
    size: IVector2,
    color: string = 'yellow',
    lineWidth: number = 2
  ): void {
    this.context.strokeStyle = color
    this.context.lineWidth = lineWidth
    this.context.strokeRect(topLeft.x, topLeft.y, size.x, size.y)
  }

  drawFrameAroundPoint(
    center: IVector2,
    size: IVector2,
    color: string = 'yellow',
    lineWidth: number = 2
  ): void {
    this.context.strokeStyle = color
    this.context.lineWidth = lineWidth
    this.context.strokeRect(
      center.x - size.x / 2,
      center.y - size.y / 2,
      size.x,
      size.y
    )
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

    this.drawPoint(object.position)
  }

  private drawPoint(point: IVector2, halfSize: number = 1.5, color = 'yellow') {
    const size = halfSize * 2
    this.context.fillStyle = color
    this.context.fillRect(point.x - halfSize, point.y - halfSize, size, size)
  }

  private drawCollisionBox(object: IObject, fill = false) {
    if (fill) {
      this.drawRectAroundPoint(object.position, object.size, object.color)
    } else {
      this.drawFrameAroundPoint(object.position, object.size, object.color)
    }
  }
}
