import React, { Component } from 'react'
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
  display: inline-block;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #fff;
  margin: 20px;
`

const Value = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  text-align: right;

`

class GraphWithValue extends Component {
  constructor (props) {
    super(props)
    this.state = {
      highlightIndex: null
    }
  }

  render () {
    const { data, color } = this.props
    const { highlightIndex } = this.state
    const width = 300
    const height = 50
    return <div>
      <Value>{highlightIndex !== null ? round10(data.y[highlightIndex], -2) : null}</Value>
      <GraphContainer
        width={width}
        height={height}
      >
        <Sparkline
          data={data}
          width={width}
          height={height}
          color={color}
          onHighlightIndex={highlightIndex => this.setState({ highlightIndex })}
        />
      </GraphContainer>
    </div>
  }
}

export default (props) => <div>
  <GraphWithValue data={{ x: [], y: [] }} color={colors10[0]} />
  <GraphWithValue data={{ x: [1, 1], y: [0, 0] }} color={colors10[0]} />
  <GraphWithValue data={data1} color={colors10[0]} />
  <GraphWithValue data={data2} color={colors10[1]} />
  <GraphWithValue data={data3} color={colors10[2]} />
</div>
