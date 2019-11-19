import React from 'react'
import PropTypes from 'prop-types'

const HoverInfo = ({ width, height, info }) => {
  const { color, xPos, yPos } = info
  return (
    <g pointerEvents='none'>
      <line
        stroke={color}
        strokeDasharray='2,2'
        x1={xPos}
        y1={yPos + 5}
        x2={xPos}
        y2={height}
      />
      <line
        stroke={color}
        strokeDasharray='2,2'
        x1={xPos - 5}
        y1={yPos}
        x2={0}
        y2={yPos}
      />
      <g transform={`translate(${xPos},${yPos})`}>
        <circle stroke={color} strokeDasharray='2,2' fill='none' r={5} />
      </g>
    </g>
  )
}

HoverInfo.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired
}

export default HoverInfo
