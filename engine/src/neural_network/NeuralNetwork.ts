import {
  INeuralNetwork,
  INeuralNetworkOptions,
  INeuralNetworkPrediction,
  ISimulatedKeyPress,
} from 'engine_api'

export default class NeuralNetwork implements INeuralNetwork {
  private inputNodes: number
  private hiddenNodes: number
  private outputNodes: number

  private weightsInputHidden: number[][]
  private weightsHiddenOutput: number[][]

  constructor(options: INeuralNetworkOptions) {
    const { inputNodes, hiddenNodes, outputNodes } = options
    this.inputNodes = inputNodes
    this.hiddenNodes = hiddenNodes
    this.outputNodes = outputNodes

    // Initialize weights randomly
    this.weightsInputHidden = this.initializeWeights(
      this.inputNodes,
      this.hiddenNodes
    )
    this.weightsHiddenOutput = this.initializeWeights(
      this.hiddenNodes,
      this.outputNodes
    )
  }

  private initializeWeights(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random() - 0.5)
    )
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x))
  }

  public predict(input: number[]): INeuralNetworkPrediction {
    // Calculate hidden layer values
    const hiddenLayer = this.weightsInputHidden.map((row) =>
      row.reduce((sum, weight, i) => sum + weight * input[i], 0)
    )
    const hiddenActivated = hiddenLayer.map((value) => this.sigmoid(value))

    // Calculate output layer values
    const outputLayer = this.weightsHiddenOutput.map((row) =>
      row.reduce((sum, weight, i) => sum + weight * hiddenActivated[i], 0)
    )
    const outputActivated = outputLayer.map((value) => this.sigmoid(value))

    return {
      input,
      output: outputActivated,
    }
  }

  private threshold(output: number[]): number[] {
    return output.map((value) => (value >= 0.5 ? 1 : 0))
  }

  public simulateKeyPress(output: number[]): ISimulatedKeyPress {
    const thresholdedOutput = this.threshold(output)

    return {
      up: thresholdedOutput[0] === 1,
      down: thresholdedOutput[1] === 1,
      left: thresholdedOutput[2] === 1,
      right: thresholdedOutput[3] === 1,
    }
  }
}
