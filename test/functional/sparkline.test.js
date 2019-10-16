import React, { Component } from 'react'
import styled from 'styled-components'
import { round10 } from 'round10'
import { zip } from 'lodash'

import { Sparkline, colors10 } from '../../src'
import temporalData from '../resources/flow.json'

const values1 = [0, 1, 3, 10].map(x => ({
  x,
  y: Math.exp(x / 10)
}))

const values2 = [0, 1, 3, 10].map(x => ({
  x,
  y: -Math.exp(x / 10)
}))

const orderedData = temporalData.slice().reverse()
const start = orderedData[0].t
const xValues4 = orderedData
  .map(d => round10((d.t - start) / 100000, 0))
  .slice(100, 200)
const yValues4a = orderedData.map(d => d.v).slice(100, 200)
const values3 = zip(xValues4, yValues4a).map(([x, y]) => ({ x, y }))

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
    const { values, stroke } = this.props
    const { highlightIndex } = this.state
    const width = 300
    const height = 50
    return (
      <div>
        <Value>
          {highlightIndex !== null
            ? round10(values[highlightIndex].y, -2)
            : null}
        </Value>
        <GraphContainer width={width} height={height}>
          <Sparkline
            values={values}
            width={width}
            height={height}
            stroke={stroke}
            onHighlightIndex={highlightIndex =>
              this.setState({ highlightIndex })
            }
          />
        </GraphContainer>
      </div>
    )
  }
}

export default props => (
  <div>
    <GraphWithValue
      values={[{ x: 1, y: 0 }, { x: 2, y: 0 }]}
      stroke={colors10[0]}
    />
    <GraphWithValue values={[]} stroke={colors10[0]} />
    <GraphWithValue values={values1} stroke={colors10[0]} />
    <GraphWithValue values={values2} stroke={colors10[1]} />
    <GraphWithValue values={values3} stroke={colors10[2]} />
  </div>
)
