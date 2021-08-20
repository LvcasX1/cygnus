import { Ctx, KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Context } from 'koa'
import koaBodyparser from 'koa-bodyparser'

@Middleware({ type: 'before' })
export class BodyParserMiddleware implements KoaMiddlewareInterface {
  public async use(@Ctx() ctx: Context, next: (err?: Error) => Promise<Error>): Promise<void> {
    const middleware = koaBodyparser({
      jsonLimit: '2mb',
    })
    return await middleware(ctx, next)
  }
}
