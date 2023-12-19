import {
  IEntity,
  IEntityDataModel,
  IEntityManager,
  IInputManager,
  ILogger,
  IManager,
  IRendererV2,
  ITileMap,
} from 'engine_api'
import MapComponent from '../../../tech/component/MapComponent'
import ObjectComponent from '../../../tech/component/ObjectComponent'
import RenderComponent from '../../../tech/component/RenderComponent'
import MovementComponent from '../../../tech/component/MovementComponent'
import SpriteComponent from '../../../tech/component/SpriteComponent'

type Operation = (param?: string) => void

export class OperationMap {
  private operations: Operation[] = []

  addOperation(operation: Operation): void {
    this.operations.push(operation)
  }

  executeOperations(param?: string): void {
    this.operations.forEach((operation) => operation(param))
  }
}

export default class EntityBuilder {
  private _entity!: IEntity
  private _logger!: ILogger
  private _renderer!: IRendererV2
  private _entityData!: IEntityDataModel
  private operationMap: OperationMap = new OperationMap()

  constructor(
    private readonly _dataManager: IManager<IEntityDataModel>,
    private readonly _entityManager: IEntityManager
  ) {}

  recordOperation(operation: Operation): this {
    this.operationMap.addOperation(operation)
    return this
  }

  private executeOperations(entityDatakey: string): void {
    this.operationMap.executeOperations(entityDatakey)
  }

  withEntity<T extends IEntity>(entity: T) {
    this._entity = entity
    return this
  }

  private ensureEntitySet(): void {
    if (this._entity === undefined) {
      throw new Error(
        'withEntity must be invoked first when using EntityBuilder.'
      )
    }
  }

  withLogger(logger: ILogger): this {
    this.ensureEntitySet()
    this._entity.logger = logger
    this._logger = logger
    return this
  }

  private ensureLoggerSet(): void {
    if (this._logger === undefined) {
      throw new Error(
        'withLogger must be invoked before methods that depend on logger.'
      )
    }
  }

  withRenderer(renderer: IRendererV2): this {
    this._renderer = renderer
    return this
  }

  private ensureRendererSet(): void {
    if (this._renderer === undefined) {
      throw new Error(
        'withRenderer must be invoked before methods that depend on renderer.'
      )
    }
  }

  withMapComponent(tileMap: ITileMap): this {
    this._entity.addComponent(new MapComponent(tileMap))
    return this
  }

  withEntityData(dataKey: string): this {
    this._entityData = this._dataManager.getStrict(dataKey)
    return this
  }

  private ensureEntityDataSet(): void {
    if (this._entityData === undefined) {
      throw new Error(
        'withEntityData must be invoked before methods that depend on data.'
      )
    }
  }

  withObjectComponent(): this {
    this.ensureEntityDataSet()
    this._entity.addComponent(new ObjectComponent(this._entityData.object))
    return this
  }

  withRenderComponent(): this {
    this.ensureRendererSet()
    this._entity.addComponent(
      new RenderComponent(
        this._entity.getComponentByType<ObjectComponent>(ObjectComponent),
        this._renderer
      )
    )
    return this
  }

  withMovementComponent(input: IInputManager): this {
    this.ensureLoggerSet()
    this._entity.addComponent(
      new MovementComponent(
        this._entity.getComponentByType<ObjectComponent>(ObjectComponent),
        input,
        this._logger
      )
    )
    return this
  }

  withSpriteComponent() {
    this.ensureRendererSet()
    this.ensureEntityDataSet()
    this._entity.addComponent(
      new SpriteComponent(
        this._renderer,
        this._entity.getComponentByType<ObjectComponent>(ObjectComponent),
        this._entityData.animations
      )
    )
    return this
  }

  build(entityDataKey: string, entityKey: string) {
    this.ensureEntitySet()
    this.executeOperations(entityDataKey)
    this._entityManager.add(entityKey, this._entity)
  }
}
