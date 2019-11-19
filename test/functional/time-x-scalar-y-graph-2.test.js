import React, { Component } from 'react'
import styled from 'styled-components'
import ms from 'ms'

import { TimeXScalarYGraph2 } from '../../src'

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

const Graph = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #fff;
  margin: 20px;
`

const width = 640
const height = 480

class ExternalSelection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPath: null,
      hoverPath: null
    }
  }

  render () {
    return (
      <TimeXScalarYGraph2
        {...this.props}
        onSelect={selectedPath => this.setState({ selectedPath })}
        onHover={hoverPath => this.setState({ hoverPath })}
        selectedPath={this.state.selectedPath}
        hoverPath={this.state.hoverPath}
      />
    )
  }
}

const TimeXScalarYGraphTest = props => (
  <div>
    <Graph width={width} height={height}>
      <ExternalSelection
        data={data1}
        width={width}
        height={height}
        title='External Selection Example'
        period='1y'
        xLabel='Time'
        palette={palette}
      />
    </Graph>
    <Graph width={width} height={height}>
      <TimeXScalarYGraph2
        data={data1}
        width={width}
        height={height}
        title='Internal Selection Example'
        xLabel='Time'
        period='1y'
        onHover={hoverPath => console.log('hover path:', hoverPath)}
      />
    </Graph>

    <Graph width={width} height={height}>
      <TimeXScalarYGraph2
        data={emptyData}
        width={width}
        height={height}
        title='Empty Data Example'
        period='1y'
        xLabel='Time'
        onHover={hoverPath => console.log('hover path:', hoverPath)}
      />
    </Graph>

  </div>
)

export default TimeXScalarYGraphTest
