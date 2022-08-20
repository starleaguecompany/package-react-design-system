import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Badge } from '../../../index'

describe('Badge', () => {
  test('should render correctly with no props', () => {
    render(<Badge />)

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByTestId('Badge')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Badge id="test-id" className="test-class" />)

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByTestId('Badge')).toHaveAttribute('id', 'test-id')
    expect(screen.getByTestId('Badge')).toHaveClass('test-class')
  })

  test('should render correctly with text', () => {
    render(<Badge>Testing badge</Badge>)

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByTestId('Badge')).toHaveTextContent('Testing badge')
    expect(screen.getByText('Testing badge')).toBeVisible()
    expect(screen.getByText('Testing badge')).toHaveClass('container')
  })

  test('should render correctly with text prop', () => {
    render(<Badge text="Testing badge" />)

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByText('Testing badge')).toBeVisible()
    expect(screen.getByTestId('Badge')).toHaveTextContent('Testing badge')
    expect(screen.getByText('Testing badge')).not.toHaveClass('container')
  })

  test('should render correctly with variant prop', () => {
    render(<Badge variant="primary" text="Testing badge" />)

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByText('Testing badge')).toHaveClass('color-gray-primary')
  })

  test('should render correctly with color prop', () => {
    render(<Badge color="green" text="Testing badge" />)

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByText('Testing badge')).toHaveClass('color-green-secondary')
  })

  test('should render correctly with shape prop', () => {
    render(<Badge shape="circle" text="Testing badge" />)

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByText('Testing badge')).toHaveClass('shape-circle')
  })

  test('should render correctly with placement prop', () => {
    render(
      <Badge text="Testing badge" placement="bottom-end">
        <div>Test child</div>
      </Badge>
    )

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByText('Testing badge')).toHaveClass('floating')
    expect(screen.getByText('Testing badge')).toHaveClass('floating-bottom-end')
  })

  test('should render correctly as dot', () => {
    render(<Badge />)

    expect(screen.getByTestId('Badge')).toMatchSnapshot()
    expect(screen.getByTestId('Badge').firstChild).toHaveClass('shape-dot')
  })
})
