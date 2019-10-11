import React from 'react'
import styled from 'styled-components'

import TimeXAggregateYGraph from '../../src/TimeXAggregateYGraph'
import data4 from './aggregate-example.js'

const minutes = []
for (let i = 1; i <= 60; ++i) {
  minutes.push(i * 1000 * 60)
}

const subSampleMinutes1 = [21, 20, 23, 45].map(x => x * 1000 * 60)
const subSampleMinutes2 = [-10, 5, 10, 11, 30, 35].map(x => x * 1000 * 60)

const data1 = [
  {
    label: 'HTTP 2XX',
    values: minutes.map((x, i) => ({
      x,
      y: Math.exp(i / 50) - 0.5
    }))
  },
  {
    label: 'HTTP 5XX',
    values: minutes.map((x, i) => ({
      x,
      y: Math.random() * 2 - 1
    }))
  }
]

const data2 = [
  {
    label: 'HTTP 2XX',
    values: subSampleMinutes1.map((x, i) => ({
      x,
      y: 10
    }))
  },
  {
    label: 'HTTP 5XX',
    values: subSampleMinutes2.map((x, i) => ({
      x,
      y: 10
    }))
  }
]

const data3 = [
  {
    label: 'HTTP 2XX',
    values: minutes.slice(0, 30).map((x, i) => ({
      x,
      y: Math.exp(i / 50) - 0.5
    }))
  }
]

const data5 = [
  {
    label: 'HTTP 2XX',
    values: minutes.map((x, i) => ({
      x,
      y: i > 30 ? 6 : 2
    }))
  }
]

const emptyValues = [
  {
    label: 'Empty',
    values: []
  }
]

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
      <TimeXAggregateYGraph
        width={width}
        height={height}
        data={data1}
        title='Basic Example'
        xLabel='Time'
        period='1h'
        divisions={12}
        localOrUTC='utc'
        palette={['#2ca02c', '#d62728']}
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <TimeXAggregateYGraph
        width={width}
        height={height}
        data={data2}
        title='Subsample Example'
        xLabel='Time'
        period='1h'
        divisions={6}
        localOrUTC='utc'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <TimeXAggregateYGraph
        width={width}
        height={height}
        data={data3}
        title='Crop to last datapoint'
        xLabel='Time'
        period='1h'
        divisions={6}
        localOrUTC='utc'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <TimeXAggregateYGraph
        width={width}
        height={height}
        data={data5}
        title='Non-Zero Y min'
        xLabel='Time'
        period='1h'
        divisions={6}
        localOrUTC='utc'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <TimeXAggregateYGraph
        width={width}
        height={height}
        data={data4}
        title='Issue'
        xLabel='Time'
        period='24h'
        divisions={24 * 4}
        localOrUTC='utc'
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <TimeXAggregateYGraph
        width={width}
        height={height}
        data={[]}
        title='Empty Data Example'
        xLabel='Time'
        period='1h'
        divisions={6}
        localOrUTC='utc'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <TimeXAggregateYGraph
        width={width}
        height={height}
        data={emptyValues}
        title='Empty Values Example'
        xLabel='Time'
        period='1h'
        divisions={6}
        localOrUTC='utc'
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
  </div>
)
