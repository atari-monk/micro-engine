import { IManager, ISprite } from 'engine_api'
import SpriteObjectEntityBuilder from '../builder/SpriteObjectEntityBuilder'
import ObjectEntity from '../ObjectEntity'
import BasicEntityCreatorBuilder from './BasicEntityCreatorBuilder'
import { SpriteEntityCreator } from './SpriteEntityCreator'

export class SpriteEntityCreatorBuilder extends BasicEntityCreatorBuilder {
  protected _spriteDataManager!: IManager<ISprite>

  withSpriteDataManager(spriteDataManager: IManager<ISprite>): this {
    this._spriteDataManager = spriteDataManager
    return this
  }

  build(): SpriteEntityCreator {
    const entityFactory = this._entityFactoryBuilder
      .withDependencyBuilder(this._dependencyBuilder)
      .build()

    entityFactory.objectEntityBuilder = new SpriteObjectEntityBuilder(
      ObjectEntity,
      this._dependencyBuilder
    )

    return new SpriteEntityCreator(
      this._dependencyBuilder,
      this._entityManager,
      this._spriteDataManager,
      entityFactory,
      this._logger,
      this._tileMap,
      this._renderer,
      this._input
    )
  }
}
