import 'reflect-metadata'
import Koa from 'koa'
import config from './interfaces/tools/config/config'
import { controllers } from './controllers'
import { createKoaServer } from 'routing-controllers'
import logger from './interfaces/tools/logger'
import { middlewares } from './middlewares'

export interface Cygnus extends Koa {
  boot: () => void
  init: () => void
}

const app = createKoaServer({
  controllers,
  defaultErrorHandler: false,
  middlewares,
})

app.boot = async (): Promise<void> => {
  logger.logInfo('Environment variables loaded.')
  logger.logInfo('Application booting process ended.')
  app.emit('application:booted')
}

app.init = (): void => {
  const PORT = parseInt(config.PORT, 10) || 3000
  app.listen(PORT)
  logger.logInfo(`Server started on port: ${PORT}`)

  app.emit('application:started')
}

app.on('error', (err: Error): void => {
  logger.logError('App error', err)
})

export default app
