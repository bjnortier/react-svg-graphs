# rsg

React SVG graphs.

## Status

This is a first release, so take care. Currently supports scalar X and multiple scalar Y values.

## How to use

```
import { ScalarXYGraph } from 'rsg'

const data = {
  x: {
    label: 'X',
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
    data={data}
    width={600}
    height={400}
    padding={50}
    title={`Example Graph`}
  />,
  document.getElementById('contents')
)
```

Will result in:

![Example 1](https://github.com/bjnortier/rsg/blob/master/doc/example1.png?raw=true)
