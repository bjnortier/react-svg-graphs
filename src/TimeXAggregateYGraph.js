import React, { Component } from 'react'
import PropTypes from 'prop-types'
import jstz from 'jstz'
import { max, flatten } from 'lodash'

import TimeXAxis from './TimeXAxis'
import ContinuousBarValues from './ContinuousBarValues'
import Graph from './Graph'
import computeTimeLayout from './computeTimeLayout'
import computeAggregate from './computeAggregate'
import ceilingToPeriod from './util/ceilingToPeriod'
import timePeriods from './timePeriods'

class TimeXAggregateYGraph extends Component {
  render () {
    const { localOrUTC, width, height, title, xLabel, data, period, divisions, palette } = this.props
    const dataXMax = max(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    const xMax = ceilingToPeriod(dataXMax, period)
    const xMin = xMax - timePeriods[period]
    const dx = (xMax - xMin) / divisions

    const aggregateData = data.map(d => {
      return {
        ...d,
        values: computeAggregate({ xMin, xMax, divisions, data: d.values })
      }
    })

    const timezone = localOrUTC === 'local' ? jstz.determine().name() : 'UTC'
    return <Graph
      {...{ width, height, data: aggregateData, title, xLabel, palette }}
      computeXLayout={() => computeTimeLayout(xMax, period, localOrUTC)}
      renderXAxis={(props) => <TimeXAxis {...props} timezone={timezone} />}
      renderValues={(props) => <ContinuousBarValues {...props} dx={dx} />}
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
  localOrUTC: PropTypes.oneOf(['local', 'utc'])
}

TimeXAxis.defaultProps = {
  localOrUTC: 'local'
}

export default TimeXAggregateYGraph
