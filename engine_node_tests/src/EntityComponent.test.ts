import { Entity, Component } from 'engine'

describe('Entity and Component tests', () => {
  test('Entity can add a component', () => {
    const entity = new Entity()
    const component = new Component('name')

    entity.addComponent(component)

    expect(entity['_list'].get('name')).toBeInstanceOf(Component)
  })

  test('Entity update calls update on all components', () => {
    const entity = new Entity()
    const component1 = new Component('name1')
    const component2 = new Component('name2')

    entity.addComponent(component1)
    entity.addComponent(component2)

    const updateSpy1 = jest.spyOn(component1, 'update')
    const updateSpy2 = jest.spyOn(component2, 'update')

    entity.update(0)

    console.log('updateSpy1 calls:', updateSpy1.mock.calls)
    console.log('updateSpy2 calls:', updateSpy2.mock.calls)

    expect(updateSpy1).toHaveBeenCalledTimes(1)
    expect(updateSpy2).toHaveBeenCalledTimes(1)
  })

  test('Entity render calls render on all components', () => {
    const entity = new Entity()
    const component1 = new Component('name1')
    const component2 = new Component('name2')

    entity.addComponent(component1)
    entity.addComponent(component2)

    const renderSpy1 = jest.spyOn(component1, 'render')
    const renderSpy2 = jest.spyOn(component2, 'render')

    entity.render(0)

    console.log('renderSpy1 calls:', renderSpy1.mock.calls)
    console.log('renderSpy2 calls:', renderSpy2.mock.calls)

    expect(renderSpy1).toHaveBeenCalledTimes(1)
    expect(renderSpy2).toHaveBeenCalledTimes(1)
  })
})
