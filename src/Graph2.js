import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box2 } from 'vecks'
import { max, flatten } from 'lodash'

import ScalarYAxis from './ScalarYAxis'
import ContinuousBarValues from './ContinuousBarValues'
import computeScalarLayout from './computeScalarLayout'
import colors10 from './colors10'

class Graph2 extends Component {
  render () {
    const { width, height, data, title, xLabel, computeXLayout, renderXAxis, dx, palette } = this.props
    const yMin = 0
    const yMax = max(flatten(data.map(d => d.values.map(d => d.y))))
    const contentsWidth = width - 128
    const contentsHeight = height - 96
    const xLayout = computeXLayout(contentsWidth)
    const yLayout = computeScalarLayout('y', [yMin, yMax], contentsHeight)

    // The entire graph is offset by 0.5,0.5 pixesl to get crisp single
    // pixel lines
    // https://kilianvalkhof.com/2010/design/the-problem-with-svg-and-canvas/
    return <svg
      style={{
        fontFamily: '"Roboto Mono"',
        fontSize: 12,
        fontWeight: 400
      }}
      width={width}
      height={height}>
      <g transform='translate(0.5, 0.5)'>
        <text style={{ textAnchor: 'middle' }} x={64 + contentsWidth / 2} y={30} >
          {title}
        </text>
        <g transform={`translate(64, ${height - 48})`}>
          {renderXAxis({
            width: contentsWidth,
            layout: xLayout,
            label: xLabel
          })}
        </g>
        <g transform='translate(16, 48)'>
          <ScalarYAxis
            height={height - 96}
            layout={yLayout}
          />
        </g>
        <g transform='translate(64, 48)'>
          {data.map((dataset, i) => <ContinuousBarValues
            key={i}
            width={contentsWidth}
            height={contentsHeight}
            stroke={palette[i]}
            fill={`${palette[i]}11`}
            data={dataset.values}
            layout={{ x: xLayout, y: yLayout }}
            dx={dx}
            palette={palette}
          />)}
        </g>
        {this.props.children}
      </g>
    </svg>
  }
}

Graph2.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  dx: PropTypes.number.isRequired,
  computeXLayout: PropTypes.func.isRequired,
  renderXAxis: PropTypes.func.isRequired,
  palette: PropTypes.array.isRequired
}

Graph2.defaultProps = {
  palette: colors10
}

export default Graph2
