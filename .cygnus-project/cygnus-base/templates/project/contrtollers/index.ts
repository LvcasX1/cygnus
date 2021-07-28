import { HealthController } from './health/health.controller'
import { OfferController as OfferControllerV1 } from './offer/v1/offer.controller'
import { OfferController as OfferControllerV2 } from './offer/v2/offer.controller'

export const controllers = [HealthController, OfferControllerV1, OfferControllerV2]