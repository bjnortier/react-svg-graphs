import React from 'react'
import { render } from 'react-dom'
import { round10 } from 'round10'

import { ScalarXYGraph } from '../..'

// Re-map the data form timestamps to millisecs from start
// Temporal Data is in the form {t: <timestamp>, v: <value>} an in
// reverse chronological order
import temporalData from '../resources/flow.json'
temporalData.reverse()
const start = temporalData[0].t
const data = temporalData.map(d => ({x: round10((d.t - start) / 100000, 0), y: d.v})).slice(100, 200)

// The dimensions of the actual data, excluding titles, axes etc.
// const contentsWidths = [800, 640, 480, 320, 240]
const contentsWidths = [640, 320]
const contentsHeights = [320, 160]
const padding = 50

render(
  <div>
    {contentsWidths.map(contentsWidth => {
      return contentsHeights.map(contentsHeight => {
        const svgWidth = contentsWidth + 2 * padding
        const svgHeight = contentsHeight + 2 * padding
        return <div key={`${contentsWidth}:${contentsHeight}`} style={{margin: 20}}>
          <div style={{padding: '10px 0'}}>{contentsWidth}:{contentsHeight}</div>
          <div style={{width: svgWidth, height: svgHeight, backgroundColor: '#fff'}}>
            <ScalarXYGraph
              data={data}
              width={svgWidth}
              height={svgHeight}
              padding={padding}
            />
          </div>
        </div>
      })
    })}
  </div>,
  document.getElementById('contents')
)
