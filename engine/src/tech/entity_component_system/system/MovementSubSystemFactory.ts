import { IEventSystem, IFactory, IInputManager } from 'engine_api'
import IMovementSubSystem from './IMovementSubSystem'
import MovementSubSystem from './MovementSubSystem'

export default class MovementSubSystemFactory
  implements IFactory<IMovementSubSystem>
{
  constructor(
    private readonly _input: IInputManager,
    private readonly _eventSystem: IEventSystem
  ) {}

  create(): IMovementSubSystem {
    return new MovementSubSystem(this._input, this._eventSystem)
  }
}
