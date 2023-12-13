import ObjectEntity from '../../browser/entity/ObjectEntity'
import PlayerEntity from '../../browser/entity/PlayerEntity'
import { default as BasicEntityCreatorBuilder } from '../../browser/entity/creator/BasicEntityCreatorBuilder'
import EntityCreator from './EntityCreator'
import ObjectEntityBuilder from './builder/ObjectEntityBuilder'
import PlayerEntityBuilder from './builder/PlayerEntityBuilder'

export default class EntityCreatorBuilder extends BasicEntityCreatorBuilder {
  build(): EntityCreator {
    const entityFactory = this._entityFactoryBuilder
      .withDependencyBuilder(this._dependencyBuilder)
      .build()

    entityFactory.playerEntityBuilder = new PlayerEntityBuilder(
      PlayerEntity,
      this._dependencyBuilder
    )
    entityFactory.objectEntityBuilder = new ObjectEntityBuilder(
      ObjectEntity,
      this._dependencyBuilder
    )

    return new EntityCreator(
      this._dependencyBuilder,
      this._entityManager,
      entityFactory,
      this._logger,
      this._tileMap,
      this._renderer,
      this._input,
      this._objectDataManager
    )
  }
}
