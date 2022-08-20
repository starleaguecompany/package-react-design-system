import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { TextInput } from '../../TextInput'
import { ControlGroup } from '../../ControlGroup'

describe('ControlGroup', () => {
  test('should render correctly with no props', () => {
    render(<ControlGroup />)

    expect(screen.getByTestId('ControlGroup')).toMatchSnapshot()
    expect(screen.getByTestId('ControlGroup')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<ControlGroup id="test-id" className="test-class" />)

    expect(screen.getByTestId('ControlGroup')).toMatchSnapshot()
    expect(screen.getByTestId('ControlGroup')).toHaveAttribute('id', 'test-id')
    expect(screen.getByTestId('ControlGroup')).toHaveClass('test-class')
  })

  test('should render correctly with direction prop', () => {
    render(
      <ControlGroup direction="vertical">
        <TextInput placeholder="Название поля 1" />
        <TextInput placeholder="Название поля 2" />
        <TextInput placeholder="Название поля 3" />
      </ControlGroup>
    )

    expect(screen.getByTestId('ControlGroup')).toMatchSnapshot()
    expect(screen.getAllByTestId('TextInput')[0]).toHaveClass('group-vertical group-start')
    expect(screen.getAllByTestId('TextInput')[1]).toHaveClass('group-vertical group-middle')
    expect(screen.getAllByTestId('TextInput')[2]).toHaveClass('group-vertical group-end')
  })

  test('should render correctly with children', () => {
    render(
      <ControlGroup>
        <TextInput placeholder="Название поля 1" />
        <TextInput placeholder="Название поля 2" />
        <TextInput placeholder="Название поля 3" />
      </ControlGroup>
    )

    expect(screen.getByTestId('ControlGroup')).toMatchSnapshot()
    expect(screen.getByTestId('ControlGroup')).toContainElement(screen.getAllByTestId('TextInput')[0])
    expect(screen.getByTestId('ControlGroup')).toContainElement(screen.getAllByTestId('TextInput')[1])
    expect(screen.getByTestId('ControlGroup')).toContainElement(screen.getAllByTestId('TextInput')[2])
    expect(screen.getAllByTestId('TextInput')[0]).toHaveClass('group-horizontal group-start')
    expect(screen.getAllByTestId('TextInput')[1]).toHaveClass('group-horizontal group-middle')
    expect(screen.getAllByTestId('TextInput')[2]).toHaveClass('group-horizontal group-end')
  })
})
