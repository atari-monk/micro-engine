import IVector2 from '../math/IVector2'

export default interface IRendererV2 {
  clearCanvas(): void
  drawRect(position: IVector2, size: IVector2, color: string): void
}
