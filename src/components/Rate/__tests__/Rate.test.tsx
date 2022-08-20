import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Rate } from '../../../index'

describe('Rate', () => {
  test('should render correctly with no props', () => {
    render(<Rate />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    expect(screen.getByTestId('Rate')).toHaveClass('container')
  })

  test('should render correctly with attributes', () => {
    render(<Rate id="test-id" className="test-class" />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    expect(screen.getByTestId('Rate')).toHaveClass('test-class')
    expect(screen.getByTestId('Rate')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with disabled prop', () => {
    render(<Rate disabled />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    expect(screen.getByTestId('Rate')).toHaveClass('disabled')
  })

  test('should render correctly with allowHalf prop', () => {
    render(<Rate allowHalf defaultValue={1.5} count={2} />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    expect(screen.getAllByTestId('Icon')[0]).toHaveClass('half fill')
    expect(screen.getAllByTestId('Icon')[1]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[2]).toHaveClass('half fill')
    expect(screen.getAllByTestId('Icon')[3]).not.toHaveClass('half fill')
  })

  test('should render correctly with defaultValue prop', () => {
    render(<Rate defaultValue={3} />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    expect(screen.getAllByTestId('Icon')[0]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[1]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[2]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[3]).not.toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[4]).not.toHaveClass('fill')
  })

  test('should render correctly with value prop', () => {
    render(<Rate value={2} />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    expect(screen.getAllByTestId('Icon')[0]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[1]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[2]).not.toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[3]).not.toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[4]).not.toHaveClass('fill')
  })

  test('should render correctly with count prop', () => {
    const { rerender } = render(<Rate count={4} />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    expect(screen.getAllByTestId('Icon').length).toEqual(4)
    rerender(<Rate count={4} allowHalf />)
    expect(screen.getAllByTestId('Icon').length).toEqual(8)
  })

  test('should render correctly when hover mouse on stars', () => {
    render(<Rate count={2} />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    userEvent.hover(screen.getAllByTestId('Icon')[0])
    expect(screen.getAllByTestId('Icon')[0]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[1]).not.toHaveClass('fill')
    userEvent.hover(screen.getAllByTestId('Icon')[1])
    expect(screen.getAllByTestId('Icon')[0]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[1]).toHaveClass('fill')
    userEvent.unhover(screen.getAllByTestId('Icon')[1])
    expect(screen.getAllByTestId('Icon')[0]).not.toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[1]).not.toHaveClass('fill')
  })

  test('should execute onchangeCallback on stars click', () => {
    const onChangeCallback = jest.fn()
    render(<Rate onChange={onChangeCallback} />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    userEvent.click(screen.getAllByTestId('Icon')[2])
    expect(onChangeCallback).toBeCalledTimes(1)
    userEvent.click(screen.getAllByTestId('Icon')[4])
    expect(onChangeCallback).toBeCalledTimes(2)
  })

  test('should return value of rate on stars clicking', () => {
    const onChangeCallback = jest.fn(value => value)
    render(<Rate onChange={onChangeCallback} />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    userEvent.click(screen.getAllByTestId('Icon')[2])
    expect(onChangeCallback).toHaveReturnedWith(3)
  })

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn()
    const { rerender } = render(<Rate value={1} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Rate')).toMatchSnapshot()
    rerender(<Rate value={2} onChange={onChangeCallback} />)
    expect(screen.getAllByTestId('Icon')[0]).toHaveClass('fill')
    expect(screen.getAllByTestId('Icon')[1]).toHaveClass('fill')
    expect(onChangeCallback).toBeCalledTimes(0)
  })
})
