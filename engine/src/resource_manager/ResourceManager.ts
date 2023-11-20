import { IResourceManager } from 'engine_api'

export default class ResourceManager implements IResourceManager {
  private loadedResources: { [key: string]: any } = {}

  async loadResource(key: string, resource: any): Promise<void> {
    return new Promise((resolve) => {
      this.loadedResources[key] = resource
      resolve()
    })
  }

  unloadResource(key: string): void {
    if (this.loadedResources[key]) {
      delete this.loadedResources[key]
    }
  }

  getResource(key: string): any | undefined {
    return this.loadedResources[key]
  }
}
