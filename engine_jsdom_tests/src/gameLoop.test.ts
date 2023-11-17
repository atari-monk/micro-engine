import { GameLoop } from 'engine'

describe('GameLoop', () => {
  let gameLoop: GameLoop
  let mockUpdateCallback: jest.Mock
  let mockRenderCallback: jest.Mock

  beforeEach(() => {
    gameLoop = new GameLoop()
    mockUpdateCallback = jest.fn()
    mockRenderCallback = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('subscribeToUpdate adds update callback', () => {
    gameLoop.subscribeToUpdate(mockUpdateCallback)
    expect(gameLoop['updateCallbacks']).toContain(mockUpdateCallback)
  })

  test('unsubscribeFromUpdate removes update callback', () => {
    gameLoop.subscribeToUpdate(mockUpdateCallback)
    gameLoop.unsubscribeFromUpdate(mockUpdateCallback)
    expect(gameLoop['updateCallbacks']).not.toContain(mockUpdateCallback)
  })

  test('subscribeToRender adds render callback', () => {
    gameLoop.subscribeToRender(mockRenderCallback)
    expect(gameLoop['renderCallbacks']).toContain(mockRenderCallback)
  })

  test('unsubscribeFromRender removes render callback', () => {
    gameLoop.subscribeToRender(mockRenderCallback)
    gameLoop.unsubscribeFromRender(mockRenderCallback)
    expect(gameLoop['renderCallbacks']).not.toContain(mockRenderCallback)
  })

  test('startLoop calls requestAnimationFrame', () => {
    window.requestAnimationFrame = jest.fn()

    gameLoop.startLoop()

    expect(window.requestAnimationFrame).toHaveBeenCalled()
  })

  test('stopLoop cancels requestAnimationFrame', () => {
    window.cancelAnimationFrame = jest.fn()

    gameLoop.startLoop()
    gameLoop.stopLoop()

    expect(window.cancelAnimationFrame).toHaveBeenCalled()
  })

  test('pauseLoop stops loop execution', () => {
    const mockLoop = jest.spyOn(gameLoop, 'loop')

    gameLoop.startLoop()
    gameLoop.pauseLoop()

    expect(mockLoop).toHaveBeenCalledTimes(1)
  })

  test('resumeLoop continues loop execution', () => {
    const mockLoop = jest.spyOn(gameLoop, 'loop')

    gameLoop.startLoop()
    gameLoop.pauseLoop()
    gameLoop.resumeLoop()

    expect(mockLoop).toHaveBeenCalledTimes(2)
  })
})
