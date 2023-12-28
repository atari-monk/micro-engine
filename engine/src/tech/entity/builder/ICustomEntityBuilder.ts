import EntityBuilder from '../EntityBuilder'

export default interface ICustomEntityBuilder {
  withEntityBuilder(builderKey: string): void
  getEntityBuilder(): EntityBuilder
}
