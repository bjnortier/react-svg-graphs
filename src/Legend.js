import React from 'react'
import PropTypes from 'prop-types'

const Legend = ({ data, maxLegendLength, palette, type }) => (
  <>
    <rect
      x={0}
      y={0}
      width={20 + maxLegendLength * 7.5 + 10}
      height={data.length * 20}
      fill='#fff'
      stroke='#ddd'
      fillOpacity={0.5}
    />
    {data.map((dataSet, i) => {
      const paletteIndex = i % 10
      const r1 = 1.5
      const r2 = 3
      return (
        <g key={i} transform={`translate(0, ${i * 20})`}>
          {type === 'area'
            ? (
              <g opacity='0.15'>
                <rect
                  stroke='none'
                  x={3}
                  y={10}
                  width={14}
                  height={5}
                  fill={palette[paletteIndex]}
                  r={r2}
                />
              </g>
            )
            : null}
          <line stroke={palette[paletteIndex]} x1={3} x2={17} y1={10} y2={10} />
          {type === 'point'
            ? (
              <g transform='translate(10, 10)'>
                <circle
                  stroke='none'
                  x={5}
                  y={5}
                  fill={palette[paletteIndex]}
                  r={r2}
                />
                <circle stroke='none' fill='white' r={r1} />
              </g>
            )
            : null}

          <text x={20} y={14}>
            {dataSet.label}
          </text>
        </g>
      )
    })}
  </>
)

Legend.propTypes = {
  data: PropTypes.array.isRequired,
  maxLegendLength: PropTypes.number.isRequired,
  palette: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['point', 'area']).isRequired
}

export default Legend
