import expect from 'expect'

import minmax from '../../src/minmax'

describe('minmax', () => {
  it('computes the min and max x and y values', () => {
    const data = {
      x: {values: [-3, 10, -1]},
      y: [{values: [4, 3, 17]}, {values: [-10, -20, 3]}]
    }
    const [minX, maxX] = minmax(data.x)
    const [minY, maxY] = minmax(data.y)
    expect(minX).toEqual(-3)
    expect(maxX).toEqual(10)
    expect(minY).toEqual(-20)
    expect(maxY).toEqual(17)
  })
})
