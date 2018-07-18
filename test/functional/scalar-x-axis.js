import React from 'react'
import { render } from 'react-dom'

import { IncrementXAXis } from '../../'

const examples = [0]
const widths = [1000, 800, 600, 400, 320, 245]

render(
  <div>
    {examples.map((to, i) => <div key={i}>
      {widths.map((width, j) => <div key={j} style={{
        width,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff'
      }}>
        <svg style={{width, height: 50}}>
          <IncrementXAXis to={to} width={width} />
        </svg>
      </div>)}
    </div>)}
  </div>,
  document.getElementById('contents')
)
