import React from 'react'
import { render } from 'react-dom'

import { getScalarAxisLayout } from '../../src/axes/layout'
import { ScalarYAxis } from '../..'

const examples = [
  // [],
  // [10],
  // [0, 1],
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
  // [1000, 2001],
  // [1000, 1999],
  // [-1000, -20],
  // [-10000, 10000],
  // [-100000, 1000000],
  // [0, 0.01],
  // [0, 0.001]
]

render(
  <div style={{
    fontFamily: 'Roboto Mono'
  }}>
    {examples.map((limits, i) => {
      const layout = getScalarAxisLayout(limits)
      const width = 120
      return <div
        key={i}
        style={{
          display: 'inline-block',
          margin: 20
        }}
      >
        <div
          key={i}
          style={{
            margin: '50px auto',
            height: 320,
            width,
            fontSize: 12
          }}
        >
          <div style={{padding: '10px 0'}}>{JSON.stringify(limits)}</div>
          <div
            style={{
              backgroundColor: 'white',
              height: 320,
              width: 100
            }}
          >
            <svg width={100} height={320}>
              <ScalarYAxis
                width={100}
                height={300}
                layout={layout}
              />
            </svg>
          </div>
        </div>
      </div>
    })}
  </div>,
  document.getElementById('contents')
)
