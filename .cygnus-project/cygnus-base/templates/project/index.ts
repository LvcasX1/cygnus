import logger from './application/interfaces/tools/logger'
import app from './application/server'

process.on('uncaughtException', (e: Error): void => {
  logger.error('Uncaught Exception: ', e)
})

process.on('unhandledRejection', (reason, p): void => {
  logger.error('Unhandled Rejection.')
  logger.debug('Promise', p)
  logger.debug('Reason: ', reason)
})

app.on('application:booted', app.init)
app.boot()
