export default interface IRenderer {
  clearCanvas(): void
  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void
  // Add more drawing methods as needed (circles, images, etc.)
}
