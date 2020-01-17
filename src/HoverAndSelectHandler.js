import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HoverAndSelectHandler extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPath: null,
      hoverPath: null
    }
  }

  render () {
    const { GraphComponent } = this.props
    return (
      <GraphComponent
        {...this.props}
        onSelect={selectedPath => this.setState({ selectedPath })}
        onHover={hoverPath => this.setState({ hoverPath })}
        selectedPath={this.state.selectedPath}
        hoverPath={this.state.hoverPath}
      />
    )
  }
}

HoverAndSelectHandler.propTypes = {
  GraphComponent: PropTypes.func.isRequired
}

export default HoverAndSelectHandler
