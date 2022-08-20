import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { UnorderedList, ListItem } from '../index'

describe('UnorderedList', () => {
  test('should render correctly with no props', () => {
    const { container } = render(<UnorderedList />)

    expect(container).toMatchSnapshot()
    expect(container.firstChild).toHaveClass('unordered', { exact: true })
  })

  test('should render correctly with ListItem', () => {
    render(
      <UnorderedList>
        <ListItem>Testing list</ListItem>
      </UnorderedList>
    )

    expect(screen.getByRole('list')).toMatchSnapshot()
    expect(screen.getByRole('list')).toContainElement(screen.getByRole('list'))
    expect(screen.getByText('Testing list')).toBeVisible()
  })

  test('should render correctly with attributes', () => {
    render(
      <UnorderedList id="test-id" className="test-class">
        Testing list
      </UnorderedList>
    )

    expect(screen.getByRole('list')).toMatchSnapshot()
    expect(screen.getByRole('list')).toHaveAttribute('id', 'test-id')
    expect(screen.getByRole('list')).toHaveClass('test-class')
  })
})
