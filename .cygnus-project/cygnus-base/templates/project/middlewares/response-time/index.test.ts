import { createMockContext } from '@shopify/jest-koa-mocks'
import logger from '../../interfaces/tools/logger'
import responseTimeMiddleware from './index'

describe('ResponseTime Middeware', (): void => {
  beforeAll((): void => {
    logger.mute()
    jest.useFakeTimers()
  })

  afterAll((): void => {
    logger.unmute()
  })

  it('should set x-response-time header on response after call', async (done): Promise<void> => {
    const mockedContext = createMockContext()

    const longExecution = new Promise<void>((res): void => res())

    await responseTimeMiddleware(mockedContext, (): Promise<void> => longExecution)

    expect(mockedContext.response.header).toHaveProperty('x-response-time')
    done()
  })
})
