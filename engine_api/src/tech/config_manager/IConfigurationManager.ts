import IConfigOptions from './IConfigOptions'

export default interface IConfigurationManager<T extends IConfigOptions> {
  getConfig(): T
  updateConfig(newConfig: Partial<T>): void
}
