import IVector2 from '../../math/vector/IImmutableVector2'

export default interface IRendererV2 {
  clearCanvas(): void
  drawRect(position: IVector2, size: IVector2, color: string): void
  translate(v: IVector2): void
  resetTranslation(): void
  save(): void
  restore(): void
  getCenter(): IVector2
  fillCanvas(color: string): void
}
