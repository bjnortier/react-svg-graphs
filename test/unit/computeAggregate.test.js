import expect from 'expect'

import computeAggregate from '../../src/util/computeAggregate'

describe('Compute aggregate', () => {
  it('for a set of data 1', () => {
    const data = [{ x: 0, y: 3 }, { x: -0.3, y: 1 }, { x: 0.2, y: 4 }]

    const xMin = -0.5
    const xMax = 0.5
    const divisions = 1
    expect(computeAggregate({ xMin, xMax, divisions, data })).toEqual([
      { x: 0, y: 8 }
    ])
  })

  it('for a set of data 2', () => {
    const data = [{ x: 0, y: 3 }, { x: -0.3, y: 1 }, { x: 0.2, y: 7 }]

    const xMin = -0.5
    const xMax = 0.5
    const divisions = 2
    expect(computeAggregate({ xMin, xMax, divisions, data })).toEqual([
      { x: -0.25, y: 4 },
      { x: 0.25, y: 7 }
    ])
  })

  it('for a set of data 3', () => {
    const data = [
      { x: 0.1, y: 3 },
      { x: 1.3, y: 1 },
      { x: 3, y: 4 },
      { x: 7, y: 7.4 }
    ]

    const xMin = 0
    const xMax = 10
    const divisions = 10
    expect(computeAggregate({ xMin, xMax, divisions, data })).toEqual([
      { x: 0.5, y: 3 },
      { x: 1.5, y: 1 },
      { x: 2.5, y: 4 },
      { x: 3.5, y: 0 },
      { x: 4.5, y: 0 },
      { x: 5.5, y: 0 },
      { x: 6.5, y: 7.4 },
      { x: 7.5, y: 0 },
      { x: 8.5, y: 0 },
      { x: 9.5, y: 0 }
    ])
  })

  it('ignores data outside bounds', () => {
    const data = [
      { x: 0.1, y: 3 },
      { x: 1.3, y: 1 },
      { x: 3, y: 4 },
      { x: 5.0, y: 13.3 }
    ]

    const xMin = 3
    const xMax = 5
    const divisions = 2
    expect(computeAggregate({ xMin, xMax, divisions, data })).toEqual([
      { x: 3.5, y: 0 },
      { x: 4.5, y: 13.3 }
    ])
  })

  it('includes data on the boundaries', () => {
    const data = [{ x: 0.0, y: 3.3 }, { x: 1.0, y: 1.2 }, { x: 2.0, y: 7.2 }]

    const xMin = 0
    const xMax = 2
    const divisions = 2
    expect(computeAggregate({ xMin, xMax, divisions, data })).toEqual([
      { x: 0.5, y: 1.2 },
      { x: 1.5, y: 7.2 }
    ])
  })

  it('Issue #2', () => {
    const data = [{ x: 1570785300000, y: 2 }]
    const xMin = 1570774500000
    const xMax = 1570785300000
    const divisions = 4
    expect(computeAggregate({ xMin, xMax, divisions, data })).toEqual([
      {
        x: 1570775850000,
        y: 0
      },
      {
        x: 1570778550000,
        y: 0
      },
      {
        x: 1570781250000,
        y: 0
      },
      {
        x: 1570783950000,
        y: 2
      }
    ])
  })
})
