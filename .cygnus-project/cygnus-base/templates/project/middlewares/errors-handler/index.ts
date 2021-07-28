import { AbstractError, metaError } from '../../interfaces/tools/errors'
import { Ctx, KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Context } from 'koa'
import logger from '../../interfaces/tools/logger'
import store from '../../interfaces/tools/store'

const parseError = (error: Error): AbstractError => {
  if (!(error instanceof AbstractError)) {
    return new AbstractError('Ha ocurrido un error interno', metaError(error))
  }

  return error as AbstractError
}

@Middleware({ type: 'before' })
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {
  public async use(@Ctx() ctx: Context, next: (err?: Error) => Promise<Error>): Promise<void> {
    try {
      await next()
    } catch (error) {
      const parsedError = parseError(error)
      const traceID = store.getContext().traceID
      const { message, metaData } = parsedError.toJSON()
      logger.logError(message, metaData)
      ctx.status = parsedError.getStatus()
      ctx.body = {
        message,
        traceID,
      }
    }
  }
}
