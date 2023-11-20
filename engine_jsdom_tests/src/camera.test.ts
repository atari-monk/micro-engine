import { Camera } from 'engine'

describe('Camera', () => {
  let camera: Camera

  beforeEach(() => {
    camera = new Camera()
  })

  test('should set position correctly', () => {
    const x = 10
    const y = 20

    camera.setPosition(x, y)

    // Check if the position is set correctly
    expect(camera['position']).toMatchObject({ x, y })
  })

  test('should apply transform correctly', () => {
    const mockContext: any = {
      save: jest.fn(),
      translate: jest.fn(),
      restore: jest.fn(),
    }

    camera.translate(mockContext)

    // Check if the save, translate, and restore functions are called
    expect(mockContext.save).toHaveBeenCalled()
    expect(mockContext.translate).toHaveBeenCalledWith(
      -camera['position'].x,
      -camera['position'].y
    )
    expect(mockContext.restore).toHaveBeenCalled()
  })

  // Add more tests as needed
})
