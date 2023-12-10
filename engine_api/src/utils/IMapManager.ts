export default interface IMapManager<T> {
  get count(): number
  add(name: string, object: T): void
  remove(name: string): void
  removeAll(): void
  get(name: string): T | undefined
  getStrict(name: string): T
  getWithStatus(name: string): { found: boolean; object?: T }
}
