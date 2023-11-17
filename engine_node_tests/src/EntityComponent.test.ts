import { Entity, Component } from 'engine'

describe('Entity and Component tests', () => {
  test('Entity can add a component', () => {
    const entity = new Entity()
    const component = new Component()

    entity.addComponent(component)

    expect(entity['components']).toContain(component)
  })

  test('Entity update calls update on all components', () => {
    const entity = new Entity()
    const component1 = new Component()
    const component2 = new Component()

    entity.addComponent(component1)
    entity.addComponent(component2)

    const updateSpy1 = jest.spyOn(component1, 'update')
    const updateSpy2 = jest.spyOn(component2, 'update')

    entity.update()

    expect(updateSpy1).toHaveBeenCalled()
    expect(updateSpy2).toHaveBeenCalled()
  })

  test('Entity render calls render on all components', () => {
    const entity = new Entity()
    const component1 = new Component()
    const component2 = new Component()

    entity.addComponent(component1)
    entity.addComponent(component2)

    const renderSpy1 = jest.spyOn(component1, 'render')
    const renderSpy2 = jest.spyOn(component2, 'render')

    entity.render()

    expect(renderSpy1).toHaveBeenCalled()
    expect(renderSpy2).toHaveBeenCalled()
  })
})
