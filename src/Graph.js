import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { max } from 'lodash'

import ScalarYAxis from './ScalarYAxis'
import ScalarValues from './ScalarValues'
import Legend from './Legend'
import computeScalarLayout from './computeScalarLayout'
import minmax from './minmax'
import colors from './colors10'

class Graph extends Component {
  render () {
    const { width, height, data, title, colorOffset, computeXLayout, renderXAxis, xInfoFormatter } = this.props
    // There's one set of x values
    const [yMin, yMax] = minmax(data.y.map(y => y.values))
    const contentsWidth = width - 128
    const contentsHeight = height - 96
    const xLayout = computeXLayout(contentsWidth)
    const yLayout = computeScalarLayout('y', [yMin, yMax], contentsHeight)
    const maxLegendLength = max(data.y.map(y => y.label.length))
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
          {renderXAxis({
            width: contentsWidth,
            layout: xLayout,
            label: data.x.label
          })}
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
            xInfoFormatter={xInfoFormatter}
          />
        </g>
        <g transform='translate(64, 48)'>
          <Legend data={data} maxLegendLength={maxLegendLength} palette={palette} />
        </g>
      </g>
    </svg>
  }
}

Graph.propTypes = {
  width: PropTypes.number.isRequired,
  colorOffset: PropTypes.number,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  computeXLayout: PropTypes.func.isRequired,
  renderXAxis: PropTypes.func.isRequired,
  xInfoFormatter: PropTypes.func.isRequired
}

Graph.defaultProps = {
  xInfoFormatter: x => `${x}`
}

export default Graph
