import {
  IEntity,
  IEntityBuilder,
  IEntityDataModel,
  IEntityManager,
  IInputManager,
  ILogger,
  IManager,
  IRendererV2,
  ITileMap,
} from 'engine_api'
import MapComponent from '../component/MapComponent'
import ObjectComponent from '../component/ObjectComponent'
import RenderComponent from '../component/RenderComponent'
import MovementComponent from '../component/MovementComponent'
import SpriteComponent from '../component/SpriteComponent'
import { OperationMap } from '../../utils/operation/OperationMap'
import { Operation } from '../../utils/operation/Operation'
import AssertHelper from '../../utils/AssertionHelper'
import ClientMovementComponent from '../component/ClientMovementComponent'
import ServerMovementComponent from '../component/ServerMovementComponent'
import StateComponent from '../state_machine/StateComponent'

export default class EntityBuilder implements IEntityBuilder {
  protected _entity!: IEntity
  private _renderer!: IRendererV2
  private _entityData!: IEntityDataModel
  private _operationMap: OperationMap = new OperationMap()
  private _assert: AssertHelper = new AssertHelper(this)

  constructor(
    private readonly _dataManager: IManager<IEntityDataModel>,
    private readonly _entityManager: IEntityManager
  ) {}

  recordOperation(operation: Operation): this {
    this._operationMap.addOperation(operation)
    return this
  }

  protected executeOperations(entityDatakey: string): void {
    this._operationMap.executeOperations(entityDatakey)
  }

  private assertEntity(): void {
    this._assert.assertField('_entity')
  }

  private assertRenderer(): void {
    this._assert.assertField('_renderer')
  }

  private assertEntityData(): void {
    this._assert.assertField('_entityData')
  }

  private assertNestedLogger(): void {
    this._assert.assertNested('_entity', 'logger')
  }

  withEntity<T extends IEntity>(entityFunction: () => T) {
    this._entity = entityFunction()
    return this
  }

  withLogger(logger: ILogger): this {
    this.assertEntity()
    this._entity.logger = logger
    return this
  }

  withRenderer(renderer: IRendererV2): this {
    this._renderer = renderer
    return this
  }

  withMapComponent(tileMap: ITileMap): this {
    this._entity.addComponent(new MapComponent(tileMap))
    return this
  }

  withEntityData(dataKey: string): this {
    this._entityData = this._dataManager.getStrict(dataKey)
    return this
  }

  withObjectComponent(): this {
    this.assertEntityData()
    this._entity.addComponent(new ObjectComponent(this._entityData.object))
    return this
  }

  withRenderComponent(): this {
    this.assertRenderer()
    this._entity.addComponent(
      new RenderComponent(
        this._entity.getComponentByType<ObjectComponent>(ObjectComponent),
        this._renderer
      )
    )
    return this
  }

  withMovementComponent(input: IInputManager): this {
    this._entity.addComponent(
      new MovementComponent(
        this._entity.getComponentByType<ObjectComponent>(ObjectComponent),
        input
      )
    )
    return this
  }

  withClientMovementComponent(input: IInputManager): this {
    this._entity.addComponent(new ClientMovementComponent(input))
    return this
  }

  withServerMovementComponent(): this {
    this._entity.addComponent(
      new ServerMovementComponent(
        this._entity.getComponentByType<ObjectComponent>(ObjectComponent)
      )
    )
    return this
  }

  withSpriteComponent() {
    this.assertRenderer()
    this.assertEntityData()
    this._entity.addComponent(
      new SpriteComponent(
        this._renderer,
        this._entity.getComponentByType<ObjectComponent>(ObjectComponent),
        this._entityData.animations
      )
    )
    return this
  }

  withStateComponent() {
    this._entity.addComponent(new StateComponent(this._entity))
    return this
  }

  build(entityDataKey: string, entityKey: string) {
    this.executeOperations(entityDataKey)
    this.assertEntity()
    this.assertNestedLogger()
    this._entityManager.add(entityKey, this._entity)
  }
}
