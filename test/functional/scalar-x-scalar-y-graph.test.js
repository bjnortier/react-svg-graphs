import React from 'react'
import { round10 } from 'round10'
import styled from 'styled-components'

import { ScalarXScalarYGraph } from '../../src'
import temporalData from '../resources/flow.json'

const data1 = {
  x: {
    label: 'Foo',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  y: [
    {
      label: 'A',
      values: [ 0, 1, null, 9, 16, 25, 36, 49, 64, 81, 100 ]
    },
    {
      label: 'B',
      values: [ 10, 11, 12, 14, 16, 18, 21, 24, null, null, 37 ]
    }
  ]
}

const xValues2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12]
const data2 = {
  x: {
    label: 'Bar',
    values: xValues2
  },
  y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(m => ({
    label: ['', '', '', '', '', '', '', '', '', ''].fill(m, 9 - m).join(''),
    values: xValues2.map(x => m * Math.exp(x / 10))
  }))
}

const data3 = {
  x: {
    values: [1, 2],
    label: 'iterarions'
  },
  y: [{
    label: 'Reward',
    values: [-5291165.188978182, -2632850.206962444]
  }]
}

// Re-map the data form timestamps to millisecs from start
// Temporal Data is in the form {t: <timestamp>, v: <value>} an in
// reverse chronological order
const orderedData = temporalData.slice().reverse()
const start = orderedData[0].t
const xValues4 = orderedData.map(d => round10((d.t - start) / 100000, 0)).slice(100, 200)
const yValues4a = orderedData.map(d => d.v).slice(100, 200)
const yValues4b = orderedData.map(d => d.v).slice(200, 300)
const data4 = {
  x: {
    label: 'Iterations',
    values: xValues4
  },
  y: [{
    label: 'foo',
    values: yValues4a
  }, {
    label: 'bar',
    values: yValues4b
  }]
}

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
    <ScalarXScalarYGraph
      data={data1}
      width={width}
      height={height}
      title={`Basic Example`}
    />
  </GraphContainer>
  <GraphContainer width={width} height={height} >
    <ScalarXScalarYGraph
      data={data2}
      width={width}
      height={height}
      title={`Colors Example`}
    />
  </GraphContainer>
  <GraphContainer width={width} height={height} >
    <ScalarXScalarYGraph
      data={data3}
      width={width}
      height={height}
      title={`Limits Example`}
    />
  </GraphContainer>
  <GraphContainer width={width} height={height} >
    <ScalarXScalarYGraph
      data={data4}
      width={width}
      height={height}
      title={`Large Dataset Example`}
    />
  </GraphContainer>
</div>