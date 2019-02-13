import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import tz from 'timezone/loaded'

class TimeXAxis extends Component {
  render () {
    const { width, layout, timezone } = this.props
    const { min, max, timeAxisTickPeriod } = layout
    const { tickLabelTest, tickLabelFormat, contextLabelTest, contextLabelFormat } = layout
    const formatDateTime = (date, format) => tz(date, format, 'en_GB', timezone)

    const firstTick = min
    const lastTick = max

    const ticks = []
    const contexts = []
    for (let tickTime = firstTick, tickIndex = 0; tickTime <= lastTick; tickTime += timeAxisTickPeriod, ++tickIndex) {
      const dx = (tickTime - min) / (max - min) * width
      const tickDate = new Date(tickTime)
      if (Math.abs(dx - (width / 2)) < (width / 2 - 10)) {
        const label = tickLabelTest(tickDate, width)
          ? formatDateTime(tickDate, tickLabelFormat(width))
          : ''
        ticks.push({ dx, label })
      }
      if (Math.abs(dx - (width / 2)) < (width / 2 - 60)) {
        if (contextLabelTest(tickDate)) {
          contexts.push({
            dx,
            label: formatDateTime(tickDate, contextLabelFormat)
          })
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
        <rect x='0px' y='0' width={width} height='48' />
      </clipPath>
      <g
        style={{ textAnchor: 'middle' }}
        clipPath={`url(#${clipId})`}
      >
        {ticks.map((tick, i) =>
          <g key={i} transform={`translate(${tick.dx}, 0)`}>
            {tick.label
              ? <g>
                <line stroke='#ccc' x1={0} x2={0} y1={0} y2={8} />
                <text
                  transform='translate(0, 22)'
                >
                  {tick.label}
                </text>
              </g>
              : <line stroke='#ccc' x1={0} x2={0} y1={0} y2={4} />}
          </g>
        )}
        {contexts.map((context, i) =>
          <g key={i} transform={`translate(${context.dx}, 36)`}>
            <text>{context.label}</text>
          </g>
        )}
      </g>
    </g>
  }
}

TimeXAxis.propTypes = {
  width: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  period: PropTypes.oneOf(['1hr', '3hr', '6hr', '12hr', '24hr', '1d', '2d', '1wk', '1mo']),
  timezone: PropTypes.string.isRequired
}

export default TimeXAxis
