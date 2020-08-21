import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { max, flatten } from 'lodash'
import { format, utcToZonedTime } from 'date-fns-tz'

import TimeXAxis from './TimeXAxis'
import ScalarValues from './ScalarValues'
import Graph from './Graph'
import computeTimeLayout from './util/computeTimeLayout'

class TimeXScalarYGraph extends Component {
  render () {
    const {
      width,
      height,
      data,
      period,
      pinToCurrentTime,
      title,
      xLabel,
      palette,
      onHover,
      onSelect,
      hoverPath,
      selectedPath,
      fill
    } = this.props
    const dataXMax = pinToCurrentTime
      ? new Date().getTime()
      : max(
        flatten(data.map(dataset => dataset.values.map(v => v.x)))
      )
    const xValueFormatter = date => {
      return format(utcToZonedTime(date, 'UTC'), 'y/M/d HH:mm', { timeZone: 'UTC' })
    }
    return (
      <Graph
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
          xValueFormatter,
          fill,
          hoverSelectStyle: 'circle',
          legendType: 'point'
        }}
        computeXLayout={() => computeTimeLayout(new Date(dataXMax), period)}
        renderXAxis={props => <TimeXAxis {...props} />}
        renderValues={props => <ScalarValues {...props} />}
      >
        <text style={{ textAnchor: 'end' }} x={width - 64} y={30}>
          [UTC]
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
  pinToCurrentTime: PropTypes.bool.isRequired,
  palette: PropTypes.array,
  fill: PropTypes.string,
  period: PropTypes.string.isRequired,
  onHover: PropTypes.func,
  onSelect: PropTypes.func,
  hoverPath: PropTypes.object,
  selectedPath: PropTypes.object
}

TimeXScalarYGraph.defaultProps = {
  pinToCurrentTime: false
}
export default TimeXScalarYGraph
