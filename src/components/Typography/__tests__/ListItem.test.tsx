import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { ListItem } from '../index'
import { Icon } from '../../../index'
import { Menu } from '@starleaguecompany/react-icons'

describe('ListItem', () => {
  test('should render correctly with no props', () => {
    const { container } = render(<ListItem />)

    expect(container.firstChild).toMatchSnapshot()
    expect(container.firstChild).toHaveClass('item', { exact: true })
  })

  test('should render correctly with text', () => {
    render(<ListItem>Testing list item</ListItem>)

    expect(screen.getByRole('listitem')).toMatchSnapshot()
    expect(screen.getByRole('listitem')).toBeVisible()
    expect(screen.getByRole('listitem')).toHaveTextContent('Testing list item')
  })

  test('should render correctly with attributes', () => {
    render(
      <ListItem id="test-id" className="test-class">
        Testing list item
      </ListItem>
    )

    expect(screen.getByRole('listitem')).toMatchSnapshot()
    expect(screen.getByRole('listitem')).toHaveAttribute('id', 'test-id')
    expect(screen.getByRole('listitem')).toHaveClass('test-class')
  })

  test('should render correctly with icon', () => {
    render(<ListItem icon={<Icon icon={<Menu />} />}>Testing list item</ListItem>)

    expect(screen.getByRole('listitem')).toMatchSnapshot()
    expect(screen.getByTestId('Menu')).toBeVisible()
    expect(screen.getByRole('listitem')).toContainElement(screen.getByTestId('Menu'))
  })
})
