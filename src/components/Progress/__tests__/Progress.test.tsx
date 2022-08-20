import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Progress } from '../../../index'

describe('Progress', () => {
  test('should render correctly with no props', () => {
    render(<Progress />)

    expect(screen.getByTestId('Progress')).toMatchSnapshot()
    expect(screen.getByTestId('Progress')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Progress id="test-id" className="test-class" />)

    expect(screen.getByTestId('Progress')).toMatchSnapshot()
    expect(screen.getByTestId('Progress')).toHaveClass('test-class')
    expect(screen.getByTestId('Progress')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with percent prop', () => {
    const { container } = render(<Progress percent={50} />)
    const progressBar = container.querySelector('.progress') as HTMLElement

    expect(screen.getByTestId('Progress')).toMatchSnapshot()
    expect(screen.getByTestId('Progress')).toContainElement(progressBar)
    expect(progressBar).toHaveStyle('width: 50%')
  })
})
