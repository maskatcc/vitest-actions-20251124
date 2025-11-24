import { hello } from './main.js'

describe('vitest', () => {
  it('hello', () => {
    expect(hello()).toBe('Hello, vitest in actions.')
  })
})
