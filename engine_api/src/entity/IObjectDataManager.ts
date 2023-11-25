import IObject from '../component/IObject'

export default interface IObjectDataManager {
  addObjectData(name: string, config: IObject): void
  getObjectData(name: string): IObject
  getAllObjectData(): Record<string, IObject>
  removeObjectData(name: string): void
  removeAllObjectData(): void
}
