import expect from 'expect'

import ceilingToPeriod from '../../src/util/ceilingToPeriod'

describe('Ceiling to period', () => {
  it('can compute a ceiling to 1 hour', () => {
    const oneMinute = 1000 * 60
    // 0 sec, 2 divisions, -> 0 mins
    expect(ceilingToPeriod(0, '1h', 1)).toEqual(0)
    // 1 sec, 2 divisions, -> 30 mins
    expect(ceilingToPeriod(1000, '1h', 2)).toEqual(30 * oneMinute)
    // 1 hr, 2 divisions, -> 30 mins
    expect(ceilingToPeriod(60 * oneMinute, '1h', 2)).toEqual(60 * oneMinute)
    // 30 mins, 4 divisions, -> 30 mins
    expect(ceilingToPeriod(30 * oneMinute, '1h', 4)).toEqual(30 * oneMinute)
    // 26 mins, 4 divisions, -> 30 mins
    expect(ceilingToPeriod(26 * oneMinute, '1h', 4)).toEqual(30 * oneMinute)
    // 15 mins, 4 divisions, -> 15 mins
    expect(ceilingToPeriod(15 * oneMinute, '1h', 4)).toEqual(15 * oneMinute)
  })
})
