export default abstract class BaseRenderer {
  protected canvas: HTMLCanvasElement
  protected context: CanvasRenderingContext2D

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!this.canvas) throw new Error(`No canvas on id: ${canvasId}`)
    const context = this.canvas.getContext('2d')
    if (!context)
      throw new Error(`Error getting 2d context for canvas on id: ${canvasId}`)
    this.context = context
  }

  clearCanvas(): void {
    this.context.fillStyle = '#000000'
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  getContext(): CanvasRenderingContext2D {
    return this.context
  }
}
