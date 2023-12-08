import PlayerEntity from '../../browser/entity/PlayerEntity'
import { default as EntityCreatorBuilderBase } from './../../browser/entity/EntityCreatorBuilder'
import EntityCreator from './EntityCreator'
import PlayerEntityBuilder from './builder/PlayerEntityBuilder'

export default class EntityCreatorBuilder extends EntityCreatorBuilderBase {
  build(): EntityCreator {
    const entityFactory = this._entityFactoryBuilder
      .withDependencyBuilder(this._dependencyBuilder)
      .build()

    entityFactory.playerEntityBuilder = new PlayerEntityBuilder(
      PlayerEntity,
      this._dependencyBuilder
    )

    return new EntityCreator(
      this._dependencyBuilder,
      this._entityManager,
      this._objectDataManager,
      entityFactory,
      this._logger,
      this._tileMap,
      this._renderer,
      this._input
    )
  }
}
