import React from 'react'
import { render } from 'react-dom'

import { ScalarXYGraph } from '../../src'

const data1 = {
  x: {
    label: 'Foo',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  y: [
    {
      label: 'A',
      values: [ 0, 1, null, 9, 16, 25, 36, 49, 64, 81, 100 ]
    },
    {
      label: 'B',
      values: [ 10, 11, 12, 14, 16, 18, 21, 24, null, null, 37 ]
    }
  ]
}

const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const data2 = {
  x: {
    label: 'Bar',
    values: xValues
  },
  y: [0,1,2,3,4,5,6,7,8,9].map(m => ({
    label: m,
    values: xValues.map(x => m * Math.exp(x / 10))
  }))
}

render(
  <div>
    <div style={{backgroundColor: '#fff'}}>
      <ScalarXYGraph
        data={data1}
        width={600}
        height={400}
        padding={50}
        title={`Basic Example`}
      />
      <ScalarXYGraph
        data={data2}
        width={600}
        height={400}
        padding={50}
        title={`Colors Example`}
      />
    </div>
  </div>,
  document.getElementById('contents')
)
