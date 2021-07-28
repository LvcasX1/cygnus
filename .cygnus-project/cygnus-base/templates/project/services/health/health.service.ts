import { Health } from '../../../domain/model/health.model'

export default abstract class HealthService {
  public static execute(): Health {
    return { body: { message: 'The API is healthy' } }
  }
}
