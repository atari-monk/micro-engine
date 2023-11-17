export default abstract class BaseRenderer {
  protected canvas: HTMLCanvasElement
  protected context: CanvasRenderingContext2D

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!
  }

  clearCanvas(): void {
    this.context.fillStyle = '#000000'
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  getContext(): CanvasRenderingContext2D {
    return this.context
  }
}
