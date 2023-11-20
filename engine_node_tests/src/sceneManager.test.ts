import { SceneManager } from 'engine'
import { IScene, ISceneManager } from 'engine_api'

class MockScene implements IScene {
  start(): void {
    console.log('Mock Scene Started')
  }
}

describe('SceneManager', () => {
  let sceneManager: ISceneManager
  let logSpy: jest.SpyInstance

  beforeEach(() => {
    sceneManager = new SceneManager()
    logSpy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    // Restore the original console.log after each test
    logSpy.mockRestore()
  })

  test('loads and unloads scenes correctly', () => {
    const mockScene1 = new MockScene()
    const mockScene2 = new MockScene()

    // Load the first scene
    sceneManager.loadScene(mockScene1)
    expect(logSpy).toHaveBeenCalledWith('Mock Scene Started')

    // Unload the current scene
    sceneManager.unloadCurrentScene()
    expect(logSpy).toHaveBeenCalledWith('Unloading current scene')

    // Load the second scene
    sceneManager.loadScene(mockScene2)
    expect(logSpy).toHaveBeenCalledWith('Mock Scene Started')
  })
})
