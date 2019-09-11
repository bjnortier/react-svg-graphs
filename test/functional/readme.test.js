import React from 'react'
import { render } from 'react-dom'

import { ScalarXScalarYGraph } from '../../src'

const data1 = [
  {
    label: 'A',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(a => ({ x: a, y: a * a }))
  },
  {
    label: 'B',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(b => ({ x: b, y: b * 10 }))
  }
]

render(
  <ScalarXScalarYGraph
    data={data1}
    width={640}
    height={480}
    title='Basic Example'
    xLabel='Iterations'
    onHover={hoverInfo => console.log('hover info:', hoverInfo)}
  />,
  document.getElementById('contents')
)
