import { TransformableInfo } from 'logform'
import winston, { format, Logger } from 'winston'
import config from '../config/config'
import correlator from '../store'

interface WinstonLogger extends Logger {
  mute: () => void
  unmute: () => void
}

const logLevel = config.LOG_LEVEL || "silly"

export const formatLog = (info: TransformableInfo): string =>
  `${info.timestamp} ${correlator.getId() || 'NO ID'} ${info.level}: ${info.message}`

// Log levels precedence [error, warn, info, verbose, debug, silly]
const logger: Logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: format.combine(format.timestamp(), format.align(), format.colorize(), format.printf(formatLog)),
      level: logLevel,
      handleExceptions: true,
    }),
  ],
})

const appLogger = logger as WinstonLogger
appLogger.mute = (): void => {
  appLogger.level = 'none'
}
appLogger.unmute = (): void => {
  appLogger.level = logLevel
}

export default appLogger
