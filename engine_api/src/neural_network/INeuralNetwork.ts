import INeuralNetworkPrediction from './INeuralNetworkPrediction'
import ISimulatedKeyPress from './ISimulatedKeyPress'

export default interface INeuralNetwork {
  predict(input: number[]): INeuralNetworkPrediction
  simulateKeyPress(output: number[]): ISimulatedKeyPress
}
