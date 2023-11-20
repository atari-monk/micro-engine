// inputManager.test.ts
import { InputManager } from 'engine'

describe('InputManager', () => {
  let inputManager: InputManager

  beforeEach(() => {
    inputManager = new InputManager()
  })

  it('should subscribe and trigger key events', () => {
    const keyDownCallback = jest.fn()
    const keyUpCallback = jest.fn()

    inputManager.subscribeInputEvent('KeyDown', keyDownCallback)
    inputManager.subscribeInputEvent('KeyUp', keyUpCallback)

    inputManager.handleKeyDown('Space')
    inputManager.handleKeyUp('Space')

    expect(keyDownCallback).toHaveBeenCalledWith('Space')
    expect(keyUpCallback).toHaveBeenCalledWith('Space')
  })

  it('should track key state', () => {
    expect(inputManager.isKeyDown('Space')).toBeFalsy()

    inputManager.handleKeyDown('Space')
    expect(inputManager.isKeyDown('Space')).toBeTruthy()

    inputManager.handleKeyUp('Space')
    expect(inputManager.isKeyDown('Space')).toBeFalsy()
  })
})
