import React from 'react'
import {shallow} from 'enzyme'
import {spy} from 'sinon'

import AriaButton from '.'

const createKeyPressEvent = (key: string) => ({
  preventDefault: spy(),
  key
})

test('renders children in a span when no component is specified', () => {
  const wrapper = shallow(
    <AriaButton>Click me</AriaButton>
  )
  expect(wrapper).toMatchSnapshot()
})

test('renders children in custom component', () => {
  const wrapper = shallow(
    <AriaButton tag="div">Click me</AriaButton>
  )
  expect(wrapper).toMatchSnapshot()
})

test('invokes onClick when clicked', () => {
  const onClick = spy()
  const wrapper = shallow(
    <AriaButton onClick={onClick}>Click me</AriaButton>
  )
  wrapper.simulate('click')
  expect(onClick.callCount).toBe(1)
})

test('invokes onClick when the Space key is pressed', () => {
  const onClick = spy()
  const wrapper = shallow(
    <AriaButton onClick={onClick}>Click me</AriaButton>
  )
  const keyPressEvent = createKeyPressEvent(' ')
  wrapper.simulate('keypress', keyPressEvent)
  expect(onClick.callCount).toBe(1)
  expect(keyPressEvent.preventDefault.callCount).toBe(1)
})

test('invokes onClick when the Enter key is pressed', () => {
  const onClick = spy()
  const wrapper = shallow(
    <AriaButton onClick={onClick}>Click me</AriaButton>
  )
  const keyPressEvent = createKeyPressEvent(' ')
  wrapper.simulate('keypress', keyPressEvent)
  expect(onClick.callCount).toBe(1)
  expect(keyPressEvent.preventDefault.callCount).toBe(1)
})

test('invokes onKeyPress when onClick is fired', () => {
  const onClick = spy()
  const onKeyPress = spy()
  const wrapper = shallow(
    <AriaButton onClick={onClick} onKeyPress={onKeyPress}>Click me</AriaButton>
  )
  wrapper.simulate('keypress', createKeyPressEvent('Enter'))
  expect(onKeyPress.callCount).toBe(1)
  expect(onClick.callCount).toBe(1)
})