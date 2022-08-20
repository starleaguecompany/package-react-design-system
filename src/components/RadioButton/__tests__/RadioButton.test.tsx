import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RadioButton } from '../../../index'

const options = [
  { label: 'label 1', value: 1 },
  { label: 'label 2', value: 2 },
  { label: 'label 3', value: 3 },
]

describe('RadioButton', () => {
  test('should render correctly with no props', () => {
    render(<RadioButton />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    expect(screen.getByTestId('RadioButton')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<RadioButton id="test-id" className="test-class" />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    expect(screen.getByTestId('RadioButton')).toHaveClass('test-class')
    expect(screen.getByTestId('RadioButton')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with required options prop', () => {
    render(<RadioButton options={options} />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    expect(screen.getByRole('button', { name: 'label 1' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'label 2' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'label 3' })).toBeVisible()
  })

  test('should render correctly with defaultValue prop', () => {
    render(<RadioButton defaultValue={2} options={options} />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    expect(screen.getByRole('button', { name: 'label 1' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 2' })).toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 3' })).not.toHaveClass('active')
  })

  test('should render correctly with value prop', () => {
    render(<RadioButton value={3} options={options} />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    expect(screen.getByRole('button', { name: 'label 1' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 2' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 3' })).toHaveClass('active')
  })

  test('should render correctly with size prop', () => {
    render(<RadioButton size={44} options={options} />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    expect(screen.getByRole('button', { name: 'label 1' })).toHaveClass('size-44')
    expect(screen.getByRole('button', { name: 'label 2' })).toHaveClass('size-44')
    expect(screen.getByRole('button', { name: 'label 3' })).toHaveClass('size-44')
  })

  test('should execute onchangeCallback when changing value', () => {
    const onchangeCallback = jest.fn()
    render(<RadioButton onChange={onchangeCallback} options={options} />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    expect(onchangeCallback).toBeCalledTimes(0)
    userEvent.click(screen.getByRole('button', { name: 'label 2' }))
    expect(onchangeCallback).toBeCalledTimes(1)
  })

  test('should return value of radio button when click it', () => {
    const onchangeCallback = jest.fn()
    render(<RadioButton onChange={onchangeCallback} options={options} />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    userEvent.click(screen.getByRole('button', { name: 'label 2' }))
    expect(onchangeCallback).toBeCalledWith(2)
  })

  test('should switch between radio buttons when click them', () => {
    render(<RadioButton options={options} />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    userEvent.click(screen.getByRole('button', { name: 'label 2' }))
    expect(screen.getByRole('button', { name: 'label 1' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 2' })).toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 3' })).not.toHaveClass('active')
    userEvent.click(screen.getByRole('button', { name: 'label 3' }))
    expect(screen.getByRole('button', { name: 'label 1' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 2' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 3' })).toHaveClass('active')
  })

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn()
    const { rerender } = render(<RadioButton options={options} value={1} onChange={onChangeCallback} />)

    expect(screen.getByTestId('RadioButton')).toMatchSnapshot()
    rerender(<RadioButton options={options} value={2} onChange={onChangeCallback} />)
    expect(screen.getByRole('button', { name: 'label 1' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 2' })).toHaveClass('active')
    expect(screen.getByRole('button', { name: 'label 3' })).not.toHaveClass('active')
    expect(onChangeCallback).toBeCalledTimes(0)
  })
})
