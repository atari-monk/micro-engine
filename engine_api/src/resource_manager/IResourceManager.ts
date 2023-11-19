export default interface IResourceManager {
  loadResource(key: string, resource: any): Promise<void>
  unloadResource(key: string): void
  getResource(key: string): any | undefined
}
