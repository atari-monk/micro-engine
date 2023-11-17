import { RendererV2, Vector2 } from 'engine'

describe('RendererV2', () => {
  let renderer: RendererV2

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="myCanvas"></canvas>'
    renderer = new RendererV2('myCanvas')
  })

  test('drawRect method should draw a rectangle on the canvas', () => {
    const blue = '#0000ff'
    renderer.drawRect(new Vector2(0, 0), new Vector2(10, 10), blue)

    expect(renderer.getContext().fillStyle).toBe(blue)
  })
})
