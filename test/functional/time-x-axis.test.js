import React from 'react'
import styled from 'styled-components'

import getLayout from '../../src/getLayout'
import { ScalarXAxis } from '../../src'

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

const Limits = styled.div`
  margin: 20px;
`

const Width = styled.div`
  display: inline-block;
  margin: 10px;
`

const SVGContainer = styled.div`
  width: ${({ width }) => width}px;
  margin: 20px;
  background-color: #fff;
`

export default (props) => <div>
  {examples.map((limits, i) => {
    return <div key={i}>
      <Limits>limits={JSON.stringify(limits)}</Limits>
      {widths.map(width => {
        const layout = getLayout('x', limits, width)
        return <SVGContainer
          key={width}
          width={width + 48}
        >
          <Width>{width}px</Width>
          <svg width={width + 48} height={48}>
            <g transform={`translate(24, 0)`}>
              <line stroke='#ddd' x1={0} y1={0} x2={width} y2={0} />
              <ScalarXAxis
                width={width}
                layout={layout}
                label='X'
              />
            </g>
          </svg>
        </SVGContainer>
      })}
    </div>
  })}
</div>
