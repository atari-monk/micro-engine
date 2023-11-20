import { ConfigManager } from 'engine'
import { IConfigOptions, IConfigurationManager } from 'engine_api'

interface IGameConfig extends IConfigOptions {
  soundEnabled: boolean
  difficulty: string
}

describe('GameManager', () => {
  let gameConfigManager: IConfigurationManager<IGameConfig>

  beforeEach(() => {
    gameConfigManager = new ConfigManager({
      soundEnabled: true,
      difficulty: 'medium',
    })
  })

  test('getConfig returns the current configuration', () => {
    const config = gameConfigManager.getConfig()
    expect(config).toEqual({
      soundEnabled: true,
      difficulty: 'medium',
    })
  })

  test('updateConfig updates the configuration', () => {
    gameConfigManager.updateConfig({ soundEnabled: false, difficulty: 'hard' })
    const updatedConfig = gameConfigManager.getConfig()
    expect(updatedConfig).toEqual({
      soundEnabled: false,
      difficulty: 'hard',
    })
  })
})
