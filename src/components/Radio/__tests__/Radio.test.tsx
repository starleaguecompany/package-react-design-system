import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Radio } from '../../../index'

describe('Radio', () => {
  test('should render correctly with no props', () => {
    render(<Radio />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    expect(screen.getByTestId('Radio')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Radio id="test-id" className="test-class" />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    expect(screen.getByTestId('Radio')).toHaveClass('test-class')
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with label', () => {
    render(<Radio>Radio label</Radio>)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    expect(screen.getByRole('radio')).toBeVisible()
    expect(screen.getByText('Radio label')).toBeVisible()
    expect(screen.getByText('Radio label')).toHaveClass('label')
  })

  test('should render correctly with name prop', () => {
    render(<Radio name="Radio name" />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'Radio name')
  })

  test('should render correctly with value prop', () => {
    render(<Radio value="Radio value" />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'Radio value')
  })

  test('should render correctly with checked prop', () => {
    render(<Radio checked />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    expect(screen.getByTestId('Radio')).toHaveClass('checked')
    expect(screen.getByRole('radio')).toBeChecked()
  })

  test('should render correctly with disabled prop', () => {
    render(<Radio disabled />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    expect(screen.getByTestId('Radio')).toHaveClass('disabled')
    expect(screen.getByRole('radio')).toBeDisabled()
  })

  test('should render correctly with readOnly prop', () => {
    render(<Radio readOnly />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    expect(screen.getByTestId('Radio')).toHaveClass('readOnly')
  })

  test('should execute onChangeCallback on click radio', () => {
    const onChangeCallback = jest.fn()
    render(<Radio onChange={onChangeCallback} />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    userEvent.click(screen.getByRole('radio'))
    expect(onChangeCallback).toBeCalledTimes(1)
  })

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn()
    const { rerender } = render(<Radio checked={false} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Radio')).toMatchSnapshot()
    rerender(<Radio checked={true} onChange={onChangeCallback} />)
    expect(screen.getByRole('radio')).toBeChecked()
    expect(onChangeCallback).toBeCalledTimes(0)
  })
})
