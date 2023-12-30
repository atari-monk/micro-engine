import IVector2 from '../../math/vector/IImmutableVector2'
import IObject from '../data_model/IObject'

export default interface IRendererV2 {
  get ctx(): CanvasRenderingContext2D
  clearCanvas(): void
  drawRect(topLeft: IVector2, size: IVector2, color: string): void
  drawRectAroundPoint(center: IVector2, size: IVector2, color: string): void
  drawFrame(
    topLeft: IVector2,
    size: IVector2,
    color: string,
    lineWidth: number
  ): void
  drawFrameAroundPoint(
    center: IVector2,
    size: IVector2,
    color: string,
    lineWidth: number
  ): void
  translate(v: IVector2): void
  resetTranslation(): void
  save(): void
  restore(): void
  getCenter(): IVector2
  fillCanvas(color: string): void
  drawObject(object: IObject): void
  drawText(text: string, position: IVector2, color: string, font: string): void
}
