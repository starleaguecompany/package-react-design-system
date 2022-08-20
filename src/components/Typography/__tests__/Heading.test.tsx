import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Heading } from '../src/Heading'

describe('Heading', () => {
  test('should render correctly with no props', () => {
    render(<Heading />)

    expect(screen.getByRole('heading')).toMatchSnapshot()
    expect(screen.getByRole('heading')).toHaveClass('container size-1', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Heading id="test-id" className="test-class" />)

    expect(screen.getByRole('heading')).toMatchSnapshot()
    expect(screen.getByRole('heading')).toHaveAttribute('id', 'test-id')
    expect(screen.getByRole('heading')).toHaveClass('test-class')
  })

  test('should render correctly with level prop', () => {
    render(<Heading level={4} />)

    expect(screen.getByRole('heading')).toMatchSnapshot()
    expect(screen.getByRole('heading')).toHaveClass('size-4')
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
  })

  test('should render correctly with text', () => {
    render(<Heading level={1}>Test heading</Heading>)

    expect(screen.getByRole('heading')).toMatchSnapshot()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test heading')
  })

  test('should render correctly with as prop', () => {
    render(
      <Heading level={1} as="div">
        Test heading
      </Heading>
    )

    expect(screen.getByText('Test heading')).toMatchSnapshot()
    expect(screen.getByText('Test heading').nodeName).toBe('DIV')
    expect(screen.getByText('Test heading')).toBeVisible()
  })
})
