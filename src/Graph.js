import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max, flatten } from 'lodash'

import Legend from './Legend'
import ScalarYAxis from './ScalarYAxis'
import computeScalarLayout from './util/computeScalarLayout'
import colors10 from './util/colors10'

class Graph extends Component {
  render () {
    const { width, height, data, title, xLabel, computeXLayout,
      renderXAxis, renderValues, palette, xInfoFormatter, onHover } = this.props
    const yMin = min(flatten(data.map(d => d.values.map(d => d.y))))
    const yMax = max(flatten(data.map(d => d.values.map(d => d.y))))
    const contentsWidth = width - 128
    const contentsHeight = height - 96
    const xLayout = computeXLayout(contentsWidth)
    const yLayout = computeScalarLayout('y', [yMin, yMax], contentsHeight)
    const maxLegendLength = max(data.map(dataSet => dataSet.label.length))

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
        <rect
          stroke='#ddd' fill='none' x='64' y='48'
          width={contentsWidth} height={contentsHeight}
        />
        {data.length
          ? <>
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
              {data.map((dataset, i) => renderValues({
                key: i,
                width: contentsWidth,
                height: contentsHeight,
                stroke: palette[i % palette.length],
                fill: `${palette[i % palette.length]}11`,
                values: dataset.values,
                layout: { x: xLayout, y: yLayout },
                xInfoFormatter,
                onHover: onHover
                  ? hoverInfo => onHover({ ...hoverInfo, yIndex: i })
                  : null
              }))}
            </g>
            <g transform='translate(64, 48)'>
              <Legend data={data} maxLegendLength={maxLegendLength} palette={palette} />
            </g>
            {this.props.children}
          </>
          : null}
      </g>
    </svg>
  }
}

Graph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  computeXLayout: PropTypes.func.isRequired,
  renderXAxis: PropTypes.func.isRequired,
  renderValues: PropTypes.func.isRequired,
  palette: PropTypes.array.isRequired,
  xInfoFormatter: PropTypes.func.isRequired,
  onHover: PropTypes.func
}

Graph.defaultProps = {
  xInfoFormatter: x => `${x}`,
  palette: colors10
}

export default Graph
