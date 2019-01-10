import React from 'react'

export default ({ data, maxLegendLength, palette }) => <>
  <rect
    x={0}
    y={0}
    width={20 + maxLegendLength * 7.5 + 10}
    height={data.y.length * 20}
    fill='#fff'
    stroke='#ddd'
    fillOpacity={0.5}
  />
  {data.y.map((y, i) => {
    const paletteIndex = i % 10
    const r1 = 1.5
    const r2 = 3
    return <g key={i} transform={`translate(0, ${i * 20})`}>
      <line stroke={palette[paletteIndex]} x1={3} x2={17} y1={10} y2={10} />
      <g transform={`translate(10, 10)`}>
        <circle stroke='none' x={5} y={5} fill={palette[paletteIndex]} r={r2} />
        <circle stroke='none' fill='white' r={r1} />
      </g>
      <text style={{ textAnchor: 'left' }} x={20} y={14} >
        {y.label}
      </text>
    </g>
  })}
</>
