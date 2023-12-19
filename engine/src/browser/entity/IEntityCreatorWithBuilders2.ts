import { IEntityCreator } from 'engine_api'
import EntityBuilder from './builder/EntityBuilder'

export default interface IEntityCreatorWithBuilders2 extends IEntityCreator {
  set mapEntityBuilder(mapEntityBuilder: EntityBuilder)
  set objectEntityBuilder(objectEntityBuilder: EntityBuilder)
  set spriteObjectEntityBuilder(spriteObjectEntityBuilder: EntityBuilder)
  set playerEntityBuilder(playerEntityBuilder: EntityBuilder)
}
