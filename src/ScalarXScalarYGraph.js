import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max, flatten } from 'lodash'

import computeScalarLayout from './util/computeScalarLayout'
import ScalarXAxis from './ScalarXAxis'
import ScalarValues from './ScalarValues'
import Graph from './Graph'

class ScalarXScalarYGraph extends Component {
  render () {
    const {
      width,
      height,
      data,
      title,
      xLabel,
      palette,
      fill,
      onHover,
      onSelect,
      hoverPath,
      selectedPath
    } = this.props
    const dataXMax = max(
      flatten(data.map(dataset => dataset.values.map(v => v.x)))
    )
    const dataXMin = min(
      flatten(data.map(dataset => dataset.values.map(v => v.x)))
    )
    return (
      <Graph
        {...{
          width,
          height,
          data,
          title,
          xLabel,
          palette,
          fill,
          onHover,
          onSelect,
          hoverPath,
          selectedPath,
          hoverSelectStyle: 'circle',
          legendType: 'point'
        }}
        computeXLayout={contentsWidth =>
          computeScalarLayout('x', [dataXMin, dataXMax], contentsWidth)}
        renderXAxis={props => <ScalarXAxis {...props} />}
        renderValues={props => <ScalarValues {...props} />}
      />
    )
  }
}

ScalarXScalarYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  palette: PropTypes.array,
  fill: PropTypes.string,
  onHover: PropTypes.func,
  onSelect: PropTypes.func,
  hoverPath: PropTypes.object,
  selectedPath: PropTypes.object
}

export default ScalarXScalarYGraph
