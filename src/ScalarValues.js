import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PointSet from './PointSet'

class ScalarValues extends Component {
  render () {
    const { width, height, data, layout, palette } = this.props
    return <g>
      <rect style={{ stroke: '#ddd', fill: 'none' }} x='0px' y='0' width={width} height={height} />
      {data.y.map((yValueSet, i) => {
        return <PointSet
          key={i}
          width={width}
          height={height}
          layout={layout}
          color={palette[i % 10]}
          data={{ x: data.x.values, y: yValueSet.values }}
        />
      })}
    </g>
  }
}

ScalarValues.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  palette: PropTypes.array.isRequired
}

export default ScalarValues
