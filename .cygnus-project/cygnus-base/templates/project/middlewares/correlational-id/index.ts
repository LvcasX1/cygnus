import { Ctx, KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Context } from 'koa'
import store from '../../interfaces/tools/store'
import uuid from 'uuid'

@Middleware({ type: 'before' })
export class CorrelationalIdMiddleware implements KoaMiddlewareInterface {
  public async use(@Ctx() ctx: Context, next: (err?: Error) => Promise<Error>): Promise<void> {
    const correlationalIdHeaderName = 'x-trace-id'

    const correlationalId = ctx.get(correlationalIdHeaderName) || uuid.v4()
    ctx.set(correlationalIdHeaderName, correlationalId)

    const channel = ctx.request.header.channel || 'EMPTY'
    const flow = ctx.request.header.flow || 'EMPTY'

    await store.withContext(
      {
        traceID: correlationalId,
        flow,
        channel,
      },
      next,
    )
  }
}
