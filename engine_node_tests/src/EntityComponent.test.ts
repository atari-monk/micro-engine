import { Entity, Component, LogManager } from 'engine'

describe('Entity and Component tests', () => {
  test('Entity can add a component', () => {
    const entity = new Entity(new LogManager())
    const component = new Component()

    entity.addComponent(component)

    expect(entity['_list']).toContain(component)
  })

  test('Entity update calls update on all components', () => {
    const entity = new Entity(new LogManager())
    const component1 = new Component()
    const component2 = new Component()

    entity.addComponent(component1)
    entity.addComponent(component2)

    const updateSpy1 = jest.spyOn(component1, 'update')
    const updateSpy2 = jest.spyOn(component2, 'update')

    entity.update(0)

    expect(updateSpy1).toHaveBeenCalled()
    expect(updateSpy2).toHaveBeenCalled()
  })

  test('Entity render calls render on all components', () => {
    const entity = new Entity(new LogManager())
    const component1 = new Component()
    const component2 = new Component()

    entity.addComponent(component1)
    entity.addComponent(component2)

    const renderSpy1 = jest.spyOn(component1, 'render')
    const renderSpy2 = jest.spyOn(component2, 'render')

    entity.render(0)

    expect(renderSpy1).toHaveBeenCalled()
    expect(renderSpy2).toHaveBeenCalled()
  })
})
