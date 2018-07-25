[![Build Status](https://travis-ci.org/bjnortier/dxf.svg?branch=master)](https://travis-ci.org/bjnortier/rsg)

# rsg

React SVG graphs.

## Status

This is a first prototype, so take care.

# Features

- Supports scalar X and multiple scalar Y values.

## Limitations

- Y value sets limited to 10.
- No styling of markers & lines yet.

## Usage examples:

```
import React from 'react'
import { render } from 'react-dom'

import { ScalarXYGraph } from 'rsg'

const data1 = {
  x: {
    label: 'Foo',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  y: [
    {
      label: 'A',
      values: [ 0, 1, null, 9, 16, 25, 36, 49, 64, 81, 100 ]
    },
    {
      label: 'B',
      values: [ 10, 11, 12, 14, 16, 18, 21, 24, null, null, 37 ]
    }
  ]
}

render(
  <ScalarXYGraph
    data={data1}
    width={600}
    height={400}
    padding={50}
    title={`Basic Example`}
  />,
  document.getElementById('contents')
)
```

Result:

![Basic Example](https://github.com/bjnortier/rsg/blob/master/doc/basic_example.png?raw=true)



```
import React from 'react'
import { render } from 'react-dom'

import { ScalarXYGraph } from 'rsg'

const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const data2 = {
  x: {
    label: 'Bar',
    values: xValues
  },
  y: [0,1,2,3,4,5,6,7,8,9].map(m => ({
    label: m,
    values: xValues.map(x => m * Math.exp(x / 10))
  }))
}

render(
  <ScalarXYGraph
    data={data2}
    width={600}
    height={400}
    padding={50}
    title={`Colors Example`}
  />,
  document.getElementById('contents')
)
```

Result:

![Colors Example](https://github.com/bjnortier/rsg/blob/master/doc/colors_example.png?raw=true)
