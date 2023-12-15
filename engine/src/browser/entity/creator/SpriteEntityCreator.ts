import { IEntityManager, IManager, ISprite } from 'engine_api'
import MapEntityBuilder from '../builder/MapEntitBuilder'
import PlayerEntityBuilder from '../builder/PlayerEntityBuilder'
import SpriteObjectEntityBuilder from '../builder/SpriteObjectEntityBuilder'

export default class SpriteEntityCreator {
  mapEntityBuilder: MapEntityBuilder
  objectEntityBuilder: SpriteObjectEntityBuilder
  playerEntityBuilder: PlayerEntityBuilder

  constructor(
    private readonly _entityManager: IEntityManager,
    private readonly _dataManager: IManager<ISprite>
  ) {
    this.mapEntityBuilder = new MapEntityBuilder()
    this.objectEntityBuilder = new SpriteObjectEntityBuilder()
    this.playerEntityBuilder = new PlayerEntityBuilder()
  }

  public createEntities() {
    this.createObjectEntity('object2', 'object2')
  }

  private createObjectEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this.objectEntityBuilder.build(this._dataManager.getStrict(dataKey))
    )
  }
}
