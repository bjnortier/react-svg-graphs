import React from 'react'
import styled from 'styled-components'

import { TimeXScalarYGraph } from '../../src'

const data1 = [
  {
    label: 'Alpha',
    values: [-5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12].map(a => ({
      x: a * 1000 * 3600,
      y: Math.random() * 10
    }))
  },
  {
    label: 'Beta',
    values: [8, 9, 10, 11, 12].map(a => ({
      x: a * 1000 * 3600,
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

export default (props) => <div>
  <GraphContainer width={width} height={height} >
    <TimeXScalarYGraph
      data={data1}
      width={width}
      height={height}
      title={`Basic Example UTC`}
      xLabel='Time'
      period='24h'
      localOrUTC='utc'
    />
  </GraphContainer>
  <GraphContainer width={width} height={height} >
    <TimeXScalarYGraph
      data={data1}
      width={width}
      height={height}
      title={`Basic Example Local`}
      xLabel='Time'
      period='24h'
      localOrUTC='local'
    />
  </GraphContainer>
  <GraphContainer width={width} height={height} >
    <TimeXScalarYGraph
      data={data1}
      width={width}
      height={height}
      title={`Show latest example`}
      xLabel='Time'
      period='6h'
      palette={palette}
    />
  </GraphContainer>
  <GraphContainer width={width} height={height} >
    <TimeXScalarYGraph
      data={emptyData}
      width={width}
      height={height}
      title={`Empty Data Example`}
      period='6h'
      xLabel='Time'
      palette={palette}
    />
  </GraphContainer>
</div>
