import React from 'react'

export default ({ width, height, hoverInfo }) => (
  <g pointerEvents='none'>
    <line
      stroke={hoverInfo.color}
      x1={hoverInfo.xPos}
      y1={hoverInfo.yPos + 5}
      x2={hoverInfo.xPos}
      y2={height}
    />
    <line
      stroke={hoverInfo.color}
      x1={hoverInfo.xPos - 5}
      y1={hoverInfo.yPos}
      x2={0}
      y2={hoverInfo.yPos}
    />
    <g
      transform={`translate(${hoverInfo.xPos +
        (hoverInfo.xPos > width / 2
          ? -hoverInfo.infoWidth - 8
          : 8)},${hoverInfo.yPos +
        (hoverInfo.yPos > height / 2 ? -33 - 8 : 8)})`}
    >
      <rect
        x={0}
        y={0}
        width={hoverInfo.infoWidth}
        height={33}
        stroke='#ddd'
        fill='white'
        fillOpacity={0.8}
      />
      <text textAnchor='start' x={4} y={14} fill='#000'>
        {hoverInfo.xInfo}
      </text>
      <text
        textAnchor='end'
        x={hoverInfo.infoWidth - 4}
        y={14}
        fill={hoverInfo.color}
      >
        {hoverInfo.yInfo}
      </text>
    </g>
  </g>
)
