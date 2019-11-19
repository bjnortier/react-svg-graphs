import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max, flatten } from 'lodash'

import SelectedPath2 from './SelectedPath2'
import HoverPath2 from './HoverPath2'
import Legend from './Legend'
import ScalarYAxis from './ScalarYAxis'
import computeScalarLayout from './util/computeScalarLayout'
import colors10 from './util/colors10'

class Graph2 extends Component {
  handleHover (hoverPath) {
    const { onHover } = this.props
    if (onHover) {
      onHover(hoverPath)
    }
  }

  handleSelect (selectPath) {
    const { onSelect } = this.props
    if (onSelect) {
      onSelect(selectPath)
    }
  }

  render () {
    const {
      width,
      height,
      data,
      title,
      xLabel,
      computeXLayout,
      renderXAxis,
      renderValues,
      palette,
      hoverPath,
      selectedPath,
      xValueFormatter
    } = this.props

    const yMin = min(flatten(data.map(d => d.values.map(d => d.y))))
    const yMax = max(flatten(data.map(d => d.values.map(d => d.y))))
    const contentsWidth = width - 128
    const contentsHeight = height - 96
    const xLayout = computeXLayout(contentsWidth)
    const yLayout = computeScalarLayout('y', [yMin, yMax], contentsHeight)
    const maxLegendLength = max(data.map(dataSet => dataSet.label.length))
    const validData =
      !!data.length && data.reduce((acc, d) => acc + d.values.length, 0) > 0

    // The entire graph is offset by 0.5,0.5 pixesl to get crisp single
    // pixel lines
    // https://kilianvalkhof.com/2010/design/the-problem-with-svg-and-canvas/
    return (
      <svg
        style={{
          fontFamily: '"Roboto Mono"',
          fontSize: 12,
          fontWeight: 400
        }}
        width={width}
        height={height}
      >
        <g transform='translate(0.5, 0.5)'>
          <text
            style={{ textAnchor: 'middle' }}
            x={64 + contentsWidth / 2}
            y={30}
          >
            {title}
          </text>
          <rect
            stroke='#ddd'
            fill='none'
            x='64'
            y='48'
            width={contentsWidth}
            height={contentsHeight}
          />
          {validData ? (
            <>
              <g transform={`translate(64, ${height - 48})`}>
                {renderXAxis({
                  width: contentsWidth,
                  layout: xLayout,
                  label: xLabel
                })}
              </g>
              <g transform='translate(16, 48)'>
                <ScalarYAxis height={height - 96} layout={yLayout} />
              </g>
              <g transform='translate(64, 48)'>
                {data.map((dataset, i) =>
                  renderValues({
                    key: i,
                    width: contentsWidth,
                    height: contentsHeight,
                    color: palette[i % palette.length],
                    values: dataset.values,
                    layout: { x: xLayout, y: yLayout },
                    onHover: (valueIndex) => {
                      const hoverPath = valueIndex !== null
                        ? {
                          valueIndex,
                          datasetIndex: i
                        }
                        : null
                      this.handleHover(hoverPath)
                    },
                    onSelect: (valueIndex) => {
                      const selectPath = valueIndex !== null
                        ? {
                          valueIndex,
                          datasetIndex: i
                        }
                        : null
                      this.handleSelect(selectPath)
                    }
                  })
                )}
                {hoverPath
                  ? (
                    <HoverPath2 {...{
                      width: contentsWidth,
                      height: contentsHeight,
                      path: hoverPath,
                      xValue: data[hoverPath.datasetIndex].values[hoverPath.valueIndex].x,
                      yValue: data[hoverPath.datasetIndex].values[hoverPath.valueIndex].y,
                      layout: { x: xLayout, y: yLayout },
                      color: palette[hoverPath.datasetIndex % palette.length]
                    }}
                    />
                  )
                  : null}
                {selectedPath
                  ? (
                    <SelectedPath2 {...{
                      width: contentsWidth,
                      height: contentsHeight,
                      path: selectedPath,
                      xValue: data[selectedPath.datasetIndex].values[selectedPath.valueIndex].x,
                      yValue: data[selectedPath.datasetIndex].values[selectedPath.valueIndex].y,
                      layout: { x: xLayout, y: yLayout },
                      color: palette[selectedPath.datasetIndex % palette.length],
                      xValueFormatter
                    }}
                    />
                  )
                  : null}
              </g>
              <g transform='translate(64, 48)'>
                <Legend
                  data={data}
                  maxLegendLength={maxLegendLength}
                  palette={palette}
                />
              </g>
              {this.props.children}
            </>
          ) : this.props.children}
        </g>
      </svg>
    )
  }
}

Graph2.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  computeXLayout: PropTypes.func.isRequired,
  renderXAxis: PropTypes.func.isRequired,
  renderValues: PropTypes.func.isRequired,
  palette: PropTypes.array.isRequired,
  xValueFormatter: PropTypes.func.isRequired,
  onHover: PropTypes.func,
  onSelect: PropTypes.func,
  hoverPath: PropTypes.object,
  selectedPath: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

Graph2.defaultProps = {
  xInfoFormatter: x => `${x}`,
  palette: colors10
}

export default Graph2
