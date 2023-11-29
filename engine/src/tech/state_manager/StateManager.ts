import { IGenericState, IStateManager } from 'engine_api'

export default class StateManager<T extends IGenericState>
  implements IStateManager<T>
{
  private currentState: T

  constructor(initialState: T) {
    this.currentState = { ...initialState }
  }

  getState(): T {
    return { ...this.currentState }
  }

  updateState(newState: Partial<T>): void {
    this.currentState = { ...this.currentState, ...newState }
  }
}
