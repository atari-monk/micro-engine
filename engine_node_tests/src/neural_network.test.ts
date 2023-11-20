import { NeuralNetwork } from 'engine'

describe('NeuralNetwork', () => {
  const neuralNetwork = new NeuralNetwork({
    inputNodes: 4,
    hiddenNodes: 4,
    outputNodes: 4,
  })

  test('predict should return NeuralNetworkPrediction', () => {
    const arrowKeys = [1, 0, 0, 1]
    const prediction = neuralNetwork.predict(arrowKeys)

    expect(prediction).toHaveProperty('input')
    expect(prediction).toHaveProperty('output')
    expect(prediction.input).toEqual(arrowKeys)
    expect(prediction.output).toHaveLength(4)
  })

  test('simulateKeyPress should return SimulatedKeyPress', () => {
    const output = [0.8, 0.2, 0.6, 0.9]
    const simulatedKeyPress = neuralNetwork.simulateKeyPress(output)

    expect(simulatedKeyPress).toHaveProperty('up')
    expect(simulatedKeyPress).toHaveProperty('down')
    expect(simulatedKeyPress).toHaveProperty('left')
    expect(simulatedKeyPress).toHaveProperty('right')
    expect(simulatedKeyPress.up).toEqual(output[0] >= 0.5)
    expect(simulatedKeyPress.down).toEqual(output[1] >= 0.5)
    expect(simulatedKeyPress.left).toEqual(output[2] >= 0.5)
    expect(simulatedKeyPress.right).toEqual(output[3] >= 0.5)
  })

  test('threshold should return binary values', () => {
    const thresholdedOutput = neuralNetwork.threshold([0.3, 0.6, 0.8, 0.2])
    expect(thresholdedOutput).toEqual([0, 1, 1, 0])
  })
})
