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
      this.setState({
        hoverPoint: {
          ...hoverPoint,
          xInfo,
          yInfo,
          infoWidth: Math.round((xInfo.length + yInfo.length) * 7.3 + 8)
        }
      })
    } else {
      this.setState({ hoverPoint })
    }
  }

  render () {
    const { width, height, data, layout, palette } = this.props
    const { hoverPoint } = this.state
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
          onHoverPoint={hoverPoint => {
            if (hoverPoint) {
              this.handleHoverPoint({
                ...hoverPoint,
                xLabel: data.x.label,
                yLabel: data.y[i].label
              })
            } else {
              this.handleHoverPoint(null)
            }
          }}
        />
      })}
      {hoverPoint
        ? <g>
          <line stroke={hoverPoint.color} x1={hoverPoint.xPos} y1={hoverPoint.yPos + 5} x2={hoverPoint.xPos} y2={height} />
          <line stroke={hoverPoint.color} x1={hoverPoint.xPos - 5} y1={hoverPoint.yPos} x2={0} y2={hoverPoint.yPos} />
          <g transform={`translate(${
            hoverPoint.xPos + ((hoverPoint.xPos > width / 2) ? -hoverPoint.infoWidth - 8 : 8)
          },${
            hoverPoint.yPos + ((hoverPoint.yPos > height / 2) ? -33 - 8 : 8)
          })`}>
            <rect
              x={0}
              y={0}
              width={hoverPoint.infoWidth}
              height={33}
              stroke='#ddd'
              fill='white'
              fillOpacity={0.8}
            />
            <text textAnchor='start' x={4} y={14} fill='#888'>
              {hoverPoint.xInfo}
            </text>
            <text textAnchor='end' x={hoverPoint.infoWidth - 4} y={14} >
              {hoverPoint.yInfo}
            </text>
          </g>
        </g> : null}
    </g>
  }
}

ScalarValues.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  palette: PropTypes.array.isRequired,
  xInfoFormatter: PropTypes.func.isRequired
}

export default ScalarValues
