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
  y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(m => ({
    label: ['', '', '', '', '', '', '', '', '', ''].fill(m, 9 - m).join(''),
    values: xValues.map(x => m * Math.exp(x / 10))
  }))
}

const data3a = [
  {x: 1, y: 65},
  {x: 2, y: 39},
  {x: 3, y: 40},
  {x: 4, y: 27},
  {x: 5, y: 43},
  {x: 6, y: 22},
  {x: 7, y: 23},
  {x: 8, y: 70},
  {x: 9, y: 100},
  {x: 10, y: 85},
  {x: 11, y: 52},
  {x: 12, y: 55}
]
const data3b = {
  x: {
    values: data3a.map(s => s.x),
    label: 'X'
  },
  y: [{label: 'Y', values: data3a.map(s => s.y)}]
}

const data4 = {
  x: {
    values: [1, 2],
    label: 'iterarions'
  },
  y: [{
    label: 'rew',
    values: [-5291165.188978182, -2632850.206962444]
  }]
}

render(
  <div>
    <div style={{backgroundColor: '#fff'}}>
      <ScalarXYGraph
        data={data3b}
        width={600}
        height={320}
        padding={50}
        title={`Minotaur`}
      />
      <ScalarXYGraph
        data={data1}
        colorOffset={1}
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
      <ScalarXYGraph
        data={data4}
        width={640}
        height={400}
        padding={70}
        title={`Colors Example`}
      />
    </div>
  </div>,
  document.getElementById('contents')
)
