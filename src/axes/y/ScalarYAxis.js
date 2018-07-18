import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
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

    // <clipPath id={clipId}>
    //   <rect x='0px' y={-10} width={width} height={height + 20} />
    // </clipPath>
    const clipId = v4()
    return <g transform='translate(0, 10)'>
      <g style={{textAnchor: 'end'}} clipPath={`url(#${clipId})`}>
        {ticks.map((tick, i) =>
          <g key={i} transform={`translate(55, ${tick.dy})`}>
            <line stroke='#ddd' x1={0} x2={width - 55} y1={0.5} y2={0.5} />
            <text transform='translate(-3, 4)' fill='#444' >
              {tick.label}
            </text>
          </g>
        )}
      </g>
    </g>
  }
}

ScalarYAxis.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired
}

export default ScalarYAxis
