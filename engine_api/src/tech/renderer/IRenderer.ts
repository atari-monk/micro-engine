export default interface IRenderer {
  clearCanvas(): void
  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void
}
