[![Build Status](https://travis-ci.org/bjnortier/react-svg-graphs.svg?branch=master)](https://travis-ci.org/bjnortier/react-svg-graphs)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


# rsg

React SVG graphs.

## Status

This is a first release - caveat emptor.

## Installation

```
$ npm i react-svg-graphs
```

# Features

- Supports scalar X and multiple scalar Y values.

## Limitations

- Y value sets limited to 10.
- No styling of markers & lines.

## Usage:

There are 5 parameters:
- data
- width
- height
- padding
- title

All except ```data``` are self-explanatory. ```data``` must be in the form shown in the examples below (single x array, multiple y arrays, each with their own labels).

X and Y axes scales are automatic and not configurable (if you have examples where they look terrible, please submit as an issue).


```
import React from 'react'
import { render } from 'react-dom'

import { ScalarXYGraph } from 'react-svg-graphs'

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

![Basic Example](https://github.com/bjnortier/react-svg-graphs/blob/master/doc/basic_example.png?raw=true)



```
import React from 'react'
import { render } from 'react-dom'

import { ScalarXYGraph } from 'react-svg-graphs'

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

![Colors Example](https://github.com/bjnortier/react-svg-graphs/blob/master/doc/colors_example.png?raw=true)
