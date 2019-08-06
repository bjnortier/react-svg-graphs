import React, { Component } from 'react'
import styled from 'styled-components'
import { Box2 } from 'vecks'

import ContinuousBarValues from '../../src/ContinuousBarValues'

const data1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => ({
  x,
  y: Math.exp(x / 10) - 0.8
}))
const data2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => ({
  x,
  y: Math.exp(x / 20) - 0.9
}))

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
      .expandByPoint({ x: -0.5, y: 0 })
      .expandByPoint({ x: 10.5, y: 2 })

    return <div>
      <GraphContainer
        width={width}
        height={height}
      >
        <ContinuousBarValues
          data={data1}
          width={width}
          height={height}
          stroke='#2ca02c'
          fill='#2ca02c11'
          dx={1}
          bounds={bounds}
        />
        <ContinuousBarValues
          data={data2}
          width={width}
          height={height}
          stroke='#1f77b4'
          fill='#1f77b411'
          dx={1}
          bounds={bounds}
        />
      </GraphContainer>
    </div>
  }
}

export default (props) => <div>
  <GraphWithValue />
</div>
