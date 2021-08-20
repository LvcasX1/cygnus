import HealthUseCase from './health.service'

describe('Health use case', (): void => {
  it('should works', async (): Promise<void> => {
    const response = HealthUseCase.execute()
    expect(response.body).toStrictEqual({ message: 'The API is healthy' })
  })
})
