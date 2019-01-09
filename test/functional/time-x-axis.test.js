import React from 'react'
import styled from 'styled-components'

import computeTimeLayout from '../../src/computeTimeLayout'
import { TimeXAxis } from '../../src'

const timeBounds = [
  [new Date('2018-06-19').getTime(), '1mo'],
  [new Date('2018-06-19').getTime(), '1w'],
  [new Date('2018-06-19').getTime(), '2d'],
  [new Date('2018-06-19').getTime(), '1d'],
  [new Date('2018-06-19').getTime(), '12h'],
  [new Date('2018-06-19').getTime(), '6h'],
  [new Date('2018-06-19').getTime(), '3h'],
  [new Date('2018-06-19').getTime(), '1h']
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
