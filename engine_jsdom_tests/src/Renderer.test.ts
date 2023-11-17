import { Renderer } from 'engine'

describe('Renderer', () => {
  let renderer: Renderer

  beforeEach(() => {
    // Assuming 'myCanvas' is the ID of the canvas element in your HTML
    document.body.innerHTML = '<canvas id="myCanvas"></canvas>'
    renderer = new Renderer('myCanvas')
  })

  test('clearCanvas method should clear the canvas', () => {
    // Set up initial state
    renderer.drawRect(0, 0, 10, 10, 'red')

    // Ensure the canvas is not clear before calling clearCanvas
    expect(renderer.getContext().fillStyle).toBe('red')

    // Call the method to be tested
    renderer.clearCanvas()

    // Check if the canvas is cleared after calling clearCanvas
    expect(renderer.getContext().fillStyle).toBe('')
  })

  test('drawRect method should draw a rectangle on the canvas', () => {
    // Call the method to be tested
    renderer.drawRect(0, 0, 10, 10, 'blue')

    // Check if the rectangle is drawn with the correct color
    expect(renderer.getContext().fillStyle).toBe('blue')
  })
})
