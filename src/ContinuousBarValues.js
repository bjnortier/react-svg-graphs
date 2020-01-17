import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box2 } from 'vecks'

class ContinuousBarValues extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverIndex: null
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleMouseEnter (index) {
    const { onHover } = this.props
    const hoverIndex = index
    this.setState({ hoverIndex }, () => {
      if (onHover) {
        onHover(hoverIndex)
      }
    })
  }

  handleMouseLeave () {
    const { onHover } = this.props
    this.setState({ hoverIndex: null }, () => {
      if (onHover) {
        onHover(null)
      }
    })
  }

  handleMouseUp () {
    const { onSelect } = this.props
    const { hoverIndex } = this.state
    if (onSelect) {
      onSelect(hoverIndex)
    }
  }

  render () {
    const { width, height, color, values, dx, layout } = this.props
    const stroke = color
    const fill = color

    const bounds = new Box2()
      .expandByPoint({ x: layout.x.min, y: layout.y.min })
      .expandByPoint({ x: layout.x.max, y: layout.y.max })

    const mapXToCanvas = x => ((x - layout.x.min) / bounds.width) * width
    const mapYToCanvas = y =>
      height - ((y - bounds.min.y) / bounds.height) * height
    const strokePolyline = []
    const hoverPoints = []
    strokePolyline.push({
      x: mapXToCanvas(values[0].x - dx / 2),
      y: mapYToCanvas(Math.max(layout.y.min, 0))
    })
    for (let i = 0; i < values.length; ++i) {
      const datum = values[i]
      strokePolyline.push({
        x: mapXToCanvas(datum.x - dx / 2),
        y: mapYToCanvas(datum.y)
      })
      strokePolyline.push({
        x: mapXToCanvas(datum.x + dx / 2),
        y: mapYToCanvas(datum.y)
      })
      hoverPoints.push({
        x: mapXToCanvas(datum.x),
        y: mapYToCanvas(datum.y)
      })
    }
    strokePolyline.push({
      x: mapXToCanvas(values[values.length - 1].x + dx / 2),
      y: mapYToCanvas(Math.max(layout.y.min, 0))
    })

    const bars = values.map(({ x, y }) => ({
      x: mapXToCanvas(x - dx / 2) - 0.5,
      y: Math.min(mapYToCanvas(Math.max(layout.y.min, 0)), mapYToCanvas(y)),
      width: mapXToCanvas(x + dx / 2) - mapXToCanvas(x - dx / 2) + 1,
      height: Math.abs(
        mapYToCanvas(y) - mapYToCanvas(Math.max(layout.y.min, 0))
      )
    }))

    const strokePoints = strokePolyline.map(({ x, y }) => `${x},${y}`).join(' ')
    return (
      <g>
        <g opacity='0.15'>
          {bars.map(({ x, y, width, height }, i) => (
            <rect
              key={i}
              fill={fill}
              x={x}
              y={y}
              width={width}
              height={height}
              onMouseEnter={() => this.handleMouseEnter(i)}
              onMouseLeave={() => this.handleMouseLeave(i)}
              onMouseUp={() => this.handleMouseUp(i)}
            />
          ))}
        </g>
        <polyline stroke={stroke} fill='none' points={strokePoints} />
      </g>
    )
  }
}

ContinuousBarValues.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  dx: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onHover: PropTypes.func,
  onSelect: PropTypes.func
}

export default ContinuousBarValues
