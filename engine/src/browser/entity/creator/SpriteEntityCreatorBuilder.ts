import { IAnimationConfig } from 'engine_api'
import SpriteObjectEntityBuilder from '../builder/SpriteObjectEntityBuilder'
import ObjectEntity from '../ObjectEntity'
import EntityCreatorBuilder from './EntityCreatorBuilder'
import { SpriteEntityCreator } from './SpriteEntityCreator'

export class SpriteEntityCreatorBuilder extends EntityCreatorBuilder {
  protected _animations!: IAnimationConfig[]

  withAnimations(animations: IAnimationConfig[]): this {
    this._animations = animations
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
      this._objectDataManager,
      entityFactory,
      this._logger,
      this._tileMap,
      this._renderer,
      this._input,
      this._animations
    )
  }
}
