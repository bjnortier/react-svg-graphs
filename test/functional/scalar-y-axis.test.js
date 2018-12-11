import React from 'react'
import styled from 'styled-components'

import getLayout from '../../src/getLayout'
import { ScalarYAxis } from '../../src'

const examples = [
  [0, 10],
  [],
  [0],
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

const Limits = styled.div`
  margin: 20px;
`

const Height = styled.div`
  margin-left: 20px;
  padding: 10px;
  padding-bottom: 0;
  width: ${({ width }) => width - 20}px;
  background-color: #fff;
`

const SVGContainer = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin: 20px;
  margin-top: 0;
  background-color: #fff;
`

export default (props) => <div>
  {examples.map((limits, i) => {
    return <div key={i}>
      <Limits>limits={JSON.stringify(limits)}</Limits>
      {heights.map(height => {
        const layout = getLayout('y', limits, height)
        return <div key={height}>
          <Height width={width + padding}>{height}</Height>
          <SVGContainer
            width={width + padding}
            height={height + padding * 2}
          >
            <svg width={width} height={height + padding * 2}>
              <g transform={`translate(0, ${padding})`}>
                <line stroke='#ddd' x1={width} y1={0} x2={width} y2={height} />
                <ScalarYAxis
                  width={width}
                  height={height}
                  layout={layout}
                />
              </g>
            </svg>
          </SVGContainer>
        </div>
      })}
    </div>
  })}
</div>
