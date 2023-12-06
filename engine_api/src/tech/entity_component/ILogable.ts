import ILogger from '../log_manager/ILogger'

export default interface ILogable {
  set logger(logger: ILogger)
}
