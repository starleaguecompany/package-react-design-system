import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Layout } from '..'

describe('Layout', () => {
  test('should render correctly without prop', () => {
    render(<Layout />)

    expect(screen.getByTestId('Layout')).toMatchSnapshot()
    expect(screen.getByTestId('Layout')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Layout id="test-id" className="test-class" />)

    expect(screen.getByTestId('Layout')).toMatchSnapshot()
    expect(screen.getByTestId('Layout')).toHaveClass('test-class')
    expect(screen.getByTestId('Layout')).toHaveAttribute('id', 'test-id')
  })
})
