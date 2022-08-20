import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Portal } from '../../../index'

describe('Portal', () => {
  test('should render correctly with content', () => {
    render(<Portal>Test portal</Portal>)

    expect(screen.getByText('Test portal')).toMatchSnapshot()
    expect(screen.getByText('Test portal')).toBeVisible()
  })

  test('should be not a child of container element', () => {
    render(
      <div data-qa="container">
        <Portal>Test portal</Portal>
      </div>
    )

    expect(screen.getByText('Test portal')).toMatchSnapshot()
    expect(screen.getByTestId('container')).not.toContainElement(screen.getByText('Test portal'))
  })
})
