import React, { Component } from 'react'
import PropTypes from 'prop-types'
import jstz from 'jstz'
import { max, flatten } from 'lodash'
import { format, utcToZonedTime } from 'date-fns-tz'

import TimeXAxis from './TimeXAxis'
import ScalarValues from './ScalarValues'
import Graph from './Graph'
import computeTimeLayout from './util/computeTimeLayout'
import timePeriods from './util/timePeriods'
import timeFormatForPeriod from './util/timeFormatForPeriod'

class TimeXScalarYGraph extends Component {
  render () {
    const {
      width,
      height,
      data,
      period,
      title,
      xLabel,
      localOrUTC,
      palette,
      onHover
    } = this.props
    const dataXMax = max(
      flatten(data.map(dataset => dataset.values.map(v => v.x)))
    )
    const timeZone = localOrUTC === 'local' ? jstz.determine().name() : 'UTC'
    const pattern = timeFormatForPeriod(period)
    const xInfoFormatter = timestamp => {
      return format(utcToZonedTime(new Date(timestamp), timeZone), pattern, {
        timeZone
      })
    }
    return (
      <Graph
        {...{ width, height, data, title, xLabel, palette, onHover }}
        computeXLayout={() => computeTimeLayout(dataXMax, period, localOrUTC)}
        renderXAxis={props => <TimeXAxis {...props} timeZone={timeZone} />}
        renderValues={props => (
          <ScalarValues {...props} {...{ xInfoFormatter }} />
        )}
      >
        <text style={{ textAnchor: 'end' }} x={width - 64} y={30}>
          [{timeZone}]
        </text>
      </Graph>
    )
  }
}

TimeXScalarYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  period: PropTypes.oneOf(Object.keys(timePeriods)),
  localOrUTC: PropTypes.oneOf(['local', 'utc']),
  onHover: PropTypes.func
}

TimeXAxis.defaultProps = {
  localOrUTC: 'local'
}

export default TimeXScalarYGraph
