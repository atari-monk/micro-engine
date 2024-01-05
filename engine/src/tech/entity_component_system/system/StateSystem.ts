import { IEntity, IEntityManager, IEventSystem, IState } from 'engine_api'
import StateComponent from '../../component/StateComponent'
import IdleState from '../../state_machine/IdleState'
import InitLogicSystemBase from './init_logic/InitLogicSystemBase'
import ObjectComponent from '../../component/ObjectComponent'
import { EventNames } from '../../event_system/EventNames'

export default class StateSystem extends InitLogicSystemBase {
  constructor(
    entityManager: IEntityManager,
    private readonly eventSystem: IEventSystem
  ) {
    super(entityManager)
    this.eventSystem.subscribe(
      EventNames.ChangeState,
      this.handleChangeState.bind(this)
    )
  }

  handleChangeState(data: any) {
    this.changeState(data.id, data.newState, data.force ?? false)
  }

  initLogic(entity: IEntity): void {
    const stateComponet = entity.getComponentByTypeStrict(StateComponent)
    stateComponet.state = new IdleState(this.eventSystem)
    stateComponet.state.enter(entity)
  }

  changeState(id: string, newState: IState, force: boolean = false): boolean {
    const entity = this._entityList.find((entity) => {
      const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)
      return objectComponent && objectComponent.id === id
    })
    if (!entity) return false
    const stateComponet = entity.getComponentByTypeStrict(StateComponent)
    if (force || !(stateComponet.state instanceof newState.constructor)) {
      stateComponet.state.exit(entity)
      stateComponet.state = newState
      stateComponet.state.enter(entity)
      return true
    } else {
      return false
    }
  }
}
