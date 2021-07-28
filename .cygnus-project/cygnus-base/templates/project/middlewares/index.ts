import { BodyParserMiddleware } from './body-parser'
import { CorrelationalIdMiddleware } from './correlational-id'
import { CorsMiddleware } from './cors'
import { ErrorHandlerMiddleware } from './errors-handler'
import { NotFoundMiddleware } from './not-found'

export const middlewares = [
  CorrelationalIdMiddleware,
  ErrorHandlerMiddleware,
  CorsMiddleware,
  BodyParserMiddleware,
  NotFoundMiddleware,
]
