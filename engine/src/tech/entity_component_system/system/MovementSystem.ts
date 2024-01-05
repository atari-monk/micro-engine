import {
  IEntity,
  IEntityManager,
  IEventSystem,
  IInputManager,
} from 'engine_api'
import MovementComponent from '../../component/MovementComponent'
import ObjectComponent from '../../component/ObjectComponent'
import MovementSubSystem from './MovementSubSystem'
import InitLogicSystemBase from './init_logic/InitLogicSystemBase'

export default class MovementSystem extends InitLogicSystemBase {
  private _subSystem: MovementSubSystem[] = []

  constructor(
    entityManager: IEntityManager,
    private readonly _input: IInputManager,
    private readonly _eventSystem: IEventSystem
  ) {
    super(entityManager)
  }

  initLogic(entity: IEntity) {
    const movementComponent = entity.getComponentByTypeStrict(MovementComponent)
    const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)

    const movementSubSystem = new MovementSubSystem(
      this._input,
      this._eventSystem,
      movementComponent.useArrowKeys
    )
    movementSubSystem.subscribeInput(objectComponent)
    this._subSystem.push(movementSubSystem)
  }
}
