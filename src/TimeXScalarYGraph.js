import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tz from 'timezone/loaded'
import jstz from 'jstz'
import { max, flatten } from 'lodash'

import TimeXAxis from './TimeXAxis'
import ScalarValues from './ScalarValues'
import Graph from './Graph'
import computeTimeLayout from './util/computeTimeLayout'
import timePeriods from './util/timePeriods'
import timeFormatForPeriod from './util/timeFormatForPeriod'

class TimeXScalarYGraph extends Component {
  render () {
    const { width, height, data, period, title, xLabel, localOrUTC, palette, onHover } = this.props
    const dataXMax = max(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    const timezone = localOrUTC === 'local' ? jstz.determine().name() : 'UTC'
    const format = timeFormatForPeriod(period)
    const xInfoFormatter = (timestamp) => `${tz(new Date(timestamp), format, 'en_GB', timezone)}`
    return <Graph
      {...{ width, height, data, title, xLabel, palette, onHover }}
      computeXLayout={() => computeTimeLayout(dataXMax, period, localOrUTC)}
      renderXAxis={(props) => <TimeXAxis {...props} timezone={timezone} />}
      renderValues={(props) => <ScalarValues {...props} {...{ xInfoFormatter }} />}
    >
      <text style={{ textAnchor: 'end' }} x={width - 64} y={30} >[{timezone}]</text>
    </Graph>
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
