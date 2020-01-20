import expect from 'expect'

import computeTimeLayout, { endOfHour, endOfDay, endOfMonth } from '../../src/util/computeTimeLayout'

describe('Compute Time Layout 2', () => {
  it('can compute end of hour', () => {
    expect(endOfHour(new Date('2020-01-20T00:30:00.000Z'))
      .toISOString()).toEqual('2020-01-20T01:00:00.000Z')
    expect(endOfHour(new Date('2020-01-20T00:00:30.000Z'))
      .toISOString()).toEqual('2020-01-20T01:00:00.000Z')
    expect(endOfHour(new Date('2020-01-20T00:00:00.500Z'))
      .toISOString()).toEqual('2020-01-20T01:00:00.000Z')
    expect(endOfHour(new Date('2020-01-20T00:59:59.999Z'))
      .toISOString()).toEqual('2020-01-20T01:00:00.000Z')
    expect(endOfHour(new Date('2020-01-20T00:00:00.000Z'))
      .toISOString()).toEqual('2020-01-20T00:00:00.000Z')
  })

  it('can compute end of day', () => {
    expect(endOfDay(new Date('2020-01-20T01:00:00.000Z'))
      .toISOString()).toEqual('2020-01-21T00:00:00.000Z')
    expect(endOfDay(new Date('2020-01-20T00:01:00.000Z'))
      .toISOString()).toEqual('2020-01-21T00:00:00.000Z')
    expect(endOfDay(new Date('2020-01-20T00:00:01.000Z'))
      .toISOString()).toEqual('2020-01-21T00:00:00.000Z')
    expect(endOfDay(new Date('2020-01-20T00:00:00.001Z'))
      .toISOString()).toEqual('2020-01-21T00:00:00.000Z')
    expect(endOfDay(new Date('2020-01-20T00:00:00.000Z'))
      .toISOString()).toEqual('2020-01-20T00:00:00.000Z')
  })

  it('can sompute end of month', () => {
    expect(endOfMonth(new Date('2020-01-20T01:00:00.000Z'))
      .toISOString()).toEqual('2020-02-01T00:00:00.000Z')
    expect(endOfMonth(new Date('2020-01-20T00:01:00.000Z'))
      .toISOString()).toEqual('2020-02-01T00:00:00.000Z')
    expect(endOfMonth(new Date('2020-01-20T00:00:01.000Z'))
      .toISOString()).toEqual('2020-02-01T00:00:00.000Z')
    expect(endOfMonth(new Date('2020-01-20T00:00:00.001Z'))
      .toISOString()).toEqual('2020-02-01T00:00:00.000Z')
    expect(endOfMonth(new Date('2020-01-01T00:00:00.000Z'))
      .toISOString()).toEqual('2020-01-01T00:00:00.000Z')
    expect(endOfMonth(new Date('2020-12-30T01:00:00.000Z'))
      .toISOString()).toEqual('2021-01-01T00:00:00.000Z')
    expect(endOfMonth(new Date('2020-12-31T23:59:59.999Z'))
      .toISOString()).toEqual('2021-01-01T00:00:00.000Z')
  })

  it('can compute for 1y period', () => {
    expect(computeTimeLayout(new Date('2018-03-14T11:35:00Z'), '1y')).toMatchObject({
      tickDates: [
        new Date('2017-04-01T00:00:00.000Z'),
        new Date('2017-05-01T00:00:00.000Z'),
        new Date('2017-06-01T00:00:00.000Z'),
        new Date('2017-07-01T00:00:00.000Z'),
        new Date('2017-08-01T00:00:00.000Z'),
        new Date('2017-09-01T00:00:00.000Z'),
        new Date('2017-10-01T00:00:00.000Z'),
        new Date('2017-11-01T00:00:00.000Z'),
        new Date('2017-12-01T00:00:00.000Z'),
        new Date('2018-01-01T00:00:00.000Z'),
        new Date('2018-02-01T00:00:00.000Z'),
        new Date('2018-03-01T00:00:00.000Z'),
        new Date('2018-04-01T00:00:00.000Z')
      ]
    })
    expect(computeTimeLayout(new Date('2018-12-31T11:35:00Z'), '1y')).toMatchObject({
      tickDates: [
        new Date('2018-01-01T00:00:00.000Z'),
        new Date('2018-02-01T00:00:00.000Z'),
        new Date('2018-03-01T00:00:00.000Z'),
        new Date('2018-04-01T00:00:00.000Z'),
        new Date('2018-05-01T00:00:00.000Z'),
        new Date('2018-06-01T00:00:00.000Z'),
        new Date('2018-07-01T00:00:00.000Z'),
        new Date('2018-08-01T00:00:00.000Z'),
        new Date('2018-09-01T00:00:00.000Z'),
        new Date('2018-10-01T00:00:00.000Z'),
        new Date('2018-11-01T00:00:00.000Z'),
        new Date('2018-12-01T00:00:00.000Z'),
        new Date('2019-01-01T00:00:00.000Z')
      ]
    })

    const layout3 = computeTimeLayout(new Date('2018-03-11T11:35:00Z'), '3y')
    expect(layout3.tickDates[0]).toEqual(new Date('2015-04-01T00:00:00.000Z'))
    expect(layout3.tickDates[layout3.tickDates.length - 1]).toEqual(new Date('2018-04-01T00:00:00.000Z'))

    const layout4 = computeTimeLayout(new Date('2018-03-11T11:35:00Z'), '4y')
    expect(layout4.tickDates[0]).toEqual(new Date('2014-04-01T00:00:00.000Z'))
    expect(layout4.tickDates[layout4.tickDates.length - 1]).toEqual(new Date('2018-04-01T00:00:00.000Z'))
  })
})
