import React, { Component } from 'react'
import styled from 'styled-components'
import { Box2 } from 'vecks'

import ContinuousBarValues from '../../src/ContinuousBarValues'
import computeAggregate from '../../src/computeAggregate'

const data1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => ({
  x,
  y: Math.exp(x / 10) - 0.8
}))
const data2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => ({
  x,
  y: Math.exp(x / 20) - 0.9
}))

const xMin = 0
const xMax = 10
const divisions = 5
const aggr1 = computeAggregate({ data: data1, xMin, xMax, divisions })
const aggr2 = computeAggregate({ data: data2, xMin, xMax, divisions })
const minY = 0
const maxY = 4
const dx = (xMax - xMin) / divisions

const GraphContainer = styled.svg`
  display: inline-block;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #fff;
  margin: 20px;
`

class GraphWithValue extends Component {
  render () {
    const width = 300
    const height = 300
    const bounds = new Box2()
      .expandByPoint({ x: xMin, y: minY })
      .expandByPoint({ x: xMax, y: maxY })

    return <div>
      <GraphContainer
        width={width}
        height={height}
      >
        <ContinuousBarValues
          data={aggr1}
          width={width}
          height={height}
          stroke='#2ca02c'
          fill='#2ca02c11'
          bounds={bounds}
          dx={dx}
        />
        <ContinuousBarValues
          data={aggr2}
          width={width}
          height={height}
          stroke='#1f77b4'
          fill='#1f77b411'
          bounds={bounds}
          dx={dx}
        />
      </GraphContainer>
    </div>
  }
}

export default (props) => <div>
  <GraphWithValue />
</div>
