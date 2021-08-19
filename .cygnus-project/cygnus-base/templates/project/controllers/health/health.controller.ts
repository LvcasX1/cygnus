import { Get, JsonController } from 'routing-controllers'
import HealthService from '../../services/health/health.service'

@JsonController()
export class HealthController {
  @Get('/health')
  public async get(): Promise<unknown> {
    return HealthService.execute()
  }
}
