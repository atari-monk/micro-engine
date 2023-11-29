import IRenderable from '../entity_component/IRenderable'
import ITilemapDataFactory from './ITilemapDataFactory'

export default interface ITilemap extends IRenderable {
  load(mapFactory: ITilemapDataFactory): void
}
