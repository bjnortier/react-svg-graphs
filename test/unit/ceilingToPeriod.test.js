import expect from 'expect'

import ceilingToPeriod from '../../src/util/ceilingToPeriod'

describe('Ceiling to period', () => {
  it('can compute a ceiling to 1 hour', () => {
    expect(ceilingToPeriod(0, '1h')).toEqual(0)
    expect(ceilingToPeriod(1, '1h')).toEqual(3600 * 1000) // 1 msec
    expect(ceilingToPeriod(1000 * 60 * 60, '1h')).toEqual(3600 * 1000) // 1 hour
    expect(ceilingToPeriod(1000 * 60 * 30, '1h')).toEqual(3600 * 1000) // 30 minutes
  })
})
