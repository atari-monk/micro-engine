import IObjectConfig from '../component/IObjectConfig'

export default interface IObjectDataManager {
  addObjectData(name: string, config: IObjectConfig): void
  getObjectData(name: string): IObjectConfig
  getAllObjectData(): Record<string, IObjectConfig>
  removeObjectData(name: string): void
}
