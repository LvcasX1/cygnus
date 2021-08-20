import { Middleware } from 'koa'
import logger from '../../interfaces/tools/logger'

const loggerMiddleware: Middleware = async (ctx, next): Promise<void> => {
  await next()
  const responseTime = ctx.response.get('X-Response-Time')
  logger.logInfo(`${ctx.method} ${ctx.url} - ${responseTime}`)
}

export default loggerMiddleware
