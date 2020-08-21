import React from 'react'
import styled from 'styled-components'

import { TimeXAggregateYGraph, HoverAndSelectHandler } from '../../src'
import issue2 from './issue-2.js'
import issue3 from './issue-3.js'

const now = new Date()
const hours = []
for (let i = 1; i <= 23; ++i) {
  hours.push(i * 1000 * 60 * 60)
}

const subSampleMinutes1 = [21, 20, 23, 45].map(x => x * 1000 * 60 * 60)
const subSampleMinutes2 = [-10, 5, 10, 11, 30, 35].map(x => x * 1000 * 60 * 60)

const data1 = [
  {
    label: 'HTTP 2XX',
    values: hours.map((x, i) => ({
      x,
      y: Math.exp(i / 50) - 0.5
    }))
  },
  {
    label: 'HTTP 5XX',
    values: hours.map((x, i) => ({
      x,
      y: Math.random() * 2 - 1
    }))
  }
]

const dataCurrentTime = [
  {
    label: 'HTTP 2XX',
    values: hours.map((x, i) => ({
      x: now.getTime() + x - 28 * 1000 * 3600,
      y: Math.exp(i / 50) - 0.5
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
    values: hours.slice(0, 30).map((x, i) => ({
      x,
      y: Math.exp(i / 50) - 0.5
    }))
  }
]

const data5 = [
  {
    label: 'HTTP 2XX',
    values: hours.map((x, i) => ({
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
  background-color: #bdf;
  padding: 20px;
  margin: 20px;
`

const width = 640
const height = 480

const TimeXAggregateYGraphTest = props => (
  <div>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={data1}
        title='Basic Example'
        xLabel='Time'
        period='1d'
        divisions={24}
        palette={['#2ca02c', '#d62728']}
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={dataCurrentTime}
        pinToCurrentTime
        title='Pin to current time Example'
        xLabel='Time'
        period='24h'
        divisions={24}
        palette={['#2ca02c', '#d62728']}
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={data2}
        title='Subsample Example'
        xLabel='Time'
        period='1d'
        divisions={6}
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={data3}
        title='Crop to last datapoint'
        xLabel='Time'
        period='1d'
        divisions={6}
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={data5}
        title='Non-Zero Y min'
        xLabel='Time'
        period='1d'
        divisions={6}
        onHover={hoverInfo => console.log('hover info:', hoverInfo)}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={issue2}
        title='Issue2 '
        xLabel='Time'
        period='1d'
        divisions={24 * 4}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={issue3}
        title='Issue 3'
        xLabel='Time'
        period='1d'
        divisions={24 * 4}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={[]}
        title='Empty Data Example'
        xLabel='Time'
        period='1d'
        divisions={6}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={emptyValues}
        title='Empty Values Example'
        xLabel='Time'
        period='1d'
        divisions={6}
      />
    </GraphContainer>
    <GraphContainer width={width} height={height}>
      <HoverAndSelectHandler
        GraphComponent={TimeXAggregateYGraph}
        width={width}
        height={height}
        data={data1}
        title='Fill Example'
        xLabel='Time'
        period='1d'
        divisions={24}
        fill='#ea9'
      />
    </GraphContainer>
  </div>
)

export default TimeXAggregateYGraphTest
