import IObject from '../../browser/component/IObject'

export default interface IObjectDataManager {
  add(name: string, config: IObject): void
  get(name: string): IObject | undefined
  getStrict(name: string): IObject
  getAll(): Record<string, IObject>
  remove(name: string): void
  removeAll(): void
}
