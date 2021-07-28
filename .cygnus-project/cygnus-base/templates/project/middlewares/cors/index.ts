import { Ctx, KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Context } from 'koa'
import cors from '@koa/cors'

@Middleware({ type: 'before' })
export class CorsMiddleware implements KoaMiddlewareInterface {
  public async use(@Ctx() ctx: Context, next: (err?: Error) => Promise<Error>): Promise<void> {
    const middleware = cors()
    return await middleware(ctx, next)
  }
}
