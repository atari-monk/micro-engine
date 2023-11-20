export default interface ICamera {
  setPosition(x: number, y: number): void
  translate(context: CanvasRenderingContext2D): void
}
