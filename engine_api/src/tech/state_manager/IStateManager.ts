import IGenericState from "./IGenericState"

export default interface IStateManager<T extends IGenericState> {
  getState(): T
  updateState(newState: Partial<T>): void
}
