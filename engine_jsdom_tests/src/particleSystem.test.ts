import { IVector2 } from 'engine_api'
import { ParticleSystem, Vector2 } from 'engine'

describe('ParticleSystem', () => {
  let particleSystem: ParticleSystem

  beforeEach(() => {
    particleSystem = new ParticleSystem()
  })

  test('creates and updates particles', () => {
    // Create a particle
    const position: IVector2 = new Vector2()
    const velocity: IVector2 = new Vector2(1, 1)
    const size = 5
    const color = 'rgba(255, 0, 0, 1)'
    const life = 3

    particleSystem.createParticle(position, velocity, size, color, life)

    // Update particles
    particleSystem.updateParticles()

    // There should be one particle after update
    expect(particleSystem['particles']).toHaveLength(1)

    // After life cycles, the particle should be removed
    for (let i = 0; i < life; i++) {
      particleSystem.updateParticles()
    }

    // There should be no particles after the end of life
    expect(particleSystem['particles']).toHaveLength(0)
  })

  test('renders particles', () => {
    const canvasMock: any = {
      getContext: jest.fn(() => ({
        clearRect: jest.fn(),
        fill: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
      })),
    }

    // Mock the canvas element
    document.getElementById = jest.fn(() => canvasMock)

    // Create a particle
    const position: IVector2 = new Vector2(50, 50)
    const velocity: IVector2 = new Vector2()
    const size = 10
    const color = 'rgba(0, 0, 255, 1)'
    const life = 3

    particleSystem.createParticle(position, velocity, size, color, life)

    // Render particles with the correct context
    const context = canvasMock.getContext('2d')
    particleSystem.renderParticles(context)

    // Verify that the rendering methods were called
    expect(context.beginPath).toHaveBeenCalled()
    expect(context.arc).toHaveBeenCalledWith(
      position.x,
      position.y,
      size,
      0,
      Math.PI * 2
    )
    expect(context.fill).toHaveBeenCalled()
  })
})
