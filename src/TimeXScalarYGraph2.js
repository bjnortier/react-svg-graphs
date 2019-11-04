import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { max, flatten } from 'lodash'
import { format } from 'date-fns-tz'

import TimeXAxis2 from './TimeXAxis2'
import ScalarValues2 from './ScalarValues2'
import Graph2 from './Graph2'
import computeTimeLayout2 from './util/computeTimeLayout2'
import timePeriods from './util/timePeriods'
import timeFormatForPeriod2 from './util/timeFormatForPeriod2'

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
      onHover,
      onSelect,
      hoverPath,
      selectedPath
    } = this.props
    const dataXMax = max(
      flatten(data.map(dataset => dataset.values.map(v => v.x)))
    )
    const pattern = timeFormatForPeriod2(period)
    const xValueFormatter = timestamp => {
      return format(new Date(timestamp), pattern, {
        timeZone: 'UTC'
      })
    }
    return (
      <Graph2
        {...{
          width,
          height,
          data,
          title,
          xLabel,
          palette,
          onHover,
          onSelect,
          hoverPath,
          selectedPath,
          xValueFormatter
        }}
        computeXLayout={() => computeTimeLayout2(new Date(dataXMax), period)}
        renderXAxis={props => <TimeXAxis2 {...props} />}
        renderValues={props => (
          <ScalarValues2 {...props} />
        )}
      >
        <text style={{ textAnchor: 'end' }} x={width - 64} y={30}>
          [UTC]
        </text>
      </Graph2>
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
  onHover: PropTypes.func,
  onSelect: PropTypes.func,
  hoverPath: PropTypes.object,
  selectedPath: PropTypes.object
}

export default TimeXScalarYGraph2
