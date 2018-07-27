import expect from 'expect'

import { padLimits } from '../../src/getLayout'

describe('Pad limits', () => {
  it('values', () => {
    expect(padLimits([0, 0])).toEqual([-0.5, 0.5])
    expect(padLimits([])).toEqual([-0.5, 0.5])
    expect(padLimits([1, 2])).toEqual([1, 2])
    expect(padLimits([3, 3])).toEqual([2.5, 3.5])
    expect(padLimits([22, 100])).toEqual([22, 100])
  })
})
