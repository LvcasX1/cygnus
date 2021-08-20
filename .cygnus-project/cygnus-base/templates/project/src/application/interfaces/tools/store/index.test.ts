import * as store from './index'

type MiddlewareResult = Promise<unknown>
type Next = () => MiddlewareResult

describe('Store tests', (): void => {
  it('should get store data id', (): void => {
    let next: Next
    const promise = new Promise(Object)
    expect(store.default.withId('testId', next)).toStrictEqual(promise)
  })
})
