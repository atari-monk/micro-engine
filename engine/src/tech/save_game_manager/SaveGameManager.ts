import { ISaveGameManager } from 'engine_api'

export default class SaveGameManager implements ISaveGameManager {
  saveData<T>(key: string, data: T): void {
    try {
      const serializedData = JSON.stringify(data)
      localStorage.setItem(key, serializedData)
    } catch (error: any) {
      console.error(`Error saving data for key ${key}: ${error.message}`)
    }
  }

  loadData<T>(key: string): T | null {
    try {
      const serializedData = localStorage.getItem(key)
      return serializedData ? JSON.parse(serializedData) : null
    } catch (error: any) {
      console.error(`Error loading data for key ${key}: ${error.message}`)
      return null
    }
  }
}
