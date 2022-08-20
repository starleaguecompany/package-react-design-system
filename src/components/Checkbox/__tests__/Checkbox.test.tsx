import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Checkbox } from '../../../index'

describe('Checkbox', () => {
  test('should render correctly with no props', () => {
    render(<Checkbox />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    expect(screen.getByTestId('Checkbox')).toHaveClass('container', { exact: true })
    expect(screen.getByRole('checkbox')).toHaveClass('input', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Checkbox id="test-id" className="test-class" />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    expect(screen.getByTestId('Checkbox')).toHaveClass('test-class')
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with label', () => {
    render(<Checkbox>Testing checkbox</Checkbox>)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    expect(screen.getByText('Testing checkbox')).toBeVisible()
    expect(screen.getByText('Testing checkbox')).toHaveClass('label')
  })

  test('should render correctly with checked prop', () => {
    render(<Checkbox checked />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  test('should render correctly with disabled prop', () => {
    render(<Checkbox disabled />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  test('should render correctly with name prop', () => {
    render(<Checkbox name="Testing checkbox" />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'Testing checkbox')
  })

  test('should render correctly with value prop', () => {
    render(<Checkbox value="Testing checkbox" />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'Testing checkbox')
  })

  test('should render correctly with readonly prop', () => {
    render(<Checkbox readOnly />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    expect(screen.getByTestId('Checkbox')).toHaveClass('readOnly')
  })

  test('should execute onChange callback on checking', () => {
    const onChangeCallback = jest.fn()
    render(<Checkbox onChange={onChangeCallback} />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    userEvent.click(screen.getByRole('checkbox'))
    expect(onChangeCallback).toBeCalledTimes(1)
  })

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn()
    const { rerender } = render(<Checkbox checked={false} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Checkbox')).toMatchSnapshot()
    rerender(<Checkbox checked={true} onChange={onChangeCallback} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(onChangeCallback).toBeCalledTimes(0)
  })
})
