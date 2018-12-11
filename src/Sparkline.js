import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PointSet from './PointSet'
import minmax from './minmax'

class Sparkline extends Component {
  render () {
    const { width, height, data, color } = this.props
    const [xMin, xMax] = minmax(data.x)
    const [yMin, yMax] = minmax(data.y)
    // One pixel of margin at the top, right & bottom
    // as the last highlighted point will always be on the right
    const contentsWidth = width - 2
    const contentsHeight = height - 3
    const layout = { x: { min: xMin, max: xMax }, y: { min: yMin, max: yMax } }

    // The entire graph is offset by 0.5,0.5 pixesl to get crisp single
    // pixel lines
    // https://kilianvalkhof.com/2010/design/the-problem-with-svg-and-canvas/
    return <svg width={width} height={height}>
      <g transform='translate(0.5, 1.5)'>
        <PointSet
          width={contentsWidth}
          height={contentsHeight}
          layout={layout}
          color={color}
          showPoints={false}
          highlightLast
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
  color: PropTypes.string.isRequired
}

export default Sparkline
