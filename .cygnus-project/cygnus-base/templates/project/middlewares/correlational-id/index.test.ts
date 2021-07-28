import { CorrelationalIdMiddleware } from '.'
import { createMockContext } from '@shopify/jest-koa-mocks'
import logger from '../../interfaces/tools/logger'

describe('Correlational Id Middeware', (): void => {
  beforeAll((): void => {
    logger.mute()
  })

  afterAll((): void => {
    logger.unmute()
  })

  it('should set x-trace-id header on response after call', async (done): Promise<void> => {
    const mockedContext = createMockContext()

    await new CorrelationalIdMiddleware().use(mockedContext, jest.fn())

    expect(mockedContext.response.header).toHaveProperty('x-trace-id')
    done()
  })
})
