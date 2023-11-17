import { IRenderer } from 'engine_api'
import BaseRenderer from './BaseRenderer'

export default class Renderer extends BaseRenderer implements IRenderer {
  constructor(canvasId: string) {
    super(canvasId)
  }

  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this.context.fillStyle = color
    this.context.fillRect(x, y, width, height)
  }
  // Add more drawing methods as needed (circles, images, etc.)
}
