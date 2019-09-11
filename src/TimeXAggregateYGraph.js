import React, { Component } from 'react'
import PropTypes from 'prop-types'
import jstz from 'jstz'
import { max, flatten } from 'lodash'
import { format, utcToZonedTime } from 'date-fns-tz'

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
    const timeZone = localOrUTC === 'local' ? jstz.determine().name() : 'UTC'
    const pattern = timeFormatForPeriod(period)

    const noValues = data.reduce((acc, d) => acc + d.values.length, 0) === 0
    const dataXMax = noValues
      ? new Date().getTime()
      : max(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    const xMax = ceilingToPeriod(dataXMax, period, divisions)
    const xMin = xMax - timePeriods[period]
    const dx = (xMax - xMin) / divisions
    const aggregateData = noValues
      ? []
      : data.map(d => {
        return {
          ...d,
          values: computeAggregate({ xMin, xMax, divisions, data: d.values })
        }
      })

    const xInfoFormatter = (timestamp) => {
      const from = format(utcToZonedTime(new Date(timestamp - dx / 2), timeZone), pattern, { timeZone: timeZone })
      const to = format(utcToZonedTime(new Date(timestamp + dx / 2), timeZone), pattern, { timeZone: timeZone })
      return `${from}-${to}`
    }
    return <Graph
      {...{ width, height, data: aggregateData, title, xLabel, palette, onHover }}
      computeXLayout={() => computeTimeLayout(xMax, period, localOrUTC)}
      renderXAxis={(props) => <TimeXAxis {...props} timeZone={timeZone} />}
      renderValues={(props) => <ContinuousBarValues {...props} {... { dx, xInfoFormatter }} />}
    >
      <text style={{ textAnchor: 'end' }} x={width - 64} y={30} >[{timeZone}]</text>
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
