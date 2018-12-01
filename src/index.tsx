import React from 'react'

export type AriaButtonClickEventHandler = React.ReactEventHandler

export interface AriaButtonChildrenProps {
  onClick?: AriaButtonClickEventHandler
  onKeyPress?: React.KeyboardEventHandler
  role: string
  tabIndex: number
}

export interface AriaButtonProps {
  children: React.ReactNode
  tag?: string
  onClick?: AriaButtonClickEventHandler
  onKeyPress?: React.KeyboardEventHandler
}

function createOnKeyPressHandler (onClick: AriaButtonClickEventHandler, onKeyPress?: React.KeyboardEventHandler): React.KeyboardEventHandler {
  return function onKeyPressHandler (event: React.KeyboardEvent) {
    const didPressSpace = event.key === ' '
    const didPressEnter = event.key === 'Enter'

    // Prevent scrolling if the space key was hit.
    if (didPressSpace) {
      event.preventDefault()
    }

    if (typeof onKeyPress === 'function') {
      onKeyPress(event)
    }

    if ((didPressSpace || didPressEnter) && typeof onClick === 'function') {
      onClick(event)
    }
  }
}

export default function AriaButton (props: AriaButtonProps) {
  const {tag, onClick, onKeyPress, ...rest} = props
  return React.createElement(props.tag || 'span', {
    onClick,
    tabIndex: 0,

    // Allow above props to be overridden.
    ...rest,

    // These props should not be overridden.
    role: 'button',
    onKeyPress: createOnKeyPressHandler(onClick, onKeyPress)
  })
}
