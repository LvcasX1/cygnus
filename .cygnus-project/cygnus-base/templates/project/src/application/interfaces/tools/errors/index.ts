import { AxiosError } from 'axios'
import statusCodes from '../statusCodes'

export interface ErrorJSON {
  message: string
  metaData: unknown
}

export class AbstractError extends Error {
  private meta: unknown

  public constructor(message: string, meta: unknown) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.meta = meta
  }

  public getStatus(): number {
    return +(this.meta as { code: unknown }).code || statusCodes.INTERNAL_SERVER_ERROR
  }

  public toJSON(): ErrorJSON {
    return {
      message: this.message || 'Ha ocurrido un error interno',
      metaData: this.meta,
    }
  }
}

export class ValidationError extends AbstractError {
  public constructor(resource: string, meta: { errorMessages: string[]; payload: unknown }) {
    super('Validation Error', {
      code: statusCodes.BAD_REQUEST,
      errorMessages: meta.errorMessages,
      payload: meta.payload,
      where: resource,
    })
  }
}

export class UknownError extends AbstractError {}
export class UnauthorizeError extends AbstractError {}

export class NotFoundError extends AbstractError {
  public constructor(resource: string, type = '', meta: unknown = {}) {
    super(`Resource: ${resource} of type: ${type}, Not Found`, meta)
  }
}

export class BadGateway extends AbstractError {
  public constructor(resource: string, meta: { errorMessages: string[]; payload: unknown }) {
    super('External servicce has failed', {
      code: statusCodes.BAD_GATEWAY,
      errorMessages: meta.errorMessages,
      payload: meta.payload,
      where: resource,
    })
  }
}

export function metaError<T = unknown>(e: Error): T {
  const { message, stack } = e
  const defaultMeta = {
    message,
  }
  let meta = {}
  const error = e as AxiosError
  if (error.isAxiosError) {
    meta = {
      status: error.response?.status,
      response: error.response?.data,
    }
  } else {
    meta = {
      stack,
    }
  }
  return ({ ...defaultMeta, ...meta } as unknown) as T
}
