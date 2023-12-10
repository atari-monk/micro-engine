export default interface IComponent {
  update(dt: number): void
  render(dt: number): void
  get name(): string
}
