import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { max, flatten } from 'lodash'
import { format } from 'date-fns-tz'

import TimeXAxis2 from './TimeXAxis2'
import ScalarValues from './ScalarValues'
import Graph from './Graph'
import computeTimeLayout2 from './util/computeTimeLayout2'
import timePeriods from './util/timePeriods'
import timeFormatForPeriod from './util/timeFormatForPeriod'

class TimeXScalarYGraph2 extends Component {
  render () {
    const {
      width,
      height,
      data,
      period,
      title,
      xLabel,
      palette,
      onHover
    } = this.props
    const dataXMax = max(
      flatten(data.map(dataset => dataset.values.map(v => v.x)))
    )
    const pattern = timeFormatForPeriod(period)
    const xInfoFormatter = timestamp => {
      return format(new Date(timestamp), pattern, {
        timeZone: 'UTC'
      })
    }
    return (
      <Graph
        {...{ width, height, data, title, xLabel, palette, onHover }}
        computeXLayout={() => computeTimeLayout2(new Date(dataXMax), period)}
        renderXAxis={props => <TimeXAxis2 {...props} />}
        renderValues={props => (
          <ScalarValues {...props} {...{ xInfoFormatter }} />
        )}
      >
        <text style={{ textAnchor: 'end' }} x={width - 64} y={30}>
          [UTC]
        </text>
      </Graph>
    )
  }
}

TimeXScalarYGraph2.propTypes = {
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  palette: PropTypes.array,
  period: PropTypes.oneOf(Object.keys(timePeriods)),
  onHover: PropTypes.func
}

export default TimeXScalarYGraph2
