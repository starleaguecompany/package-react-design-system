import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { FONT_SIZES } from '../../../constants/sizes'
import { Text } from '../src/Text'

describe('Text', () => {
  test('should render correctly with no props', () => {
    const { container } = render(<Text />)

    expect(container).toMatchSnapshot()
    expect(container.firstChild).toHaveClass('size-14', { exact: true })
  })

  test('should render correctly with text', () => {
    const { container } = render(<Text>Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(container.firstChild).toHaveTextContent('Testing text')
    expect(screen.getByText('Testing text')).toBeVisible()
  })

  test('should render correctly with attributes', () => {
    const { container } = render(
      <Text id="test-id" className="test-class">
        Testing text
      </Text>
    )

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Testing text')).toHaveAttribute('id', 'test-id')
    expect(screen.getByText('Testing text')).toHaveClass('test-class')
  })

  test('should render correctly with paragraph element', () => {
    const { container } = render(<Text as="p">Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(container.firstChild.nodeName).toBe('P')
    expect(container.firstChild).toHaveTextContent('Testing text')
    expect(screen.getByText('Testing text')).toBeVisible()
  })

  test('should render correctly with div element', () => {
    const { container } = render(<Text as="div">Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(container.firstChild.nodeName).toBe('DIV')
    expect(container.firstChild).toHaveTextContent('Testing text')
    expect(screen.getByText('Testing text')).toBeVisible()
  })

  test('should render correctly with size prop', () => {
    const { container } = render(<Text size={FONT_SIZES.S10}>Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Testing text')).toHaveClass('size-10')
  })

  test('should render correctly with upper prop', () => {
    const { container } = render(<Text uppercase>Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Testing text')).toHaveClass('uppercase')
  })

  test('should render correctly with lower prop', () => {
    const { container } = render(<Text lowercase>Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Testing text')).toHaveClass('lowercase')
  })

  test('should render correctly with capitalize prop', () => {
    const { container } = render(<Text capitalize>Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Testing text')).toHaveClass('capitalize')
  })

  test('should render correctly with strong prop', () => {
    const { container } = render(<Text strong>Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Testing text')).toHaveClass('strong')
  })

  test('should render correctly with truncate prop', () => {
    const { container } = render(<Text truncate>Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Testing text')).toHaveClass('truncate')
  })

  test('should render correctly with lineThrough prop', () => {
    const { container } = render(<Text lineThrough>Testing text</Text>)

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Testing text')).toHaveClass('lineThrough')
  })
})
