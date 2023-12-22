export default class DataLoader<T> {
  private data!: T[]

  constructor(private filePath: string) {
    this.loadData()
  }

  private async loadData(): Promise<void> {
    try {
      const response = await fetch(this.filePath)
      const rawData = await response.json()
      this.data = rawData
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  async getData(): Promise<T[]> {
    if (!this.data) {
      await this.loadData()
    }
    return this.data || []
  }
}
