import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

class PointSet extends Component {
  render () {
    const { width, height, data, layout, color, highlightIndex } = this.props
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

    // Clipping: We clip the lines to the graph contents rectangle,
    // but allow circles on the peripheries
    const clipId = v4()
    return <>
      <clipPath id={clipId}>
        <rect x='0px' y='0' width={width} height={height} />
      </clipPath>
      <g
        clipPath={`url(#${clipId})`}
      >
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
      </g>
      {points.map((p, i) => (p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height)
        ? <g key={i} transform={`translate(${p.x},${p.y})`}>
          <circle stroke='none' fill={color} r={r2} />
          <circle stroke='none' fill='white' r={r1} />
        </g> : null)}
      {highlightIndex === undefined || highlightIndex === null
        ? null
        : <g transform={`translate(${points[highlightIndex].x},${points[highlightIndex].y})`}>
          <circle stroke='none' fill={color} r={r2} />
        </g>}
    </>
  }
}

PointSet.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  highlightIndex: PropTypes.number
}

PointSet.defaultProps = {
  showPoints: true
}

export default PointSet
