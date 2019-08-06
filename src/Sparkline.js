import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max } from 'lodash'

import PointSet from './PointSet'

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
    const { onHighlightIndex, values } = this.props
    const { xMin, xMax, contentsWidth } = this.state
    if (!values.length) {
      return
    }

    const mouseX = event.nativeEvent.offsetX
    const interpolatedXValue = ((mouseX - 3.5) / contentsWidth) * (xMax - xMin) + xMin
    const closest = values.reduce((closestSoFar, { x }, index) => {
      if (closestSoFar === null) {
        return {
          x,
          index
        }
      } else {
        if (Math.abs(interpolatedXValue - x) < Math.abs(interpolatedXValue - closestSoFar.x)) {
          return {
            x,
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
    const { values, width, height } = props
    let xMin, xMax, yMin, yMax
    if (values.length) {
      xMin = min(values.map(v => v.x))
      xMax = max(values.map(v => v.x))
      yMin = min(values.map(v => v.y))
      yMax = max(values.map(v => v.y))
    } else {
      xMin = 0; yMin = 0; yMin = 0; yMax = 0
    }

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
    const { width, height, values, stroke } = this.props
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
          color={stroke}
          values={values}
          highlightIndex={closest !== null ? closest.index : null}
        />
      </g>
    </svg>
  }
}

Sparkline.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  stroke: PropTypes.string.isRequired,
  onHighlightIndex: PropTypes.func
}

export default Sparkline
