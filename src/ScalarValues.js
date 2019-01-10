import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PointSet from './PointSet'

class ScalarValues extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverPoint: null
    }
    this.handleHoverPoint = this.handleHoverPoint.bind(this)
  }

  handleHoverPoint (hoverPoint) {
    console.log('@@', hoverPoint)
    this.setState({ hoverPoint })
  }

  render () {
    const { width, height, data, layout, palette } = this.props
    const { hoverPoint } = this.state
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
          onHoverPoint={this.handleHoverPoint}
        />
      })}
      {hoverPoint
        ? <g transform={`translate(${hoverPoint.x},${hoverPoint.y})`}>
          <rect
            x={
              hoverPoint.x > width / 2
                ? -50 - 8
                : 8
            }
            y={
              hoverPoint.y > height / 2
                ? -20 - 8
                : 8
            }
            width={50}
            height={20}
            style={{ stroke: 'black', fill: 'red' }}
          />
        </g> : null}
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
