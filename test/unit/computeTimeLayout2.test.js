import expect from 'expect'

import computeTimeLayout2 from '../../src/util/computeTimeLayout2'

describe.only('Compute Time Layout 2', () => {
  it('can compute for 1y period', () => {
    expect(computeTimeLayout2(new Date('2018-03-14T11:35:00Z'), '1y')).toMatchObject({
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
    expect(computeTimeLayout2(new Date('2018-12-31T11:35:00Z'), '1y')).toMatchObject({
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
  })
})
