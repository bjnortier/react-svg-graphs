import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format, utcToZonedTime } from 'date-fns-tz'

class TimeXAxis extends Component {
  render () {
    const { width, layout } = this.props
    const { min, max, tickDates } = layout
    const {
      tickLabelTest,
      tickLabelFormat,
      contextLabelTest,
      contextLabelFormat
    } = layout
    const formatDateTime = (date, pattern) => {
      return format(utcToZonedTime(date, 'UTC'), pattern, {
        timeZone: 'UTC'
      })
    }

    const ticks = []
    const contexts = []
    for (let i = 0; i < tickDates.length; ++i) {
      const tickDate = tickDates[i]
      const dx = ((tickDate.getTime() - min.getTime()) / (max.getTime() - min.getTime())) * width
      if (Math.abs(dx - width / 2) <= width / 2) {
        const label = tickLabelTest(tickDate, width)
          ? formatDateTime(tickDate, tickLabelFormat(width))
          : ''
        ticks.push({ dx, label })
      }
      // Context label max width allowed = 30 pixels
      if (Math.abs(dx - width / 2) < width / 2 - 12) {
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
        label: formatDateTime(
          new Date((min.getTime() + max.getTime()) / 2),
          contextLabelFormat
        )
      })
    }

    return (
      <g style={{ textAnchor: 'middle' }}>
        {ticks.map((tick, i) => (
          <g key={i} transform={`translate(${tick.dx}, 0)`}>
            {tick.label ? (
              <g>
                <line stroke='#ccc' x1={0} x2={0} y1={0} y2={8} />
                <text transform='translate(0, 22)'>{tick.label}</text>
              </g>
            ) : (
              <line stroke='#ccc' x1={0} x2={0} y1={0} y2={4} />
            )}
          </g>
        ))}
        {contexts.map((context, i) => (
          <g key={i} transform={`translate(${context.dx}, 36)`}>
            <text>{context.label}</text>
          </g>
        ))}
      </g>
    )
  }
}

TimeXAxis.propTypes = {
  width: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired

}

export default TimeXAxis
