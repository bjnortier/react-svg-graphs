import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PointSet from './PointSet'

class ComputedValues extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { width, height, data, layout, palette } = this.props
    return <g>
      <rect stroke='#ddd' fill='none' x='0' y='0' width={width} height={height} />
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

ComputedValues.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  palette: PropTypes.array.isRequired
}

export default ComputedValues
