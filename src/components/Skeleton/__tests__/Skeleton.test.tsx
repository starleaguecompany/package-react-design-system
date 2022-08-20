import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Skeleton } from '../index'

describe('Skeleton', () => {
  test('should render correctly with no props', () => {
    render(<Skeleton />)

    expect(screen.getByTestId('Skeleton')).toMatchSnapshot()
    expect(screen.getByTestId('Skeleton')).toHaveClass('container')
  })

  test('should render correctly with attributes', () => {
    render(<Skeleton id="test-id" className="test-class" />)

    expect(screen.getByTestId('Skeleton')).toMatchSnapshot()
    expect(screen.getByTestId('Skeleton')).toHaveClass('test-class')
    expect(screen.getByTestId('Skeleton')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly skeleton of Avatar', () => {
    const { container } = render(<Skeleton.Avatar data-qa="avatar" />)

    expect(container).toMatchSnapshot()
    expect(screen.getByTestId('avatar')).toHaveClass('avatar')
  })

  test('should render correctly skeleton of Button', () => {
    const { container } = render(<Skeleton.Button data-qa="button" />)

    expect(container).toMatchSnapshot()
    expect(screen.getByTestId('button')).toHaveClass('button')
  })

  test('should render correctly skeleton of Paragraph', () => {
    const { container } = render(<Skeleton.Paragraph data-qa="paragraph" />)

    expect(container).toMatchSnapshot()
    expect(screen.getByTestId('paragraph')).toHaveClass('paragraph')
  })

  test('should render correctly with width prop', () => {
    const { container } = render(<Skeleton.Paragraph data-qa="paragraph" width={65} />)

    expect(container).toMatchSnapshot()
    expect(screen.getByTestId('paragraph')).toHaveStyle('width: 65%')
  })

  test('should render correctly with block prop', () => {
    const { container } = render(<Skeleton.Button data-qa="button" block />)

    expect(container).toMatchSnapshot()
    expect(screen.getByTestId('button')).toHaveClass('block')
  })
})
