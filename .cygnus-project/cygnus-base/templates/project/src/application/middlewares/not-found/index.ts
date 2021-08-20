import { Ctx, KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Context } from 'koa'
import { NotFoundError } from '../../interfaces/tools/errors'

@Middleware({ type: 'before' })
export class NotFoundMiddleware implements KoaMiddlewareInterface {
  public async use(@Ctx() ctx: Context, next: (err?: Error) => Promise<Error>): Promise<void> {
    await next()
    if (ctx.response.status === 404) {
      ctx.status = 404
      ctx.body = {
        error: new NotFoundError(ctx.request.url, 'route', {
          url: ctx.request.url,
          method: ctx.request.method,
        }).toJSON(),
      }
    }
  }
}
