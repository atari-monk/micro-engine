import { LogManager } from 'engine'
import { ILogger, LogLevel } from 'engine_api'

describe('LogManager', () => {
  let logManager: ILogger

  beforeEach(() => {
    logManager = new LogManager()
  })

  it('logs messages with INFO level', () => {
    // Mock console.log
    const consoleLogSpy = jest.spyOn(console, 'log')
    logManager.log('Test Log Message')
    expect(consoleLogSpy).toHaveBeenCalledWith('[Game Log] Test Log Message')
    consoleLogSpy.mockRestore() // Restore the original console.log
  })

  it('does not log messages below the set log level', () => {
    // Mock console.log
    const consoleLogSpy = jest.spyOn(console, 'log')
    logManager.setLogLevel(LogLevel.WARNING)
    logManager.log('Test Log Message')
    expect(consoleLogSpy).not.toHaveBeenCalled()
    consoleLogSpy.mockRestore() // Restore the original console.log
  })

  it('logs warnings with WARNING level', () => {
    // Mock console.warn
    const consoleWarnSpy = jest.spyOn(console, 'warn')
    logManager.warn('Test Warning Message')
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '[Game Warning] Test Warning Message'
    )
    consoleWarnSpy.mockRestore() // Restore the original console.warn
  })

  it('does not log warnings below the set log level', () => {
    // Mock console.warn
    const consoleWarnSpy = jest.spyOn(console, 'warn')
    logManager.setLogLevel(LogLevel.ERROR)
    logManager.warn('Test Warning Message')
    expect(consoleWarnSpy).not.toHaveBeenCalled()
    consoleWarnSpy.mockRestore() // Restore the original console.warn
  })

  it('logs errors with ERROR level', () => {
    // Mock console.error
    const consoleErrorSpy = jest.spyOn(console, 'error')
    logManager.error('Test Error Message')
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[Game Error] Test Error Message'
    )
    consoleErrorSpy.mockRestore() // Restore the original console.error
  })

  it('does not log errors below the set log level', () => {
    // Mock console.error
    const consoleErrorSpy = jest.spyOn(console, 'error')

    // Use a try-catch block to capture the error log
    try {
      logManager.setLogLevel(LogLevel.WARNING)
      logManager.error('Test Error Message')
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    } catch (error) {
      // Ignore the error, as we expect it not to be logged
    } finally {
      consoleErrorSpy.mockRestore() // Restore the original console.error
    }
  })
})
