import { IEntity, IEntityManager, IFactory, IManager } from 'engine_api'
import MovementComponent from '../../../component/MovementComponent'
import ObjectComponent from '../../../component/ObjectComponent'
import InitLogicSystemBase from '../init_logic/InitLogicSystemBase'
import IMovementSubSystem from './IMovementSubSystem'
import MapManager from '../../../entity_component/MapManager'

export default class MovementSystem extends InitLogicSystemBase {
  private _subSystemManager: IManager<IMovementSubSystem> =
    new MapManager<IMovementSubSystem>()

  constructor(
    entityManager: IEntityManager,
    private readonly _subSystemFactory: IFactory<IMovementSubSystem>
  ) {
    super(entityManager)
  }

  initLogic(entity: IEntity) {
    const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)

    const subSystem = this._subSystemFactory.create()
    subSystem.subscribeInput(entity)
    this._subSystemManager.add(objectComponent.id, subSystem)
  }

  unsubscribe(entity: IEntity) {
    const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)
    const subSystem = this._subSystemManager.getStrict(objectComponent.id)
    subSystem.unsubscribeInput()
  }
}
