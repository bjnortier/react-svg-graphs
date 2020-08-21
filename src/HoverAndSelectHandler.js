import React, { useState } from 'react'
import PropTypes from 'prop-types'

const HoverAndSelectHandler = (props) => {
  const { GraphComponent } = props
  const [selectedPath, setSelectedPath] = useState(null)
  const [hoverPath, setHoverPath] = useState(null)

  return (
    <GraphComponent
      {...props}
      onSelect={selectedPath => setSelectedPath(selectedPath)}
      onHover={hoverPath => setHoverPath(hoverPath)}
      selectedPath={selectedPath}
      hoverPath={hoverPath}
    />
  )
}

HoverAndSelectHandler.propTypes = {
  GraphComponent: PropTypes.func.isRequired
}

export default HoverAndSelectHandler
