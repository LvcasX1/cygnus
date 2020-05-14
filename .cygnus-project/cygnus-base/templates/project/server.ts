import Koa from 'koa'
import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import logger from './interfaces/tools/logger'
import config from '../application/interfaces/tools/config/config'

export interface AdapterPOC extends Koa {
  boot: () => void
  init: () => void
}

const app = createKoaServer({
  controllers: [],
  defaultErrorHandler: false,
})

app.boot = async (): Promise<void> => {
  logger.info('Environment variables loaded.')
  const { default: middlewaresHandler } = await import('./middlewares')
  await middlewaresHandler.register(app)
  logger.info('Application booting process ended.')
  app.emit('application:booted')
}

app.init = ():void => {
  const PORT = config.PORT // TODO: cambiar puerto
  app.listen(PORT)

  logger.info(`Server started on port: ${PORT}`)
  app.emit('application:started')
}

app.on('error', (err: Error): void => {
  logger.error(err.toString())
  logger.debug(err.stack || '')
})

export default app
