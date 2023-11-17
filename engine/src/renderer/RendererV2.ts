import { IRendererV2, IVector2 } from 'engine_api'
import BaseRenderer from './BaseRenderer'

export default class RendererV2 extends BaseRenderer implements IRendererV2 {
  constructor(canvasId: string) {
    super(canvasId)
  }

  drawRect(position: IVector2, size: IVector2, color: string): void {
    this.context.fillStyle = color
    this.context.fillRect(position.x, position.y, size.x, size.y)
  }
  // Add more drawing methods as needed (circles, images, etc.)
}
