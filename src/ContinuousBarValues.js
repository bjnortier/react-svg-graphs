import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box2 } from 'vecks'

class ContinuousBarValues extends Component {
  render () {
    const { width, height, stroke, fill, values, dx, layout } = this.props

    const bounds = new Box2()
      .expandByPoint({ x: layout.x.min, y: layout.y.min })
      .expandByPoint({ x: layout.x.max, y: layout.y.max })

    const mapXToCanvas = x => (x - layout.x.min) / bounds.width * width
    const mapYToCanvas = y => height - (y - bounds.min.y) / bounds.height * height
    const strokePolyline = []
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
    }

    // The fill will have bounding lines on the left, right and bottom
    const fillPolyline = strokePolyline.slice()
    fillPolyline.push({
      x: mapXToCanvas(values[values.length - 1].x + dx / 2),
      y: mapYToCanvas(0)
    })
    fillPolyline.push({
      x: mapXToCanvas(values[0].x - dx / 2),
      y: mapYToCanvas(0)
    })
    fillPolyline.push({
      x: mapXToCanvas(values[0].x - dx / 2),
      y: mapYToCanvas(values[0].y)
    })

    const strokePoints = strokePolyline.map(({ x, y }) => `${x},${y}`).join(' ')
    const fillPoints = fillPolyline.map(({ x, y }) => `${x},${y}`).join(' ')
    return <g>
      <polyline stroke={stroke} fill='none' points={strokePoints} />
      <polyline stroke='none' fill={fill} points={fillPoints} />
    </g>
  }
}

ContinuousBarValues.propTypes = {
  values: PropTypes.array.isRequired,
  stroke: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  dx: PropTypes.number.isRequired
}

export default ContinuousBarValues
