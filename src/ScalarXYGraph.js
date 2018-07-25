import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ScalarXAxis from './ScalarXAxis'
import ScalarYAxis from './ScalarYAxis'
import ScalarValues from './ScalarValues'
import getLayout from './getLayout'
import minmax from './minmax'
import colors from './colors10'

class ScalarXYGraph extends Component {
  render () {
    const { width, height, padding, data, title } = this.props
    // There's one set of x values
    const [xMin, xMax] = minmax(data.x)
    const [yMin, yMax] = minmax(data.y)
    const contentsWidth = width - padding * 2
    const contentsHeight = height - padding * 2
    const xLayout = getLayout('x', [xMin, xMax], contentsWidth)
    const yLayout = getLayout('y', [yMin, yMax], contentsHeight)
    const layout = {x: xLayout, y: yLayout}
    // The entire graph is offset by 0.5,0.5 pixesl to get crisp single
    // pixel lines
    // https://kilianvalkhof.com/2010/design/the-problem-with-svg-and-canvas/
    return <svg width={width} height={height}>
      <g transform='translate(0.5, 0.5)'>
        <text style={{textAnchor: 'middle'}} x={padding + contentsWidth / 2} y={padding / 2 + 10} >
          {title}
        </text>
        {data.y.map((y, i) => {
          const r1 = 1.5
          const r2 = 3
          return <g key={i} transform={`translate(${padding}, ${padding + i * 20})`}>
            <line stroke={colors[i]} x1={3} x2={17} y1={10} y2={10} />
            <g transform={`translate(10, 10)`}>
              <circle stroke='none' x={5} y={5} fill={colors[i]} r={r2} />
              <circle stroke='none' fill='white' r={r1} />
            </g>
            <text style={{textAnchor: 'left'}} x={20} y={14} >
              {y.label}
            </text>
          </g>
        })}
        <g transform={`translate(${padding}, ${height - padding})`}>
          <ScalarXAxis
            width={width - padding * 2}
            height={padding}
            layout={xLayout}
            label={data.x.label}
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
            colors={colors}
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
  data: PropTypes.object.isRequired
}

export default ScalarXYGraph
