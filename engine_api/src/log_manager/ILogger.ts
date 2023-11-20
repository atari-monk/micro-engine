import { LogLevel } from './LogLevel'

export default interface ILogger {
  setLogLevel(logLevel: LogLevel): void
  log(message: string): void
  warn(message: string): void
  error(message: string): void
}
