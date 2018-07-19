import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { round10 } from 'round10'

class ScalarYAxis extends Component {
  render () {
    const { width, height, layout } = this.props
    const { min, max, order, tickSize } = layout
    const ticks = []
    for (let tickValue = min; tickValue <= max; tickValue = round10(tickValue + tickSize, order - 1)) {
      let label
      if ((order > 3) || (order < -2)) {
        label = tickValue.toExponential()
      } else {
        label = round10(tickValue, order - 1)
      }
      const dy = height - (tickValue - min) / (max - min) * height
      ticks.push({dy, label: label})
    }

    return <g style={{textAnchor: 'end'}}>
      {ticks.map((tick, i) =>
        <g key={i} transform={`translate(0, ${tick.dy})`}>
          <line stroke='#ddd' x1={width - 10} x2={width} y1={0} y2={0} />
          <text transform={`translate(${width - 15}, 4)`} >
            {tick.label}
          </text>
        </g>
      )}
    </g>
  }
}

ScalarYAxis.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired
}

export default ScalarYAxis
