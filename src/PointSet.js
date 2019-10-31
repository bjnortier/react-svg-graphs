import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

class PointSet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverPoint: null
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter (hoverPoint) {
    this.setState({ hoverPoint }, () => {
      if (this.props.onHoverPoint) {
        this.props.onHoverPoint(hoverPoint)
      }
    })
  }

  handleMouseLeave () {
    this.setState({ hoverPoint: null }, () => {
      if (this.props.onHoverPoint) {
        this.props.onHoverPoint(null)
      }
    })
  }

  render () {
    const { width, height, values, layout, color, highlightIndex } = this.props
    const { hoverPoint } = this.state
    const xMin = layout.x.min
    const xMax = layout.x.max
    const yMin = layout.y.min
    const yMax = layout.y.max

    const r1 = 1.5
    const r2 = 3
    const r3 = 5
    const points = []
    for (let i = 0; i < values.length; ++i) {
      const { x, y } = values[i]
      if (y === null || y === undefined) {
        continue
      }
      points.push({
        xPos: ((x - xMin) / (xMax - xMin)) * width,
        yPos: height - ((y - yMin) / (yMax - yMin)) * height,
        xValue: x,
        yValue: y,
        xIndex: i,
        color
      })
    }

    // Clipping: We clip the lines to the graph contents rectangle,
    // but allow circles on the peripheries
    const clipId = v4()
    return (
      <>
        <clipPath id={clipId}>
          <rect x='0px' y='0' width={width} height={height} />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          {points.map((to, i) => {
            if (i > 0) {
              const from = points[i - 1]
              return (
                <line
                  key={`${i - 1}_${i}`}
                  stroke={color}
                  x1={from.xPos}
                  x2={to.xPos}
                  y1={from.yPos}
                  y2={to.yPos}
                />
              )
            } else {
              return null
            }
          })}
        </g>
        {points.map((p, i) =>
          p.xPos >= 0 && p.xPos <= width && p.yPos >= 0 && p.yPos <= height ? (
            <g key={i} transform={`translate(${p.xPos},${p.yPos})`}>
              <circle stroke='none' fill={color} r={r2} />
              <circle stroke='none' fill='white' r={r1} />
            </g>
          ) : null
        )}
        {hoverPoint ? (
          <g transform={`translate(${hoverPoint.xPos},${hoverPoint.yPos})`}>
            <circle stroke='none' fill={color} r={r2} />
          </g>
        ) : null}
        {highlightIndex !== null ? (
          <g
            transform={`translate(${points[highlightIndex].xPos},${
              points[highlightIndex].yPos
            })`}
          >
            <circle stroke='none' fill={color} r={r2} />
          </g>
        ) : null}
        {points.map((p, i) =>
          p.xPos >= 0 && p.xPos <= width && p.yPos >= 0 && p.yPos <= height ? (
            <g key={i} transform={`translate(${p.xPos},${p.yPos})`}>
              <circle
                stroke='none'
                fill='transparent'
                r={r3}
                onMouseEnter={() => this.handleMouseEnter(p)}
                onMouseLeave={() => this.handleMouseLeave(p)}
              />
            </g>
          ) : null
        )}
      </>
    )
  }
}

PointSet.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  onHoverPoint: PropTypes.func,
  highlightIndex: PropTypes.number
}

PointSet.defaultProps = {
  showPoints: true,
  highlightIndex: null
}

export default PointSet
