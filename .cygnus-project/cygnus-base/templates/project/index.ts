import app from './application/server'
import logger from './application/interfaces/tools/logger'

process.on('uncaughtException', (e: Error): void => {
  logger.logError('Uncaugth Exception', e)
})

process.on('unhandledRejection', (reason, p): void => {
  logger.logError('Unhandled Rejection', {
    promise: JSON.parse(JSON.stringify(p)),
    reason,
  })
})

app.on('application:booted', app.init)
app.boot()
