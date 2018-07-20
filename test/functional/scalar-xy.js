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
const xValues = temporalData.map(d => round10((d.t - start) / 100000, 0)).slice(100, 200)
const yValues1 = temporalData.map(d => d.v).slice(100, 200)
const yValues2 = temporalData.map(d => d.v).slice(200, 300)
const data1 = {
  x: {
    label: 'Iterations',
    values: xValues
  },
  y: [{
    label: 'foo',
    values: yValues1
  }, {
    label: 'bar',
    values: yValues2
  }]
}
const data2 = {
  x: {
    label: 'Iterations',
    values: [0]
  },
  y: [{
    label: 'foo',
    values: [1]
  }]
}

// The dimensions of the actual data, excluding titles, axes etc.
// const contentsWidths = [800, 640, 480, 320, 240]
// const contentsWidths = [640, 320]
// const contentsHeights = [320, 160]
const contentsWidths = []
const contentsHeights = []
const padding = 80

render(
  <div>
    {contentsWidths.map(contentsWidth => {
      return contentsHeights.map(contentsHeight => {
        const svgWidth = contentsWidth + 2 * padding
        const svgHeight = contentsHeight + 2 * padding
        const key = `${contentsWidth}:${contentsHeight}`
        return <div key={key} style={{margin: 20}}>
          <div style={{width: svgWidth, height: svgHeight, backgroundColor: '#fff'}}>
            <ScalarXYGraph
              data={data1}
              width={svgWidth}
              height={svgHeight}
              padding={padding}
              title={`RSG Scalar XY Graph ${key}`}
            />
          </div>
        </div>
      })
    })}
    <div style={{width: 640, height: 320, backgroundColor: '#fff'}}>
      <ScalarXYGraph
        data={data2}
        width={640}
        height={320}
        padding={50}
        title={`x: [0], y: [1]`}
      />
    </div>
  </div>,
  document.getElementById('contents')
)
