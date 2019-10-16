import React from 'react'
import { round10 } from 'round10'
import styled from 'styled-components'
import { zip } from 'lodash'

import { ScalarXScalarYGraph } from '../../src'
import temporalData from '../resources/flow.json'

const data1 = [
  {
    label: 'A',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(a => ({ x: a, y: a * a }))
  },
  {
    label: 'B',
    values: [1, 2, 3, 4, 7, 8, 9].map(b => ({ x: b, y: b * 10 }))
  }
]
const xValues2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12]
const data2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(m => ({
  label: ['', '', '', '', '', '', '', '', '', ''].fill(m, 9 - m).join(''),
  values: xValues2.map(x => ({
    x,
    y: round10(m * Math.exp(x / 10), -2)
  }))
}))

const data3 = [
  {
    label: 'iterations',
    values: [{ x: 1, y: -5291165.188978182 }, { x: 2, y: -2632850.206962444 }]
  }
]
const emptyData = []

// Re-map the data form timestamps to millisecs from start
// Temporal Data is in the form {t: <timestamp>, v: <value>} an in
// reverse chronological order
const orderedData = temporalData.slice().reverse()
const start = orderedData[0].t
const xValues4 = orderedData
  .map(d => round10((d.t - start) / 100000, 0))
  .slice(100, 200)
const yValues4a = orderedData.map(d => d.v).slice(100, 200)
const yValues4b = orderedData.map(d => d.v).slice(200, 300)
const data4 = [
  {
    label: 'foo',
    values: zip(xValues4, yValues4a).map(([x, y]) => ({ x, y }))
  },
  {
    label: 'bar',
    values: zip(xValues4, yValues4b).map(([x, y]) => ({ x, y }))
  }
]
const colors4 = ['#906', '#609']

const GraphContainer = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #fff;
  margin: 20px;
`

const width = 640
const height = 480

export default props => (
  <div>
    <GraphContainer width={width} height={height}>
      <ScalarXScalarYGraph
        data={data1}
        width={width}
        height={height}
        title='Basic Example'
        xLabel='Iterations'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <ScalarXScalarYGraph
        data={data2}
        width={width}
        height={350}
        title='Colors Example'
        xLabel='X'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <ScalarXScalarYGraph
        data={data3}
        width={width}
        height={height}
        title='Limits Example'
        xLabel='iterations'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <ScalarXScalarYGraph
        data={data4}
        width={width}
        height={height}
        title='Large Dataset Example'
        xLabel='Foo'
        palette={colors4}
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <ScalarXScalarYGraph
        data={emptyData}
        width={width}
        height={height}
        title='Empty Example'
        xLabel='Empty'
        colors={colors4}
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
  </div>
)
