import { NotFoundMiddleware } from './index'
import { createMockContext } from '@shopify/jest-koa-mocks'
import logger from '../../interfaces/tools/logger'

describe('NotFoundHandler Middeware', () => {
  beforeAll((): void => {
    logger.mute()
  })

  afterAll((): void => {
    logger.unmute()
  })

  it('should return 404 error', async (done): Promise<void> => {
    const mockedContext = createMockContext({
      url: '/unexisting-url',
      method: 'GET',
    })

    await new NotFoundMiddleware().use(mockedContext, jest.fn())
    expect(mockedContext.status).toEqual(404)
    expect(mockedContext.body).toHaveProperty('error')
    expect(mockedContext.body.error.message).toBe('Resource: http://test.com/unexisting-url of type: route, Not Found')
    done()
  })

  it('should not return error', async (done): Promise<void> => {
    const mockedContext = createMockContext({
      host: 'www.google.com',
      method: 'GET',
      customProperties: {
        response: {
          status: 200,
        },
      },
    })
    await new NotFoundMiddleware().use(mockedContext, jest.fn())
    done()
  })
})
