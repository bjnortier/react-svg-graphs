import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { max } from 'lodash'

import ScalarXAxis from './ScalarXAxis'
import ScalarYAxis from './ScalarYAxis'
import ScalarValues from './ScalarValues'
import getLayout from './getLayout'
import minmax from './minmax'
import colors from './colors10'

class ScalarXYGraph extends Component {
  render () {
    const { width, height, padding, data, title, colorOffset } = this.props
    // There's one set of x values
    const [xMin, xMax] = minmax(data.x)
    const [yMin, yMax] = minmax(data.y)
    const contentsWidth = width - padding * 2
    const contentsHeight = height - padding * 2
    const xLayout = getLayout('x', [xMin, xMax], contentsWidth)
    const yLayout = getLayout('y', [yMin, yMax], contentsHeight)
    const layout = { x: xLayout, y: yLayout }
    const maxYLabelLength = max(data.y.map(y => y.label.length))
    let palette = colors.slice(0)
    if (colorOffset) {
      for (let i = 0; i < colorOffset; ++i) {
        const c = palette.shift()
        palette.push(c)
      }
    }

    // The entire graph is offset by 0.5,0.5 pixesl to get crisp single
    // pixel lines
    // https://kilianvalkhof.com/2010/design/the-problem-with-svg-and-canvas/
    return <svg width={width} height={height}>
      <g transform='translate(0.5, 0.5)'>
        <text style={{ textAnchor: 'middle' }} x={padding + contentsWidth / 2} y={padding / 2 + 10} >
          {title}
        </text>
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
            palette={palette}
            data={data}
          />
        </g>
        <g transform={`translate(${padding}, ${padding})`}>
          <rect x={0} y={0} width={20 + maxYLabelLength * 7.5 + 10} height={data.y.length * 20} fill='#fff' stroke='#ddd' fillOpacity={0.5} />
          {data.y.map((y, i) => {
            const paletteIndex = i % 10
            const r1 = 1.5
            const r2 = 3
            return <g key={i} transform={`translate(0, ${i * 20})`}>
              <line stroke={palette[paletteIndex]} x1={3} x2={17} y1={10} y2={10} />
              <g transform={`translate(10, 10)`}>
                <circle stroke='none' x={5} y={5} fill={palette[paletteIndex]} r={r2} />
                <circle stroke='none' fill='white' r={r1} />
              </g>
              <text style={{ textAnchor: 'left' }} x={20} y={14} >
                {y.label}
              </text>
            </g>
          })}
        </g>
      </g>
    </svg>
  }
}

ScalarXYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  colorOffset: PropTypes.number,
  height: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired
}

export default ScalarXYGraph
