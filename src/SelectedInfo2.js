import React from 'react'
import PropTypes from 'prop-types'

const SelectedInfo2 = ({ width, height, info }) => {
  const { color, xPos, yPos, infoWidth, xInfo, yInfo } = info
  return (
    <g pointerEvents='none'>
      <line
        stroke={color}
        x1={xPos}
        y1={yPos + 5}
        x2={xPos}
        y2={height}
      />
      <line
        stroke={color}
        x1={xPos - 5}
        y1={yPos}
        x2={0}
        y2={yPos}
      />
      <g transform={`translate(${info.xPos},${info.yPos})`}>
        <circle stroke={info.color} fill='none' r={5} />
      </g>
      <g
        transform={`translate(${xPos +
          (xPos > width / 2
            ? -infoWidth - 8
            : 8)},${yPos +
          (yPos > height / 2 ? -33 - 8 : 8)})`}
      >
        <rect
          x={0}
          y={0}
          width={infoWidth}
          height={33}
          stroke='#ddd'
          fill='white'
          fillOpacity={0.8}
        />
        <text textAnchor='start' x={4} y={14} fill='#000'>
          {xInfo}
        </text>
        <text
          textAnchor='end'
          x={infoWidth - 4}
          y={14}
          fill={color}
        >
          {yInfo}
        </text>
      </g>
    </g>
  )
}

SelectedInfo2.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired
}

export default SelectedInfo2
