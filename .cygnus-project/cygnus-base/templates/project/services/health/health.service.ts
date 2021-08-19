import { Health } from '../../../domain/models/health.model'

export default abstract class HealthService {
  public static execute(): Health {
    return { body: { message: 'The API is healthy' } }
  }
}
