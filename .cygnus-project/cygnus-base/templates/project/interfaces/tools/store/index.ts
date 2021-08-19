import cls from 'cls-hooked'

const store = cls.createNamespace('2588feab-6d80-406a-835d-0e07c15615db')

type MiddlewareResult = Promise<unknown>
type Next = () => MiddlewareResult

export interface AppContext {
  traceID: string
}

const withId = async (id: string, next: Next): MiddlewareResult => {
  return await store.runAndReturn(
    async (): MiddlewareResult => {
      store.set('correlator', id)
      return await next()
    },
  )
}

const withContext = async (ctx: AppContext, next: Next): MiddlewareResult => {
  return await store.runAndReturn(
    async (): MiddlewareResult => {
      store.set('context', ctx)
      return await next()
    },
  )
}

const getId = (): string => store.get('correlator')

const getContext = (): AppContext =>
  store.get('context') || {
    traceID: 'NO_ID',
  }

export default {
  withId,
  getId,
  withContext,
  getContext,
}
