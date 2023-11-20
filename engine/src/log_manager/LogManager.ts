import { ILogger, LogLevel } from 'engine_api'

export default class LogManager implements ILogger {
  private logLevel: LogLevel

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logLevel = logLevel
  }

  setLogLevel(logLevel: LogLevel): void {
    this.logLevel = logLevel
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel
  }

  log(message: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(`[Game Log] ${message}`)
    }
  }

  warn(message: string): void {
    if (this.shouldLog(LogLevel.WARNING)) {
      console.warn(`[Game Warning] ${message}`)
    }
  }

  error(message: string): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(`[Game Error] ${message}`)
    }
  }
}
