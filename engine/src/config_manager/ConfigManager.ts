import { IConfigOptions, IConfigurationManager } from 'engine_api'

export default class ConfigManager<T extends IConfigOptions>
  implements IConfigurationManager<T>
{
  private config: T

  constructor(initialConfig: T) {
    this.config = { ...initialConfig }
  }

  getConfig(): T {
    return { ...this.config }
  }

  updateConfig(newConfig: Partial<T>): void {
    this.config = { ...this.config, ...newConfig }
  }
}
