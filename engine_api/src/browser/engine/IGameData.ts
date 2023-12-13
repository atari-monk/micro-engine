import ITilemapDataFactory from '../../tech/tile_map/ITilemapDataFactory'
import IManager from '../../tech/entity_component/IManager'
import IObject from '../component/IObject'
import ISprite from '../component/ISprite'

export default interface IGameData {
  objectData: IManager<IObject>
  spriteData: IManager<ISprite>
  tileMapData: ITilemapDataFactory
}
