import { IImmutableVector2, IObject, IRendererV2 } from 'engine_api'
import ImmutableVector2 from '../../math/vector/ImmutableVector2'

export class RendererMock implements IRendererV2 {
  drawText(
    text: string,
    position: IImmutableVector2,
    color: string,
    font: string
  ): void {}
  drawRect(
    topLeft: IImmutableVector2,
    size: IImmutableVector2,
    color: string
  ): void {}
  drawFrameAroundPoint(
    center: IImmutableVector2,
    size: IImmutableVector2,
    color: string,
    lineWidth: number
  ): void {}
  drawObject(object: IObject): void {}
  drawFrame(
    position: IImmutableVector2,
    size: IImmutableVector2,
    color: string,
    lineWidth: number
  ): void {}
  get ctx(): CanvasRenderingContext2D {
    return {} as CanvasRenderingContext2D
  }
  clearCanvas(): void {}
  drawRectAroundPoint(
    position: IImmutableVector2,
    size: IImmutableVector2,
    color: string
  ): void {}
  translate(v: IImmutableVector2): void {}
  resetTranslation(): void {}
  save(): void {}
  restore(): void {}
  getCenter(): IImmutableVector2 {
    return new ImmutableVector2(1920 / 2, 1080 / 2)
  }
  fillCanvas(color: string): void {}
}
