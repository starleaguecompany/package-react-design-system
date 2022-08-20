import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Link } from '../src/Link'

describe('Link', () => {
  test('should render correctly with no props', () => {
    const { container } = render(<Link />)

    expect(container.firstChild).toMatchSnapshot()
    expect(container.firstChild).toHaveClass('container color-blue', { exact: true })
  })

  test('should render correctly with text', () => {
    render(<Link href="#">Testing link</Link>)

    expect(screen.getByRole('link')).toMatchSnapshot()
    expect(screen.getByRole('link', { name: 'Testing link' })).toBeVisible()
  })

  test('should render correctly with color prop', () => {
    render(
      <Link href="#" color="black">
        Testing link
      </Link>
    )

    expect(screen.getByRole('link')).toMatchSnapshot()
    expect(screen.getByRole('link', { name: 'Testing link' })).toHaveClass('color-black')
  })

  test('should render correctly with strong prop', () => {
    render(
      <Link href="#" strong>
        Testing link
      </Link>
    )

    expect(screen.getByRole('link')).toMatchSnapshot()
    expect(screen.getByRole('link', { name: 'Testing link' })).toHaveClass('strong')
  })

  test('should render correctly with attributes', () => {
    render(
      <Link id="test-id" className="test-class" href="https://test.ru">
        Testing link
      </Link>
    )

    expect(screen.getByRole('link', { name: 'Testing link' })).toMatchSnapshot()
    expect(screen.getByRole('link', { name: 'Testing link' })).toHaveClass('test-class')
    expect(screen.getByRole('link', { name: 'Testing link' })).toHaveAttribute('id', 'test-id')
    expect(screen.getByRole('link', { name: 'Testing link' })).toHaveAttribute('href', 'https://test.ru')
  })
})
