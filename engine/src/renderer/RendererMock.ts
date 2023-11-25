import { IImmutableVector2, IRendererV2 } from 'engine_api'
import ImmutableVector2 from '../math/ImmutableVector2'

export class RendererMock implements IRendererV2 {
  clearCanvas(): void {}
  drawRect(
    position: IImmutableVector2,
    size: IImmutableVector2,
    color: string
  ): void {}
  translate(v: IImmutableVector2): void {}
  resetTranslation(): void {}
  save(): void {}
  restore(): void {}
  getCenter(): IImmutableVector2 {
    return new ImmutableVector2()
  }
  fillCanvas(color: string): void {}
}
