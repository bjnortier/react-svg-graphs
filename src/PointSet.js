import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PointSet extends Component {
  render () {
    const { width, height, data, layout, color, showPoints, highlightLast } = this.props
    const xMin = layout.x.min
    const xMax = layout.x.max
    const yMin = layout.y.min
    const yMax = layout.y.max

    const r1 = 1.5
    const r2 = 3
    const points = []
    for (let i = 0; i < data.x.length; ++i) {
      const x = data.x[i]
      const y = data.y[i]
      if ((y === null) || (y === undefined)) {
        continue
      }
      points.push({
        x: (x - xMin) / (xMax - xMin) * width,
        y: height - (y - yMin) / (yMax - yMin) * height
      })
    }
    return <>
      { points.map((to, i) => {
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
      {showPoints
        ? points.map((p, i) => <g key={i} transform={`translate(${p.x},${p.y})`}>
          <circle stroke='none' fill={color} r={r2} />
          <circle stroke='none' fill='white' r={r1} />
        </g>)
        : null}
      {highlightLast
        ? <g transform={`translate(${points[points.length - 1].x},${points[points.length - 1].y})`}>
          <circle stroke='none' fill={color} r={r1} />
        </g>
        : null}
    </>
  }
}

PointSet.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  showPoints: PropTypes.bool.isRequired,
  highlightLast: PropTypes.bool.isRequired
}

PointSet.defaultProps = {
  showPoints: true,
  highlightLast: false
}

export default PointSet
