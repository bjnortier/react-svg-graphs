import React from 'react'
import { render } from 'react-dom'

import { getScalarXAxisLayout } from '../../src/axes/layout'
import { ScalarXAxis } from '../..'

const examples = [
  [],
  [10],
  [0, 1],
  [0, 0.1],
  [0, 10],
  [0, 11],
  [0, 50],
  [0, 100],
  [1, 11],
  [0, 4.5],
  [0, 9.9],
  [-2, 10],
  [16, 28],
  [-40, 7],
  [1000, 2000],
  [1000, 2001],
  [1000, 1999],
  [-1000, -20],
  [-10000, 10000],
  [-100000, 1000000],
  [0, 0.01],
  [0, 0.001]
]

render(
  <div>
    {examples.map((limits, i) => {
      return <div
        key={i}
        style={{
          margin: 20
        }}
      >
        <div style={{padding: '10px 0'}}>{JSON.stringify(limits)}</div>
        {[800, 300].map(width => {
          const layout = getScalarXAxisLayout(limits, width)
          return <div
            key={width}
            style={{
              backgroundColor: 'white',
              height: 150,
              width
            }}
          >
            <svg width={width} height={150}>
              <rect x={25} y={0} width={width - 50} height={2} />
              <ScalarXAxis
                width={width - 50}
                height={100}
                layout={layout}
              />
            </svg>
          </div>
        })}
      </div>
    })}
  </div>,
  document.getElementById('contents')
)
