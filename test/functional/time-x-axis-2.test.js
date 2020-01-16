import React from 'react'
import styled from 'styled-components'

import computeTimeLayout2 from '../../src/util/computeTimeLayout2'
import TimeXAxis2 from '../../src/TimeXAxis2'

const timeBounds = [
  [new Date('2018-01-02T00:00:00Z'), '1d'],
  [new Date('2018-01-02T05:00:00Z'), '1d'],
  [new Date('2018-01-02T00:00:00Z'), '2d'],
  [new Date('2018-01-02T00:00:00Z'), '3d'],
  [new Date('2018-01-02T00:00:00Z'), '4d'],
  [new Date('2018-01-02T00:00:00Z'), '5d'],
  [new Date('2018-01-02T00:00:00Z'), '6d'],
  [new Date('2018-01-02T00:00:00Z'), '7d'],
  [new Date('2018-01-02T00:00:00Z'), '1w'],
  [new Date('2018-01-02T00:00:00Z'), '2w'],
  [new Date('2018-01-04T00:01:00Z'), '3w'],
  [new Date('2018-01-02T00:00:00Z'), '4w']
]
// const widths = [800]
// const widths = [240, 800]
const widths = [800, 640, 480, 320]

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

const TimeXAxis2Test = props => (
  <div>
    {timeBounds.map(([maxDateValue, period], i) => {
      return (
        <div key={i}>
          <Limits>
            {maxDateValue.toGMTString()} [{period}]
          </Limits>
          {widths.map(width => {
            const layout = computeTimeLayout2(maxDateValue, period)
            return (
              <SVGContainer key={width} width={width + 48}>
                <Width>{width}px</Width>
                <svg width={width + 48} height={48}>
                  <g transform='translate(24, 0)'>
                    <line stroke='#ddd' x1={0} y1={0} x2={width} y2={0} />
                    <TimeXAxis2 {...{ width, layout }} />
                  </g>
                </svg>
              </SVGContainer>
            )
          })}
        </div>
      )
    })}
  </div>
)

export default TimeXAxis2Test
