export default interface ISaveGameManager {
  saveData<T>(key: string, data: T): void
  loadData<T>(key: string): T | null
}
