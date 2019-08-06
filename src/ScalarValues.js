import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PointSet from './PointSet'
import HoverInfo from './HoverInfo'

class ScalarValues extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverPoint: null
    }
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
    const { hoverPoint: hoverInfo } = this.state
    return <g>
      <PointSet
        width={width}
        height={height}
        layout={layout}
        color={stroke}
        values={values}
        onHoverPoint={hoverPoint => {
          if (hoverPoint) {
            this.handleHoverPoint(hoverPoint)
          } else {
            this.handleHoverPoint(null)
          }
        }}
      />
      {hoverInfo ? <HoverInfo {...{ width, height, hoverInfo }} /> : null}
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
