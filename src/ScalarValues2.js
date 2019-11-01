import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

class ScalarValues2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverInfo: null
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleMouseEnter (hoverPoint) {
    const { onHover } = this.props
    const hoverInfo = hoverPoint ? { ...hoverPoint } : null
    this.setState({ hoverInfo }, () => {
      if (onHover) {
        onHover(hoverInfo)
      }
    })
  }

  handleMouseLeave () {
    const { onHover } = this.props
    this.setState({ hoverInfo: null }, () => {
      if (onHover) {
        onHover(null)
      }
    })
  }

  handleMouseUp () {
    const { xInfoFormatter, onSelect } = this.props
    const { hoverInfo } = this.state
    const xInfo = `${xInfoFormatter(hoverInfo.xValue)}:`
    const yInfo = `${hoverInfo.yValue}`
    const selectedInfo = {
      ...hoverInfo,
      xInfo,
      yInfo,
      infoWidth: Math.round((xInfo.length + yInfo.length) * 7.3 + 8)
    }
    if (onSelect) {
      onSelect(selectedInfo)
    }
  }

  render () {
    const { width, height, values, layout, color } = this.props
    const xMin = layout.x.min
    const xMax = layout.x.max
    const yMin = layout.y.min
    const yMax = layout.y.max

    const innerPointR = 1.5
    const outerPointR = 3
    const hoverRadius = 10
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
      <g>
        <clipPath id={clipId}>
          <rect x='0px' y='0' width={width} height={height} />
        </clipPath>
        <g
          clipPath={`url(#${clipId})`}
        >
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
              <circle stroke='none' fill={color} r={outerPointR} />
              <circle stroke='none' fill='white' r={innerPointR} />
            </g>
          ) : null
        )}
        {points.map((p, i) =>
          p.xPos >= 0 && p.xPos <= width && p.yPos >= 0 && p.yPos <= height ? (
            <g key={i} transform={`translate(${p.xPos},${p.yPos})`}>
              <circle
                stroke='none'
                fill='transparent'
                r={hoverRadius}
                onMouseEnter={() => this.handleMouseEnter(p)}
                onMouseLeave={() => this.handleMouseLeave(p)}
                onMouseUp={() => this.handleMouseUp(p)}
              />
            </g>
          ) : null
        )}

      </g>
    )
  }
}

ScalarValues2.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  xInfoFormatter: PropTypes.func.isRequired,
  onHover: PropTypes.func,
  onSelect: PropTypes.func
}

export default ScalarValues2
