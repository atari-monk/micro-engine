export default interface IComponent {
  update(deltaTime: number): void
  render(deltaTime: number): void
  get name(): string
}
