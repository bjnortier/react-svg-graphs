import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import { round10 } from 'round10'

class ScalarXAxis extends Component {
  render () {
    const { width, layout } = this.props
    const { min, max, order, tickSize } = layout
    const ticks = []
    for (let tickValue = min; tickValue <= max; tickValue = round10(tickValue + tickSize, order - 1)) {
      let label
      if ((order > 3) || (order < -2)) {
        label = tickValue.toExponential()
      } else {
        label = round10(tickValue, order - 1)
      }
      const dx = (tickValue - min) / (max - min) * width
      ticks.push({dx, label: label})
    }

    // <clipPath id={clipId}>
    //   <rect x='0px' y={-10} width={width} height={height + 20} />
    // </clipPath>
    const clipId = v4()
    return <g transform='translate(25, 20)'>
      <g style={{textAnchor: 'middle'}} clipPath={`url(#${clipId})`}>
        {ticks.map((tick, i) =>
          <g key={i} transform={`translate(${tick.dx}, 0)`}>
            <line stroke='#ddd' x1={0} x2={0} y1={0} y2={10} />
            <text transform='translate(0, 25)' fill='#444' >
              {tick.label}
            </text>
          </g>
        )}
      </g>
    </g>
  }
}

ScalarXAxis.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired
}

export default ScalarXAxis
