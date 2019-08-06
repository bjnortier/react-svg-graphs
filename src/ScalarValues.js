import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PointSet from './PointSet'

class ScalarValues extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleHoverPoint = this.handleHoverPoint.bind(this)
  }

  handleHoverPoint (hoverPoint) {
    const { xInfoFormatter } = this.props
    if (hoverPoint) {
      const xInfo = `${xInfoFormatter(hoverPoint.xValue)}:`
      const yInfo = `${hoverPoint.yValue}`
      const hoverPointState = {
        ...hoverPoint,
        xInfo,
        yInfo,
        infoWidth: Math.round((xInfo.length + yInfo.length) * 7.3 + 8)
      }
      this.setState({ hoverPoint: hoverPointState })
      if (this.props.onHover) {
        this.props.onHover(hoverPointState)
      }
    } else {
      this.setState({ hoverPoint })
    }
  }

  render () {
    const { width, height, values, layout, stroke } = this.props
    return <g>
      return <PointSet
        width={width}
        height={height}
        layout={layout}
        color={stroke}
        values={values}
      />
    </g>
  }
}

ScalarValues.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  stroke: PropTypes.string.isRequired,
  xInfoFormatter: PropTypes.func.isRequired,
  onHover: PropTypes.func
}

export default ScalarValues
