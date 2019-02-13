import React from 'react'
import styled from 'styled-components'

import { TimeXScalarYGraph } from '../../src'

const data1 = {
  x: {
    label: 't',
    values: [-5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12].map(x => x * 1000 * 3600)
  },
  y: [
    {
      label: 'Alpha',
      values: [ 0, 1, null, 9, 16, 25, 36, 49, 64, 81, 144 ]
    },
    {
      label: 'Beta',
      values: [ 10, 11, 12, 14, 16, 18, 21, 24, null, null, 37 ]
    }
  ]
}
const colors = ['#906', '#609']

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
      periodLabel='24h'
      localOrUTC='utc'
    />
  </GraphContainer>
  <GraphContainer width={width} height={height} >
    <TimeXScalarYGraph
      data={data1}
      width={width}
      height={height}
      title={`Basic Example Local`}
      periodLabel='24h'
      localOrUTC='local'
    />
  </GraphContainer>
  <GraphContainer width={width} height={height} >
    <TimeXScalarYGraph
      data={data1}
      width={width}
      height={height}
      title={`Overflow Example`}
      periodLabel='6h'
      colors={colors}
      colorOffset={12}
    />
  </GraphContainer>
</div>
