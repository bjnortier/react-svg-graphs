import React from 'react'
import styled from 'styled-components'

import computeTimeLayout from '../../src/computeTimeLayout'
import { TimeXAxis } from '../../src'

const timeBounds = [
  [new Date('2018-06-19').getTime(), '1w']
  // [day * 31, 7],
  // [day * 40, 7],
  // [day * 72, 7],
  // [day * 7, 6],
  // [day * 6, 6],
  // [day * 1, 6],
  // [day * 36, 6],
  // [day + hour * 6, 5],
  // [day + hour * 12, 5],
  // [day, 4],
  // [day + hour * 9.5, 4],
  // [day + hour * 17.2, 4],
  // [day + hour * 22.7, 4],
  // [0, 3],
  // [day + hour * 12, 3],
  // [day + hour * 25, 3],
  // [day + hour * 24.5, 3],
  // [0, 2],
  // [day + hour * 13.75, 2],
  // [day + hour * 22.7, 2],
  // [hour * 0, 1],
  // [day + hour * 1, 1],
  // [day + hour * 6, 1],
  // [day + hour * 22, 1],
  // [day + hour * 0, 0],
  // [day + hour * 0.75, 0],
  // [day + hour * 9, 0],
  // [day + hour * 13.75, 0]
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
  {timeBounds.map(([maxTimestamp, periodLabel], i) => {
    return <div key={i}>
      <Limits>{periodLabel}</Limits>
      {widths.map(width => {
        const layout = computeTimeLayout(maxTimestamp, periodLabel)
        return <SVGContainer
          key={width}
          width={width + 48}
        >
          <Width>{width}px</Width>
          <svg width={width + 48} height={48}>
            <g transform={`translate(24, 0)`}>
              <line stroke='#ddd' x1={0} y1={0} x2={width} y2={0} />
              <TimeXAxis
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
