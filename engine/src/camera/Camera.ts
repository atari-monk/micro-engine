import { ICamera, IVector2 } from 'engine_api'
import Vector2 from '../math/Vector2'

export default class Camera implements ICamera {
  private position: IVector2 = new Vector2(0, 0)

  setPosition(x: number, y: number): void {
    this.position = new Vector2(x, y)
  }

  translate(context: CanvasRenderingContext2D): void {
    context.save()
    const { x, y } = this.position
    context.translate(-x, -y)
    context.restore()
  }
}
