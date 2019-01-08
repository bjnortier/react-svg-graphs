import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PointSet from './PointSet'
import minmax from './minmax'

class Sparkline extends Component {
  constructor (props) {
    super(props)
    this.state = {
      closest: null
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter (event) {
    this.updateClosest(event)
  }

  handleMouseMove (event) {
    this.updateClosest(event)
  }

  updateClosest (event) {
    const { onHighlightIndex, data } = this.props
    const { xMin, xMax, contentsWidth } = this.state
    if (!data.x.length) {
      return
    }

    const mouseX = event.nativeEvent.offsetX
    const interpolatedXValue = ((mouseX - 3.5) / contentsWidth) * (xMax - xMin) + xMin
    const closest = data.x.reduce((closestSoFar, xValue, index) => {
      if (closestSoFar === null) {
        return {
          xValue,
          index
        }
      } else {
        if (Math.abs(interpolatedXValue - xValue) < Math.abs(interpolatedXValue - closestSoFar.xValue)) {
          return {
            xValue,
            index
          }
        } else {
          return closestSoFar
        }
      }
    }, null)
    this.setState({ closest }, () => {
      if (onHighlightIndex) {
        onHighlightIndex(closest.index)
      }
    })
  }

  handleMouseLeave () {
    const { onHighlightIndex } = this.props
    this.setState({ closest: null }, () => {
      if (onHighlightIndex) {
        onHighlightIndex(null)
      }
    })
  }

  static getDerivedStateFromProps (props, state) {
    const { data, width, height } = props
    let [xMin, xMax] = minmax(data.x)
    let [yMin, yMax] = minmax(data.y)
    if (xMin === xMax) {
      xMin = xMin - 1
      xMax = xMax + 1
    }
    if (yMin === yMax) {
      yMin = yMin - 1
      yMax = yMax + 1
    }
    // Add padding for the <circle/> elements
    const contentsWidth = width - 7
    const contentsHeight = height - 7
    return { xMin, xMax, yMin, yMax, contentsWidth, contentsHeight }
  }

  render () {
    const { width, height, data, color } = this.props
    const { xMin, xMax, yMin, yMax, contentsWidth, contentsHeight, closest } = this.state
    const layout = { x: { min: xMin, max: xMax }, y: { min: yMin, max: yMax } }

    // The entire graph is offset by 0.5,0.5 pixesl to get crisp single
    // pixel lines
    // https://kilianvalkhof.com/2010/design/the-problem-with-svg-and-canvas/
    return <svg
      width={width}
      height={height}
      onMouseEnter={this.handleMouseEnter}
      onMouseMove={this.handleMouseMove}
      onMouseLeave={this.handleMouseLeave}
    >
      <g transform='translate(3.5, 3.5)'>
        <PointSet
          width={contentsWidth}
          height={contentsHeight}
          layout={layout}
          color={color}
          highlightIndex={closest !== null ? closest.index : data.x.length ? data.x.length - 1 : null}
          data={data}
        />
      </g>
    </svg>
  }
}

Sparkline.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  onHighlightIndex: PropTypes.func
}

export default Sparkline
