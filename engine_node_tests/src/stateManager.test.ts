import { StateManager } from 'engine'

export interface IPlayerState {
  playerHealth: number
  gameScore: number
}

export interface ICustomState {
  someValue: string
  anotherValue: number
}

// Create a StateManager instance with IPlayerState for testing
const playerStateManager = new StateManager<IPlayerState>({
  playerHealth: 100,
  gameScore: 0,
})

// Create another StateManager with ICustomState for testing
const customStateManager = new StateManager<ICustomState>({
  someValue: 'Hello',
  anotherValue: 42,
})

describe('StateManager', () => {
  describe('getState', () => {
    it('should return the current state for PlayerState', () => {
      const currentState = playerStateManager.getState()
      expect(currentState).toEqual({
        playerHealth: 100,
        gameScore: 0,
      })
    })

    it('should return the current state for CustomState', () => {
      const currentState = customStateManager.getState()
      expect(currentState).toEqual({
        someValue: 'Hello',
        anotherValue: 42,
      })
    })
  })

  describe('updateState', () => {
    it('should update the state for PlayerState', () => {
      playerStateManager.updateState({ gameScore: 50, playerHealth: 80 })
      const currentState = playerStateManager.getState()
      expect(currentState).toEqual({
        playerHealth: 80,
        gameScore: 50,
      })
    })

    it('should update the state for CustomState', () => {
      customStateManager.updateState({ someValue: 'World', anotherValue: 99 })
      const currentState = customStateManager.getState()
      expect(currentState).toEqual({
        someValue: 'World',
        anotherValue: 99,
      })
    })
  })
})
