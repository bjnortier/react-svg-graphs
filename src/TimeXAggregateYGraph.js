import React, { Component } from 'react'
import PropTypes from 'prop-types'
import jstz from 'jstz'
import tz from 'timezone/loaded'
import { max, flatten } from 'lodash'

import TimeXAxis from './TimeXAxis'
import ContinuousBarValues from './ContinuousBarValues'
import Graph from './Graph'
import computeTimeLayout from './util/computeTimeLayout'
import computeAggregate from './util/computeAggregate'
import ceilingToPeriod from './util/ceilingToPeriod'
import timePeriods from './util/timePeriods'
import timeFormatForPeriod from './util/timeFormatForPeriod'

class TimeXAggregateYGraph extends Component {
  render () {
    const { localOrUTC, width, height, title, xLabel,
      data, period, divisions, palette, onHover } = this.props
    const timezone = localOrUTC === 'local' ? jstz.determine().name() : 'UTC'
    const format = timeFormatForPeriod(period)
    const dataXMax = max(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    const xMax = ceilingToPeriod(dataXMax, period, divisions)
    const xMin = xMax - timePeriods[period]
    const dx = (xMax - xMin) / divisions
    const aggregateData = data.map(d => {
      return {
        ...d,
        values: computeAggregate({ xMin, xMax, divisions, data: d.values })
      }
    })

    const xInfoFormatter = (timestamp) => {
      const from = tz(new Date(timestamp - dx / 2), format, 'en_GB', timezone)
      const to = tz(new Date(timestamp + dx / 2), format, 'en_GB', timezone)
      return `${from}-${to}`
    }
    return <Graph
      {...{ width, height, data: aggregateData, title, xLabel, palette, onHover }}
      computeXLayout={() => computeTimeLayout(xMax, period, localOrUTC)}
      renderXAxis={(props) => <TimeXAxis {...props} timezone={timezone} />}
      renderValues={(props) => <ContinuousBarValues {...props} {... { dx, xInfoFormatter }} />}
    >
      <text style={{ textAnchor: 'end' }} x={width - 64} y={30} >[{timezone}]</text>
    </Graph>
  }
}

TimeXAggregateYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  palette: PropTypes.array,
  period: PropTypes.oneOf(Object.keys(timePeriods)),
  divisions: PropTypes.number.isRequired,
  localOrUTC: PropTypes.oneOf(['local', 'utc']),
  onHover: PropTypes.func
}

TimeXAxis.defaultProps = {
  localOrUTC: 'local'
}

export default TimeXAggregateYGraph
