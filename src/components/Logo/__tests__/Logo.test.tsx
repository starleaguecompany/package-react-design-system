import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Logo } from '..'

describe('Logo', () => {
  test('should render correctly without prop', () => {
    render(<Logo />)

    expect(screen.getByTestId('Logo')).toMatchSnapshot()
    expect(screen.getByTestId('Logo')).toHaveClass('container container direction-horizontal', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Logo id="test-id" className="test-class" />)

    expect(screen.getByTestId('Logo')).toMatchSnapshot()
    expect(screen.getByTestId('Logo')).toHaveClass('test-class')
    expect(screen.getByTestId('Logo')).toHaveAttribute('id', 'test-id')
  })
})
