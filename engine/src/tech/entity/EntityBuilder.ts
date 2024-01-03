import {
  IEntity,
  IEntityBuilder,
  IEntityDataModel,
  IEntityManager,
  IEventSystem,
  IInputManager,
  ILogger,
  IManager,
  IRendererV2,
  ITileMap,
  IVector2,
} from 'engine_api'
import MapComponent from '../component/MapComponent'
import ObjectComponent from '../component/ObjectComponent'
import RenderComponent from '../component/RenderComponent'
import MovementComponent from '../component/MovementComponent'
import { OperationMap } from '../../utils/operation/OperationMap'
import { Operation } from '../../utils/operation/Operation'
import AssertHelper from '../../utils/AssertionHelper'
import ClientMovementComponent from '../component/ClientMovementComponent'
import ServerMovementComponent from '../component/ServerMovementComponent'
import StateComponent from '../component/StateComponent'
import CollisionComponent from '../component/CollisionComponent'
import { KinematicsComponent } from '../component/KinematicsComponent'
import LimitMoveComponent from '../component/LimitMoveComponent'
import Vector2 from '../../math/vector/Vector2'
import GameStateComponent from '../component/GameStateComponent'
import WallComponent from '../entity_component_system/component/WallComponent'
import CollisionCircleComponent from '../entity_component_system/component/CollisionCircleComponent'

export default class EntityBuilder implements IEntityBuilder {
  protected _entity!: IEntity
  private _renderer!: IRendererV2
  private _entityData!: IEntityDataModel
  private _operationMap: OperationMap = new OperationMap()
  private _assert: AssertHelper = new AssertHelper(this)
  private _eventSystem!: IEventSystem

  get entityData(): IEntityDataModel {
    this.assertEntityData()
    return this._entityData
  }

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

  private assertEventSystem(): void {
    this._assert.assertField('_eventSystem')
  }

  private assertNestedLogger(): void {
    this._assert.assertNested('_entity', '_logger')
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
    this.assertEntityData()
    const component = new RenderComponent()
    component.spriteAnimation = this._entityData.animations
    this._entity.addComponent(component)
    return this
  }

  withMovementComponent(): this {
    this.assertEntityData()
    const component = new MovementComponent()
    component.moveSpeed = this._entityData.object.moveStep.x
    component.useArrowKeys = this._entityData.object.useArrowKeys
    component.velocity = this._entityData.object.velocity
    this._entity.addComponent(component)
    return this
  }

  withClientMovementComponent(input: IInputManager): this {
    this._entity.addComponent(new ClientMovementComponent(input))
    return this
  }

  withServerMovementComponent(): this {
    this._entity.addComponent(
      new ServerMovementComponent(
        this._entity.getComponentByType(ObjectComponent)
      )
    )
    return this
  }

  withStateComponent() {
    this.assertEventSystem()
    this._entity.addComponent(
      new StateComponent(this._entity, this._eventSystem)
    )
    return this
  }

  withCollisionComponent() {
    const component = new CollisionComponent()
    this._entity.addComponent(component)
    return this
  }

  withKinematicsComponent(
    frictionCoefficient: number = 0,
    stopThreshold: number = 0
  ) {
    this.assertEventSystem()
    const component = new KinematicsComponent()
    component.frictionCoefficient = frictionCoefficient
    component.stopThreshold = stopThreshold
    this._entity.addComponent(component)
    return this
  }

  withLimitMoveComponent() {
    const component = new LimitMoveComponent()
    component.limitSize = new Vector2(740, 360)
    this._entity.addComponent(component)
    return this
  }

  withEventSystem(eventSystem: IEventSystem) {
    this._eventSystem = eventSystem
    return this
  }

  withGameStateComponent() {
    this.assertEventSystem()
    this.assertRenderer()
    this._entity.addComponent(
      new GameStateComponent(
        this._eventSystem,
        this._renderer,
        this._entityManager
      )
    )
    return this
  }

  withCollisionCircleComponent() {
    this.assertEntityData()
    const component = new CollisionCircleComponent()
    component.radius = this._entityData.object.size.x / 2
    this._entity.addComponent(component)
    return this
  }

  withWallComponent(size: IVector2) {
    const component = new WallComponent()
    component.size = size
    this._entity.addComponent(component)
    return this
  }

  build(entityDataKey: string, entityKey: string) {
    this.executeOperations(entityDataKey)
    this.assertEntity()
    this.assertNestedLogger()
    this._entityManager.add(entityKey, this._entity)
  }
}
