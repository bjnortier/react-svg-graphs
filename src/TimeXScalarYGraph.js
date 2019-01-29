import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TimeXAxis from './TimeXAxis'
import Graph from './Graph'
import computeTimeLayout from './computeTimeLayout'
import minmax from './minmax'

class TimeXScalarYGraph extends Component {
  render () {
    const { data, periodLabel } = this.props
    const xMax = minmax(data.x.values)[1]
    return <Graph
      {...this.props}
      computeXLayout={() => computeTimeLayout(xMax, periodLabel)}
      renderXAxis={(props) => <TimeXAxis {...props} />}
      xInfoFormatter={(timestamp) => `${new Date(timestamp).toLocaleString()}`}
    />
  }
}

TimeXScalarYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  colorOffset: PropTypes.number,
  colors: PropTypes.array,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  periodLabel: PropTypes.string.isRequired
}

export default TimeXScalarYGraph
