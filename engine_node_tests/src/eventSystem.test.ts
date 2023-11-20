import { EventSystem } from 'engine'
import { IEventSystem } from 'engine_api'

describe('EventSystem', () => {
  let eventSystem: IEventSystem

  beforeEach(() => {
    eventSystem = new EventSystem()
  })

  it('should subscribe to and publish events', () => {
    // Arrange
    const eventName = 'TestEvent'
    const eventData = { message: 'Hello, World!' }
    let handlerCalled = false

    // Act
    eventSystem.subscribe(eventName, (data) => {
      handlerCalled = true
      expect(data).toEqual(eventData)
    })

    eventSystem.publish(eventName, eventData)

    // Assert
    expect(handlerCalled).toBe(true)
  })

  it('should handle multiple handlers for the same event', () => {
    // Arrange
    const eventName = 'MultiHandlerEvent'
    const eventData = { value: 42 }
    let handler1Called = false
    let handler2Called = false

    // Act
    eventSystem.subscribe(eventName, (data) => {
      handler1Called = true
      expect(data).toEqual(eventData)
    })

    eventSystem.subscribe(eventName, (data) => {
      handler2Called = true
      expect(data).toEqual(eventData)
    })

    eventSystem.publish(eventName, eventData)

    // Assert
    expect(handler1Called).toBe(true)
    expect(handler2Called).toBe(true)
  })

  it('should handle events without subscribers', () => {
    // Arrange
    const eventName = 'NoSubscriberEvent'
    const eventData = { value: 123 }

    // Act & Assert (no error should be thrown)
    expect(() => eventSystem.publish(eventName, eventData)).not.toThrow()
  })
})
