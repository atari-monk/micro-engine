import IRenderable from '../entity_component/IRenderable'
import IRendererV2 from '../renderer/IRendererV2'
import ITileMapDataFactory from './ITileMapDataFactory'

export default interface ITileMap extends IRenderable {
  set renderer(renderer: IRendererV2)
  load(mapFactory: ITileMapDataFactory): void
}
