import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max, flatten } from 'lodash'

import computeScalarLayout from './util/computeScalarLayout'
import ScalarXAxis from './ScalarXAxis'
import ScalarValues from './ScalarValues'
import Graph from './Graph'
import timePeriods from './util/timePeriods'

class ScalarXScalarYGraph extends Component {
  render () {
    const { width, height, data, title, xLabel, palette, onHover } = this.props
    const dataXMax = max(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    const dataXMin = min(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    return <Graph
      {...{ width, height, data, title, xLabel, palette, onHover }}
      computeXLayout={contentsWidth => computeScalarLayout('x', [dataXMin, dataXMax], contentsWidth)}
      renderXAxis={(props) => <ScalarXAxis {...props} />}
      renderValues={(props) => <ScalarValues {...props} />}
    />
  }
}

ScalarXScalarYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  xLabel: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  period: PropTypes.oneOf(Object.keys(timePeriods)),
  localOrUTC: PropTypes.oneOf(['local', 'utc']),
  onHover: PropTypes.func
}

export default ScalarXScalarYGraph
