import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ScalarValues extends Component {
  render () {
    const { width, height, data, layout, color } = this.props
    const xMin = layout.x.min
    const xMax = layout.x.max
    const yMin = layout.y.min
    const yMax = layout.y.max
    const points = data.map(({x, y}) => {
      return {
        x: (x - xMin) / (xMax - xMin) * width,
        y: height - (y - yMin) / (yMax - yMin) * height
      }
    })
    const r1 = 1.5
    const r2 = 3
    return <g>
      <rect style={{stroke: '#ddd', fill: 'none'}} x='0px' y='0' width={width} height={height} />
      {points.map((to, i) => {
        if (i > 0) {
          const from = points[i - 1]
          return <line
            key={`${i - 1}_${i}`}
            stroke={color}
            x1={from.x}
            x2={to.x}
            y1={from.y}
            y2={to.y}
          />
        } else {
          return null
        }
      })}
      {points.map((p, i) => <g key={i} transform={`translate(${p.x},${p.y})`}>
        <circle stroke='none' fill={color} r={r2} />
        <circle stroke='none' fill='white' r={r1} />
      </g>)}
    </g>
  }
}

ScalarValues.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired
}

export default ScalarValues
