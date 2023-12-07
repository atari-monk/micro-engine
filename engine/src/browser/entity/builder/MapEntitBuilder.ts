import MapEntity from '../MapEntity'
import MapComponent from '../../component/MapComponent'
import EntityBuilder from './EntityBuilder'
import { IEntityDependencyListBuilder } from 'engine_api'

export default class MapEntityBuilder extends EntityBuilder<MapEntity> {
  constructor(
    entityType: new () => MapEntity,
    dependencyBuilder: IEntityDependencyListBuilder
  ) {
    super(entityType, dependencyBuilder)
  }

  assertComponentDependencies(): void {
    const getMessage = (propName: string, entityName = 'Map') =>
      `${propName} must be set before building ${entityName} entity.`

    if (!this._dependencyBuilder.tileMap) {
      throw new Error(getMessage('tileMap'))
    }
  }

  buildComponents() {
    const map = new MapComponent(this._dependencyBuilder.tileMap)

    this.entity.addComponent(map)
  }
}
