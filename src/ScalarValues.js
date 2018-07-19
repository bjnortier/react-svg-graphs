import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PointSet extends Component {
  render () {
    const { width, height, data, layout, color } = this.props
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
      points.push({
        x: (x - xMin) / (xMax - xMin) * width,
        y: height - (y - yMin) / (yMax - yMin) * height
      })
    }
    return <React.Fragment>
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
    </React.Fragment>
  }
}

class ScalarValues extends Component {
  render () {
    const { width, height, data, layout, colors } = this.props
    return <g>
      <rect style={{stroke: '#ddd', fill: 'none'}} x='0px' y='0' width={width} height={height} />
      {data.y.map((yValueSet, i) => {
        return <PointSet
          key={i}
          width={width}
          height={height}
          layout={layout}
          color={colors[i]}
          data={{x: data.x.values, y: yValueSet.values}}
        />
      })}
    </g>
  }
}

ScalarValues.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  colors: PropTypes.array.isRequired
}

export default ScalarValues
