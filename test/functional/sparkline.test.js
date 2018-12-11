import React from 'react'
import styled from 'styled-components'
import { round10 } from 'round10'

import { Sparkline, colors10 } from '../../src'
import temporalData from '../resources/flow.json'

const xValues1 = [0, 1, 3, 10]
const data1 = {
  x: xValues1,
  y: xValues1.map(x => Math.exp(x / 10))
}

const data2 = {
  x: xValues1,
  y: xValues1.map(x => -Math.exp(x / 10))
}

const orderedData = temporalData.slice().reverse()
const start = orderedData[0].t
const xValues4 = orderedData.map(d => round10((d.t - start) / 100000, 0)).slice(100, 200)
const yValues4a = orderedData.map(d => d.v).slice(100, 200)
const data3 = {
  x: xValues4,
  y: yValues4a
}

const GraphContainer = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #fff;
  margin: 20px;
`

const width = 100
const height = 20

export default (props) => <div>
  <GraphContainer
    width={width}
    height={height}
  >
    <Sparkline
      data={data1}
      width={width}
      height={height}
      color={colors10[0]}
    />
  </GraphContainer>
  <GraphContainer
    width={width}
    height={height}
  >
    <Sparkline
      data={data2}
      width={width}
      height={height}
      color={colors10[1]}
    />
  </GraphContainer>
  <GraphContainer
    width={width}
    height={height}
  >
    <Sparkline
      data={data3}
      width={width}
      height={height}
      color={colors10[2]}
    />
  </GraphContainer>
</div>
