import { ResourceManager } from 'engine'
import { IResourceManager } from 'engine_api'

describe('ResourceManager', () => {
  let resourceManager: IResourceManager

  beforeEach(() => {
    resourceManager = new ResourceManager()
  })

  it('should load and unload resources', async () => {
    const texture = new Image()
    texture.src = 'path/to/texture.png'

    // Load resource
    await resourceManager.loadResource('playerTexture', texture)
    expect(resourceManager.getResource('playerTexture')).toEqual(texture)

    // Unload resource
    resourceManager.unloadResource('playerTexture')
    expect(resourceManager.getResource('playerTexture')).toBeUndefined()
  })
})
