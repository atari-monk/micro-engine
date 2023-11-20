export default interface IRenderable {
  render(context: CanvasRenderingContext2D, tileSize: number): void
}
