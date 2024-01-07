import { IEventSystem, IFactory, IInputManager } from 'engine_api'
import IMovementSubSystem from './IMovementSubSystem'
import StepMovementSubSystem from './StepMovementSubSystem'

export default class StepMovementSubSystemFactory
  implements IFactory<IMovementSubSystem>
{
  constructor(
    private readonly _input: IInputManager,
    private readonly _eventSystem: IEventSystem
  ) {}

  create(): IMovementSubSystem {
    return new StepMovementSubSystem(this._input, this._eventSystem)
  }
}
