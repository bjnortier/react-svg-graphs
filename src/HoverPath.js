import React from 'react'
import PropTypes from 'prop-types'

const HoverPath = ({ width, height, xValue, yValue, layout, color, hoverSelectStyle }) => {
  const xMin = layout.x.min
  const xMax = layout.x.max
  const yMin = layout.y.min
  const yMax = layout.y.max

  const xPos = ((xValue - xMin) / (xMax - xMin)) * width
  const yPos = height - ((yValue - yMin) / (yMax - yMin)) * height
  const radius = hoverSelectStyle === 'circle' ? 5 : 2
  const fill = hoverSelectStyle === 'circle' ? 'none' : color
  const strokeDasharray = hoverSelectStyle === 'circle' ? '2,2' : null
  return (
    <g pointerEvents='none'>
      <line
        stroke={color}
        strokeDasharray='2,2'
        x1={xPos}
        y1={yPos + radius + 3}
        x2={xPos}
        y2={height}
      />
      <line
        stroke={color}
        strokeDasharray='2,2'
        x1={xPos - radius - 3}
        y1={yPos}
        x2={0}
        y2={yPos}
      />
      <g transform={`translate(${xPos},${yPos})`}>
        <circle stroke={color} strokeDasharray={strokeDasharray} fill={fill} r={radius} />
      </g>
    </g>
  )
}

HoverPath.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xValue: PropTypes.number.isRequired,
  yValue: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  hoverSelectStyle: PropTypes.oneOf(['circle', 'fine']).isRequired
}

export default HoverPath
