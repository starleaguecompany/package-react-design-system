import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { CONTENT_SIZES } from '../../../constants/sizes'
import { Spinner } from '../../../index'

describe('Spinner', () => {
  test('should render correctly with no props', () => {
    render(<Spinner />)

    expect(screen.getByTestId('Spinner')).toMatchSnapshot()
    expect(screen.getByTestId('Spinner')).toHaveClass('container size-20', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Spinner id="test-id" className="test-class" />)

    expect(screen.getByTestId('Spinner')).toMatchSnapshot()
    expect(screen.getByTestId('Spinner')).toHaveAttribute('id', 'test-id')
    expect(screen.getByTestId('Spinner')).toHaveClass('test-class')
  })

  test('should render correctly with size prop', () => {
    render(<Spinner size={CONTENT_SIZES.S24} />)

    expect(screen.getByTestId('Spinner')).toMatchSnapshot()
    expect(screen.getByTestId('Spinner')).toHaveClass('size-24')
  })

  test('should have svg inside ', () => {
    render(<Spinner size={CONTENT_SIZES.S24} />)

    expect(screen.getByTestId('Spinner')).toMatchSnapshot()
    expect(screen.getByTestId('Spinner').firstChild.nodeName).toEqual('svg')
  })
})
