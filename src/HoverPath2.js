import React from 'react'
import PropTypes from 'prop-types'

const SelectedPath2 = ({ width, height, xValue, yValue, layout, color }) => {
  const xMin = layout.x.min
  const xMax = layout.x.max
  const yMin = layout.y.min
  const yMax = layout.y.max

  const xPos = ((xValue - xMin) / (xMax - xMin)) * width
  const yPos = height - ((yValue - yMin) / (yMax - yMin)) * height

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

SelectedPath2.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xValue: PropTypes.number.isRequired,
  yValue: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired
}

export default SelectedPath2
