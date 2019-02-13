import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tz from 'timezone/loaded'
import jstz from 'jstz'

import TimeXAxis from './TimeXAxis'
import Graph from './Graph'
import computeTimeLayout from './computeTimeLayout'
import minmax from './minmax'

class TimeXScalarYGraph extends Component {
  render () {
    const { localOrUTC, width, data, periodLabel } = this.props
    const xMax = minmax(data.x.values)[1]
    const timezone = localOrUTC === 'local' ? jstz.determine().name() : 'UTC'
    return <Graph
      {...this.props}
      computeXLayout={() => computeTimeLayout(xMax, periodLabel, localOrUTC)}
      renderXAxis={(props) => <TimeXAxis {...props} timezone={timezone} />}
      xInfoFormatter={(timestamp) => `${tz(new Date(timestamp), '%Y/%m/%d %H:%M:%S', 'en_GB', timezone)}`}
    >
      <text style={{ textAnchor: 'end' }} x={width - 64} y={30} >[{timezone}]</text>
    </Graph>
  }
}

TimeXScalarYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  colorOffset: PropTypes.number,
  colors: PropTypes.array,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  periodLabel: PropTypes.string.isRequired,
  localOrUTC: PropTypes.oneOf(['local', 'utc'])
}

TimeXAxis.defaultProps = {
  localOrUTC: 'local'
}

export default TimeXScalarYGraph
