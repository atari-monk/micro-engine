import { ISoundManager } from 'engine_api'

export default class SoundManager implements ISoundManager {
  private audioContext: AudioContext

  constructor() {
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)()
  }

  async loadSound(url: string): Promise<AudioBuffer> {
    const response = await fetch(url)
      const data = await response.arrayBuffer()
      return await this.audioContext.decodeAudioData(data)
  }

  playSound(buffer: AudioBuffer, loop: boolean = false): AudioBufferSourceNode {
    const source = this.audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(this.audioContext.destination)
    source.loop = loop
    source.start(0)

    return source
  }

  stopSound(source: AudioBufferSourceNode): void {
    source.stop(0)
  }
}
