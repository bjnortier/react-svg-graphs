import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max, flatten } from 'lodash'

import computeScalarLayout from './computeScalarLayout'
import ScalarXAxis from './ScalarXAxis'
import ScalarValues from './ScalarValues'
import Graph from './Graph2'
import timePeriods from './timePeriods'

class ScalarXScalarYGraph extends Component {
  render () {
    const { width, height, data, title, xLabel, palette } = this.props
    const dataXMax = max(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    const dataXMin = min(flatten(data.map(dataset => dataset.values.map(v => v.x))))
    return <Graph
      {...{ width, height, data, title, xLabel, palette }}
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
  localOrUTC: PropTypes.oneOf(['local', 'utc'])
}

export default ScalarXScalarYGraph
