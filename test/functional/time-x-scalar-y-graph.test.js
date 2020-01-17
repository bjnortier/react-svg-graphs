import React, { Component } from 'react'
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
  background-color: #bdf;
  padding: 20px;
  margin: 20px;
`

const width = 640
const height = 480

class HoverAndSelectionGraph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPath: null,
      hoverPath: null
    }
  }

  render () {
    return (
      <TimeXScalarYGraph
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
    <GraphContainer width={width} height={height}>
      <HoverAndSelectionGraph
        data={data1}
        width={width}
        height={height}
        title='Basic Example'
        xLabel='Time'
        period='1d'
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectionGraph
        data={data1}
        width={width}
        height={height}
        title='Palette example'
        xLabel='Time'
        period='2d'
        palette={palette}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectionGraph
        data={emptyData}
        width={width}
        height={height}
        title='Empty Data Example'
        period='3d'
        xLabel='Time'
        palette={palette}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <TimeXScalarYGraph
        data={data1}
        width={width}
        height={height}
        title='Fill Example'
        xLabel='Time'
        period='1d'
        palette={palette}
        fill='#fce'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
  </div>
)

export default TimeXScalarYGraphTest
