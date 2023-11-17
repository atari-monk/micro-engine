import { Renderer } from 'engine'

describe('Renderer', () => {
  let renderer: Renderer

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="myCanvas"></canvas>'
    renderer = new Renderer('myCanvas')
  })

  test('clearCanvas method should clear the canvas', () => {
    const red = '#ff0000'
    const black = '#000000'
    renderer.drawRect(0, 0, 10, 10, red)

    expect(renderer.getContext().fillStyle).toBe(red)

    renderer.clearCanvas()

    expect(renderer.getContext().fillStyle).toBe(black)
  })

  test('drawRect method should draw a rectangle on the canvas', () => {
    const blue = '#0000ff'
    renderer.drawRect(0, 0, 10, 10, blue)

    expect(renderer.getContext().fillStyle).toBe(blue)
  })
})
