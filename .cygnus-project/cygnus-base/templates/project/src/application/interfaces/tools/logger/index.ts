import winston, { Logger } from 'winston'
import { TransformableInfo } from 'logform'
import config from '../config/config'
import store from '../store'

interface WinstonLogger extends Logger {
  mute: () => void
  unmute: () => void
  logInfo(message: string, details?: unknown, traceID?: string): void
  logError(message: string, details?: unknown, traceID?: string): void
}

const logField = 'LOG_LEVEL'

export const formatLog = (info: TransformableInfo): string =>
  `${info.timestamp} ${store.getId() || 'NO ID'} ${info.level}: ${info.message}`

// Log levels precedence [error, warn, info, verbose, debug, silly]
const logger: Logger = winston.createLogger({
  format: winston.format.combine(winston.format.json()),
  defaultMeta: {
    commerce: 'Seguros',
    date: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    product: 'Offer Crossing',
    country: 'CL',
  },
  level: config[logField].toString(),
  exitOnError: false,
  transports: [new winston.transports.Console()],
})

const appLogger = logger as WinstonLogger

appLogger.mute = function (): void {
  this.level = 'none'
}

appLogger.unmute = function (): void {
  this.level = config[logField].toString()
}

appLogger.logError = (message: string, details?: unknown): void => {
  const { traceID } = store.getContext()
  appLogger.error({
    message,
    traceID,
  })

  if (details) {
    const msg = `Details: ${JSON.stringify(details)}`
    appLogger.error({
      message: msg,
      traceID,
    })
  }
}

appLogger.logInfo = (message: string, details?: unknown): void => {
  const { traceID } = store.getContext()
  appLogger.info({
    message,
    traceID,
  })

  if (details) {
    const msg = `Details: ${JSON.stringify(details)}`
    appLogger.info({
      message: msg,
      traceID,
    })
  }
}

export default appLogger
