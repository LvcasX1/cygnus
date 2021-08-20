import { BodyParserMiddleware } from './index'
import { createMockContext } from '@shopify/jest-koa-mocks'
import logger from '../../interfaces/tools/logger'

describe('Body parser Middeware', (): void => {
  beforeAll((): void => {
    logger.mute()
  })

  afterAll((): void => {
    logger.unmute()
  })

  it('should get the body and parse', async (done): Promise<void> => {
    const mockedContext = createMockContext()

    await new BodyParserMiddleware().use(mockedContext, jest.fn())

    expect(mockedContext.request.body).toEqual({})
    done()
  })
})
