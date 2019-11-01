import React from 'react'
import styled from 'styled-components'
import ms from 'ms'

import TimeXScalarYGraph2 from '../../src/TimeXScalarYGraph2'

const data1 = [
  {
    label: 'Alpha',
    values: [-5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12].map(a => ({
      x: a * ms('0.1y'),
      y: Math.random() * 10
    }))
  },
  {
    label: 'Beta',
    values: [8, 9, 10, 11, 12].map(a => ({
      x: a * ms('0.1y'),
      y: Math.random() * 10
    }))
  }
]
const emptyData = []
const palette = ['#990066', '#660099']

const GraphContainer = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #fff;
  margin: 20px;
`

const width = 640
const height = 480

const TimeXScalarYGraphTest = props => (
  <div>
    <GraphContainer width={width} height={height}>
      <TimeXScalarYGraph2
        data={data1}
        width={width}
        height={height}
        title='Basic Example'
        xLabel='Time'
        period='1y'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <TimeXScalarYGraph2
        data={emptyData}
        width={width}
        height={height}
        title='Empty Data Example'
        period='1y'
        xLabel='Time'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
  </div>
)

export default TimeXScalarYGraphTest
