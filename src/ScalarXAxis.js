import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { round10 } from 'round10'

class ScalarXAxis extends Component {
  render () {
    const { width, layout, label } = this.props
    const { min, max, order, tickSize } = layout
    const ticks = []
    for (
      let tickValue = min;
      tickValue <= max;
      tickValue = round10(tickValue + tickSize, order - 1)
    ) {
      let label
      if (order > 3 || order < -2) {
        label = tickValue.toExponential()
      } else {
        label = round10(tickValue, order - 1)
      }
      const dx = ((tickValue - min) / (max - min)) * width
      ticks.push({ dx, label: label })
    }

    return (
      <g style={{ textAnchor: 'middle' }}>
        <text x={width / 2} y={36}>
          {label}
        </text>
        {ticks.map((tick, i) => (
          <g key={i} transform={`translate(${tick.dx}, 0)`}>
            <line stroke='#ccc' x1={0} x2={0} y1={0} y2={8} />
            <text transform='translate(0, 22)'>{tick.label}</text>
          </g>
        ))}
      </g>
    )
  }
}

ScalarXAxis.propTypes = {
  width: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default ScalarXAxis
