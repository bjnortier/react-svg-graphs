import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { max, flatten } from 'lodash'
import { format, utcToZonedTime } from 'date-fns-tz'

import TimeXAxis from './TimeXAxis'
import ContinuousBarValues from './ContinuousBarValues'
import Graph from './Graph'
import computeTimeLayout from './util/computeTimeLayout'
import computeAggregate from './util/computeAggregate'
import timeFormatForPeriod from './util/timeFormatForPeriod'

class TimeXAggregateYGraph extends Component {
  render () {
    const {
      width,
      height,
      title,
      xLabel,
      data,
      period,
      divisions,
      palette,
      fill,
      onHover,
      onSelect,
      hoverPath,
      selectedPath
    } = this.props
    const pattern = timeFormatForPeriod(period)

    const noValues = data.reduce((acc, d) => acc + d.values.length, 0) === 0
    const dataXMax = noValues
      ? new Date().getTime()
      : max(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    const layout = computeTimeLayout(new Date(dataXMax), period)
    const xMax = layout.max.getTime()
    const xMin = layout.min.getTime()
    const dx = (xMax - xMin) / divisions
    const aggregateData = noValues
      ? []
      : data.map(d => ({
        ...d,
        values: computeAggregate({ xMin, xMax, divisions, data: d.values })
      }))

    const xValueFormatter = timestamp => {
      const from = format(utcToZonedTime(new Date(timestamp - dx / 2), 'UTC'), pattern, { timeZone: 'UTC' })
      const to = format(utcToZonedTime(new Date(timestamp + dx / 2), 'UTC'), pattern, { timeZone: 'UTC' })
      return `${from}-${to}`
    }
    return (
      <Graph
        {...{
          width,
          height,
          data: aggregateData,
          title,
          xLabel,
          palette,
          fill,
          onHover,
          onSelect,
          hoverPath,
          selectedPath,
          xValueFormatter,
          hoverSelectStyle: 'fine'
        }}
        computeXLayout={() => computeTimeLayout(new Date(dataXMax), period)}
        renderXAxis={props => <TimeXAxis {...props} />}
        renderValues={props => (
          <ContinuousBarValues {...props} dx={dx} />
        )}
      >
        <text style={{ textAnchor: 'end' }} x={width - 64} y={30}>
          [UTC]
        </text>
      </Graph>
    )
  }
}

TimeXAggregateYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  palette: PropTypes.array,
  fill: PropTypes.string,
  period: PropTypes.string.isRequired,
  divisions: PropTypes.number.isRequired,
  onHover: PropTypes.func,
  onSelect: PropTypes.func,
  hoverPath: PropTypes.object,
  selectedPath: PropTypes.object
}

TimeXAxis.defaultProps = {
  localOrUTC: 'local'
}

export default TimeXAggregateYGraph
