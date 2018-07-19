import React from 'react'
import { render } from 'react-dom'

import getLayout from '../../src/getLayout'
import { ScalarYAxis } from '../..'

const examples = [
  [0, 10],
  [],
  [10],
  [0, 1],
  [0, 0.1],
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

const heights = [320, 240, 180, 120, 80]
const width = 50
const padding = 50

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
        {heights.map(height => {
          const layout = getLayout('y', limits, height)
          return <div
            key={height}
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              width: width + padding
            }}
          >
            <div style={{padding: '10px 25px'}}>{height}px</div>
            <svg width={width} height={height + padding * 2}>
              <g transform={`translate(0, ${padding})`}>
                <rect x={width - 2} y={0} width={2} height={height} />
                <ScalarYAxis
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
