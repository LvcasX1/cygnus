import { CorsMiddleware } from '.'
import { createMockContext } from '@shopify/jest-koa-mocks'
import logger from '../../interfaces/tools/logger'

describe('Cors Middeware', (): void => {
  beforeAll((): void => {
    logger.mute()
  })
  afterAll((): void => {
    logger.unmute()
  })

  it('should get the body and parse', async (done): Promise<void> => {
    const mockedContext = createMockContext()
    await new CorsMiddleware().use(mockedContext, jest.fn())

    expect(mockedContext.response.header.vary).toEqual('Origin')
    done()
  })
})
