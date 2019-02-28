import React, { Component } from 'react'
import PropTypes from 'prop-types'

import computeScalarLayout from './computeScalarLayout'
import ScalarXAxis from './ScalarXAxis'
import Graph from './Graph'
import minmax from './minmax'

class ScalarXScalarYGraph extends Component {
  render () {
    const { data } = this.props
    const [xMin, xMax] = minmax(data.x.values)
    return <Graph
      {...this.props}
      computeXLayout={contentsWidth => computeScalarLayout('x', [xMin, xMax], contentsWidth)}
      renderXAxis={(props) => <ScalarXAxis {...props} />}
    />
  }
}

ScalarXScalarYGraph.propTypes = {
  width: PropTypes.number.isRequired,
  colorOffset: PropTypes.number,
  colors: PropTypes.array,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  onHover: PropTypes.func
}

export default ScalarXScalarYGraph
