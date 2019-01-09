import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import tz from 'timezone/loaded'
import jstz from 'jstz'

const timezone = jstz.determine().name()

class TimeXAxis extends Component {
  render () {
    const { width, layout } = this.props
    const { minT, maxT, timeAxisTickPeriod } = layout
    const { tickLabelTest, tickLabelFormat, contextLabelTest, contextLabelFormat } = layout
    const formatDateTime = (date, format) => tz(date, format, 'en_GB', timezone)

    const firstTick = minT
    const lastTick = maxT

    const ticks = []
    const contexts = []
    for (let tickTime = firstTick, tickIndex = 0; tickTime <= lastTick; tickTime += timeAxisTickPeriod, ++tickIndex) {
      const dx = (tickTime - minT) / (maxT - minT) * width
      const tickDate = new Date(tickTime)
      if (Math.abs(dx - (width / 2)) < (width / 2 - 10)) {
        const label = tickLabelTest(tickDate, width) ? formatDateTime(tickDate, tickLabelFormat(width)) : ''
        ticks.push({ dx, label })
      }
      if (Math.abs(dx - (width / 2)) < (width / 2 - 60)) {
        if (contextLabelTest(tickDate)) {
          contexts.push({ dx, label: formatDateTime(tickDate, contextLabelFormat) })
        }
      }
    }
    if (!contexts.length) {
      contexts.push({
        dx: width / 2,
        label: formatDateTime(new Date((firstTick + lastTick) / 2), contextLabelFormat)
      })
    }

    const clipId = v4()
    return <g>
      <clipPath id={clipId}>
        <rect x='0px' y='0' width={width} height='50' />
      </clipPath>
      <g
        style={{
          textAnchor: 'middle'
        }}
        clipPath={`url(#${clipId})`}
      >
        {ticks.map((tick, i) =>
          <g key={i} transform={`translate(${tick.dx}, 0)`}>
            {tick.label
              ? <g>
                <line stroke='#888' x1={0.5} x2={0.5} y1={0} y2={10} />
                <text
                  transform='translate(0, 22)'
                  fill='#444'
                >
                  {tick.label}
                </text>
              </g>
              : <line stroke='#888' x1={0.5} x2={0.5} y1={0} y2={6} />}
          </g>
        )}
        {contexts.map((context, i) =>
          <g key={i} transform={`translate(${context.dx}, 14)`}>
            <text
              transform='translate(0, 24)'
              fill='#444'
            >{context.label}</text>
          </g>
        )}
      </g>
    </g>
  }
}

TimeXAxis.propTypes = {
  width: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  period: PropTypes.oneOf(['1hr', '3hr', '6hr', '12hr', '24hr', '1d', '2d', '1wk', '1mo'])
}

export default TimeXAxis
