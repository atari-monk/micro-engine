import { RendererV2, Vector2 } from 'engine'

describe('RendererV2', () => {
  let renderer: RendererV2

  beforeEach(() => {
    // Assuming 'myCanvas' is the ID of the canvas element in your HTML
    document.body.innerHTML = '<canvas id="myCanvas"></canvas>'
    renderer = new RendererV2('myCanvas')
  })

  test('clearCanvas method should clear the canvas', () => {
    // Set up initial state
    renderer.drawRect(new Vector2(0, 0), new Vector2(10, 10), 'red')

    // Ensure the canvas is not clear before calling clearCanvas
    expect(renderer.getContext().fillStyle).toBe('red')

    // Call the method to be tested
    renderer.clearCanvas()

    // Check if the canvas is cleared after calling clearCanvas
    expect(renderer.getContext().fillStyle).toBe('')
  })

  test('drawRect method should draw a rectangle on the canvas', () => {
    // Call the method to be tested
    renderer.drawRect(new Vector2(0, 0), new Vector2(10, 10), 'blue')

    // Check if the rectangle is drawn with the correct color
    expect(renderer.getContext().fillStyle).toBe('blue')
  })
})
