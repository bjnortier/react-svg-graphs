import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { max } from 'lodash'

import TimeXAxis from './TimeXAxis'
import ScalarYAxis from './ScalarYAxis'
import ScalarValues from './ScalarValues'
import computeTimeLayout from './computeTimeLayout'
import computeScalarLayout from './computeScalarLayout'
import minmax from './minmax'
import colors from './colors10'

class TimeXScalarYGraph extends Component {
  render () {
    const { width, height, data, title, colorOffset, periodLabel } = this.props
    // There's one set of x values
    const xMax = minmax(data.x.values)[1]
    const [yMin, yMax] = minmax(data.y.map(y => y.values))
    const contentsWidth = width - 80
    const contentsHeight = height - 96
    const xLayout = computeTimeLayout(xMax, periodLabel)
    const yLayout = computeScalarLayout('y', [yMin, yMax], contentsHeight)
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
        <g transform={`translate(${64}, ${height - 48})`}>
          <TimeXAxis
            width={width - 80}
            layout={xLayout}
            label={data.x.label}
          />
        </g>
        <g transform='translate(16, 48)'>
          <ScalarYAxis
            height={height - 96}
            layout={yLayout}
          />
        </g>
        <g transform='translate(64, 48)'>
          <ScalarValues
            width={contentsWidth}
            height={contentsHeight}
            layout={{ x: xLayout, y: yLayout }}
            palette={palette}
            data={data}
          />
        </g>
        <g transform='translate(64, 48)'>
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

TimeXScalarYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  colorOffset: PropTypes.number,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  periodLabel: PropTypes.string.isRequired
}

export default TimeXScalarYGraph
