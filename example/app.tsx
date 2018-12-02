import React from 'react'
import {render} from 'react-dom'

import AriaButton, { AriaButtonChildrenProps } from '../src'

class Example extends React.Component<{
  children: React.ReactElement<any>
}> {
  state = {
    numClicks: 0
  }

  render() {
    return (
      <>
        {
          React.cloneElement(this.props.children, {
            onClick: () => this.setState({numClicks: this.state.numClicks + 1})
          })
        }
        <p>Click count: {this.state.numClicks}</p>
      </>
    )
  }
}

class Root extends React.Component {
  state = {
    numClicks: 0
  }

  render () {
    return (
      <>
        <h1>Aria Button Examples</h1>
        <h2>Default</h2>
        <Example>
          <AriaButton>Click me</AriaButton>
        </Example>
        <h2>Custom component</h2>
        <Example>
          <AriaButton tag="div">
            <p>Click me</p>
          </AriaButton>
        </Example>
      </>
    )
  }
}

render(
  <Root />,
  document.getElementById('root')
)