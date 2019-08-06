import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box2 } from 'vecks'

import HoverInfo from './HoverInfo'

class ContinuousBarValues extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverIndex: null
    }
    this.handleHoverBar = this.handleHoverBar.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter (index, point) {
    this.setState({ hoverIndex: index, hoverPoint: point }, this.handleHoverBar)
  }

  handleMouseLeave () {
    this.setState({ hoverIndex: null, hoverPoint: null }, this.handleHoverBar)
  }

  handleHoverBar () {
    const { xInfoFormatter, values, stroke } = this.props
    const { hoverIndex, hoverPoint } = this.state
    if (hoverIndex !== null) {
      const xInfo = `${xInfoFormatter(values[hoverIndex].x)}:`
      const yInfo = `${values[hoverIndex].y}`
      const hoverInfo = {
        xPos: hoverPoint.x,
        yPos: hoverPoint.y,
        xInfo,
        yInfo,
        color: stroke,
        infoWidth: Math.round((xInfo.length + yInfo.length) * 7.3 + 8)
      }
      this.setState({ hoverInfo })
      if (this.props.onHover) {
        this.props.onHover(hoverInfo)
      }
    } else {
      this.setState({ hoverInfo: null })
    }
  }

  render () {
    const { width, height, stroke, fill, values, dx, layout } = this.props
    const { hoverIndex, hoverInfo } = this.state

    const bounds = new Box2()
      .expandByPoint({ x: layout.x.min, y: layout.y.min })
      .expandByPoint({ x: layout.x.max, y: layout.y.max })

    const mapXToCanvas = x => (x - layout.x.min) / bounds.width * width
    const mapYToCanvas = y => height - (y - bounds.min.y) / bounds.height * height
    const strokePolyline = []
    const hoverPoints = []
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

    const bars = values.map(({ x, y }) => ({
      x: mapXToCanvas(x - dx / 2),
      y: Math.min(mapYToCanvas(0), mapYToCanvas(y)),
      width: mapXToCanvas(x + dx / 2) - mapXToCanvas(x - dx / 2),
      height: Math.abs(mapYToCanvas(y) - mapYToCanvas(0))
    }))

    const strokePoints = strokePolyline.map(({ x, y }) => `${x},${y}`).join(' ')
    return <g>
      <polyline stroke={stroke} fill='none' points={strokePoints} />
      {bars.map(({ x, y, width, height }, i) => <rect
        key={i} fill={fill} x={x} y={y} width={width} height={height}
        onMouseEnter={() => this.handleMouseEnter(i, hoverPoints[i])}
        onMouseLeave={() => this.handleMouseLeave(i, hoverPoints[i])}
      />)}
      {hoverIndex !== null
        ? <g transform={`translate(${hoverPoints[hoverIndex].x},${hoverPoints[hoverIndex].y})`}>
          <circle stroke='none' fill={stroke} r={3} />
        </g> : null}
      {hoverInfo ? <HoverInfo {...{ width, height, hoverInfo }} /> : null}
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
