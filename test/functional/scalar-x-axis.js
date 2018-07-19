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
const widths = [800, 640, 480, 320, 240]
const height = 50
const padding = 25

render(
  <div>
    {examples.map((limits, i) => {
      return <div key={i} style={{margin: 20}}>
        <div style={{padding: '10px 0'}}>{JSON.stringify(limits)}</div>
        {widths.map(width => {
          const layout = getScalarXAxisLayout(limits, width)
          return <div
            key={width}
            style={{
              backgroundColor: 'white',
              width: width + padding * 2
            }}
          >
            <div style={{padding: '10px 25px'}}>{width}px</div>
            <svg width={width + padding * 2} height={height}>
              <g transform={`translate(${padding}, 0)`}>
                <rect x={0} y={0} width={width} height={2} />
                <ScalarXAxis
                  width={width}
                  height={height}
                  layout={layout}
                />
              </g>
            </svg>
          </div>
        })}
      </div>
    })}
  </div>,
  document.getElementById('contents')
)
