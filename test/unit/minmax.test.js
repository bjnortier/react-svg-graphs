import expect from 'expect'

import minmax from '../../src/minmax'

describe('minmax', () => {
  it('computes the min and max x and y values', () => {
    const data = {
      x: { values: [-3, 10, -1] },
      y: [{ values: [4, 3, 17] }, { values: [-10, -20, 3] }]
    }
    const [xMin, xMax] = minmax(data.x.values)
    const [minY, maxY] = minmax(data.y.map(y => y.values))
    expect(xMin).toEqual(-3)
    expect(xMax).toEqual(10)
    expect(minY).toEqual(-20)
    expect(maxY).toEqual(17)
  })

  it('ignores null or undefined values', () => {
    expect(minmax([0, 10, null])).toEqual([0, 10])
    expect(minmax([0, 10, undefined])).toEqual([0, 10])
  })
})
