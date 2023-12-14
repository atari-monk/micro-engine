import { ITilemap } from 'engine_api'
import MapEntity from '../MapEntity'
import MapComponent from '../../component/MapComponent'
import EntityBuilder from './EntityBuilder'

export default class MapEntityBuilder extends EntityBuilder {
  private _tileMap?: ITilemap

  withTileMap(tileMap: ITilemap): this {
    this._tileMap = tileMap
    return this
  }

  build(): MapEntity {
    if (this._logger === undefined) throw new Error('Logger not set!')
    if (this._tileMap === undefined) throw new Error('Tile map not set!')

    const entity = new MapEntity()
    entity.logger = this._logger
    entity.addComponent(new MapComponent(this._tileMap))

    return entity
  }
}
