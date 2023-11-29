export default interface ISoundManager {
  loadSound(url: string): Promise<AudioBuffer>
  playSound(buffer: AudioBuffer, loop?: boolean): AudioBufferSourceNode
  stopSound(source: AudioBufferSourceNode): void
}
