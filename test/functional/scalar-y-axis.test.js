import React from 'react'
import styled from 'styled-components'

import computeScalarLayout from '../../src/util/computeScalarLayout'
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
  [-100000.123, 50],
  [0, 0.01],
  [0, 0.001]
]

const heights = [320, 240, 180, 120, 80]

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

const Group = styled.div`
  display: inline-block;
`

const SVGContainer = styled.div`
  display: inline-block;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin: 20px;
  margin-top: 0;
  background-color: #fff;
`

const ScalarYTest = props => (
  <div>
    {examples.map((limits, i) => {
      return (
        <div key={i}>
          <Limits>limits={JSON.stringify(limits)}</Limits>
          {heights.map(height => {
            const layout = computeScalarLayout('y', limits, height)
            return (
              <Group key={height}>
                <Height width={80}>{height}</Height>
                <SVGContainer width={80} height={height + 96}>
                  <svg width={64} height={height + 96}>
                    <g transform='translate(16, 48)'>
                      <line stroke='#ddd' x1={48} y1={0} x2={48} y2={height} />
                      <ScalarYAxis width={48} height={height} layout={layout} />
                    </g>
                  </svg>
                </SVGContainer>
              </Group>
            )
          })}
        </div>
      )
    })}
  </div>
)

export default ScalarYTest
