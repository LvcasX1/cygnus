import { Middleware } from 'koa'
import logger from '../../interfaces/tools/logger'

const errorsHandler: Middleware = async (ctx, next): Promise<void> => {
  try {
    await next()
  } catch (error) {
    logger.error('Error found')
    logger.error('The error says: ' + error.message)
    logger.error('Full info: ' + error.stack)
    logger.error(JSON.stringify(error))
    ctx.status = error.meta ? error.meta.code : error.status || 500
    ctx.body = { message: 'Ha ocurrido un error interno' }
    ctx.app.emit('error', ctx)
  }
}

export default errorsHandler
