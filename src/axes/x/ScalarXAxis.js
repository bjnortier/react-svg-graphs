import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

class ScalarXAxis extends Component {
  render () {
    const { to, width } = this.props
    const height = 50
    const clipId = v4()
    return <g>
      <clipPath id={clipId}>
        <rect x='0px' y='0' width={width} height='50' />
      </clipPath>
      <g
        style={{
          textAnchor: 'middle'
        }}
        clipPath={`url(#${clipId})`}
      >
        <line stroke='#888' x1={0} x2={width} y1={0} y2={height} />
      </g>
    </g>
  }
}

ScalarXAxis.propTypes = {
  to: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

export default ScalarXAxis
