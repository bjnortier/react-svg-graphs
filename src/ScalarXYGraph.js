import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max } from 'lodash'

import ScalarXAxis from './axes/x/ScalarXAxis'
import ScalarYAxis from './axes/y/ScalarYAxis'
import ScalarValues from './values/ScalarValues'
import { getScalarXAxisLayout, getScalarYAxisLayout } from './axes/layout'

class ScalarXYGraph extends Component {
  render () {
    const { width, height, padding, data } = this.props
    const [xValues, yValues] = [data.map(d => d.x), data.map(d => d.y)]
    const [xMin, xMax] = [min(xValues), max(xValues)]
    const [yMin, yMax] = [min(yValues), max(yValues)]
    const contentsWidth = width - padding * 2
    const contentsHeight = height - padding * 2
    const xLayout = getScalarXAxisLayout([xMin, xMax], contentsWidth)
    const yLayout = getScalarYAxisLayout([yMin, yMax], contentsHeight)
    const layout = {x: xLayout, y: yLayout}
    // The entire graph is offset by 0.5,0.5 pixesl to get crisp single
    // pixel lines
    // https://kilianvalkhof.com/2010/design/the-problem-with-svg-and-canvas/
    return <svg width={width} height={height}>
      <g transform='translate(0.5, 0.5)'>
        <g transform={`translate(${padding}, ${height - padding})`}>
          <ScalarXAxis
            width={width - padding * 2}
            height={padding}
            layout={xLayout}
          />
        </g>
        <g transform={`translate(0, ${padding})`}>
          <ScalarYAxis
            width={padding}
            height={contentsHeight}
            layout={yLayout}
          />
        </g>
        <g transform={`translate(${padding}, ${padding})`}>
          <ScalarValues
            width={contentsWidth}
            height={contentsHeight}
            layout={layout}
            color={'#463ecc'}
            data={data}
          />
        </g>
      </g>
    </svg>
  }
}

ScalarXYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
}

export default ScalarXYGraph
