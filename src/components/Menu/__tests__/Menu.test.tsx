import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Menu as IconMenu } from '@starleaguecompany/react-icons'
import { Menu, Icon, Checkbox } from '../../../index'

describe('Menu', () => {
  test('should render correctly with no props', () => {
    render(<Menu />)

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByTestId('Menu')).toHaveClass('container container direction-vertical', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<Menu id="test-id" className="test-class" />)

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByTestId('Menu')).toHaveClass('test-class')
    expect(screen.getByTestId('Menu')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with items', () => {
    render(
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu>
    )

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByTestId('Menu')).toHaveTextContent('Item 1Item 2Item 3')
    expect(screen.getByText('Item 1')).toBeVisible()
    expect(screen.getByText('Item 2')).toBeVisible()
    expect(screen.getByText('Item 3')).toBeVisible()
    expect(screen.getByText('Item 1')).toHaveClass('text')
    expect(screen.getByText('Item 2')).toHaveClass('text')
    expect(screen.getByText('Item 3')).toHaveClass('text')
  })

  test('should render correctly items with active prop', () => {
    render(
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item active>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu>
    )

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByText('Item 1').closest('.itemBase')).not.toHaveClass('active')
    expect(screen.getByText('Item 2').closest('.itemBase')).toHaveClass('active')
    expect(screen.getByText('Item 3').closest('.itemBase')).not.toHaveClass('active')
  })

  test('should render correctly items with disabled prop', () => {
    render(
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item disabled>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu>
    )

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByText('Item 1').closest('.itemBase')).not.toHaveClass('disabled')
    expect(screen.getByText('Item 2').closest('.itemBase')).toHaveClass('disabled')
    expect(screen.getByText('Item 3').closest('.itemBase')).not.toHaveClass('disabled')
  })

  test('should render correctly items with hint prop', () => {
    render(
      <Menu>
        <Menu.Item hint="Hint 1">Item 1</Menu.Item>
        <Menu.Item hint="Hint 2">Item 2</Menu.Item>
        <Menu.Item disabled hint="Hint 3">
          Item 3
        </Menu.Item>
      </Menu>
    )

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByTestId('Menu')).toHaveTextContent('Hint 1Item 1Hint 2Item 2Hint 3Item ')
    expect(screen.getByText('Hint 1')).toBeVisible()
    expect(screen.getByText('Hint 2')).toBeVisible()
    expect(screen.getByText('Hint 3')).toBeVisible()
    expect(screen.getByText('Hint 1')).toHaveClass('description')
    expect(screen.getByText('Hint 2')).toHaveClass('description')
    expect(screen.getByText('Hint 3')).toHaveClass('description disabled')
  })

  test('should render correctly items with description prop', () => {
    render(
      <Menu>
        <Menu.Item description="Description 1">Item 1</Menu.Item>
        <Menu.Item description="Description 2">Item 2</Menu.Item>
        <Menu.Item disabled description="Description 3">
          Item 3
        </Menu.Item>
      </Menu>
    )

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByTestId('Menu')).toHaveTextContent('Item 1Description 1Item 2Description 2Item 3Description 3')
    expect(screen.getByText('Description 1')).toBeVisible()
    expect(screen.getByText('Description 2')).toBeVisible()
    expect(screen.getByText('Description 3')).toBeVisible()
    expect(screen.getByText('Description 1')).toHaveClass('description')
    expect(screen.getByText('Description 2')).toHaveClass('description')
    expect(screen.getByText('Description 3')).toHaveClass('description disabled')
  })

  test('should render correctly items with icon prop', () => {
    const { container } = render(
      <Menu>
        <Menu.Item
          icon={
            <Icon>
              <IconMenu />
            </Icon>
          }
        >
          Item 1
        </Menu.Item>
        <Menu.Item
          icon={
            <Icon>
              <IconMenu />
            </Icon>
          }
        >
          Item 2
        </Menu.Item>
        <Menu.Item
          disabled
          icon={
            <Icon>
              <IconMenu />
            </Icon>
          }
        >
          Item 3
        </Menu.Item>
      </Menu>
    )

    expect(container).toMatchSnapshot()
    expect(screen.getByText('Item 1').closest('.itemBase')).toContainElement(screen.getAllByTestId('Menu')[1])
    expect(screen.getByText('Item 2').closest('.itemBase')).toContainElement(screen.getAllByTestId('Menu')[2])
    expect(screen.getByText('Item 3').closest('.itemBase')).toContainElement(screen.getAllByTestId('Menu')[3])
    expect(screen.getAllByTestId('Menu')[0]).toBeVisible()
    expect(screen.getAllByTestId('Menu')[1]).toBeVisible()
    expect(screen.getAllByTestId('Menu')[2]).toBeVisible()
  })

  test('should render correctly items with control prop', () => {
    render(
      <Menu>
        <Menu.Item control={<Checkbox />}>Item 1</Menu.Item>
        <Menu.Item control={<Checkbox />}>Item 2</Menu.Item>
        <Menu.Item disabled control={<Checkbox />}>
          Item 3
        </Menu.Item>
      </Menu>
    )

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByText('Item 1').closest('.itemBase')).toContainElement(screen.getAllByRole('checkbox')[0])
    expect(screen.getByText('Item 2').closest('.itemBase')).toContainElement(screen.getAllByRole('checkbox')[1])
    expect(screen.getByText('Item 3').closest('.itemBase')).toContainElement(screen.getAllByRole('checkbox')[2])
  })

  test('should render correctly items with value prop', () => {
    render(
      <Menu>
        <Menu.Item value="Value 1" control={<Checkbox />}>
          Item 1
        </Menu.Item>
        <Menu.Item value="Value 2" control={<Checkbox />}>
          Item 2
        </Menu.Item>
        <Menu.Item control={<Checkbox />}>Item 3</Menu.Item>
      </Menu>
    )

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('value', 'Value 1')
    expect(screen.getAllByRole('checkbox')[1]).toHaveAttribute('value', 'Value 2')
    expect(screen.getAllByRole('checkbox')[2]).toHaveAttribute('value', '')
  })

  test('should render correctly items in groups', () => {
    render(
      <Menu>
        <Menu.ItemGroup label="Group 1 label">
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup label="Group 2 label">
          <Menu.Item>Item 3</Menu.Item>
          <Menu.Item>Item 4</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    )

    expect(screen.getByTestId('Menu')).toMatchSnapshot()
    expect(screen.getByText('Group 1 label')).toBeVisible()
    expect(screen.getByText('Group 2 label')).toBeVisible()
    expect(screen.getByText('Group 1 label').closest('.itemGroup')).toContainElement(screen.getByText('Item 1'))
    expect(screen.getByText('Group 1 label').closest('.itemGroup')).toContainElement(screen.getByText('Item 2'))
    expect(screen.getByText('Group 2 label').closest('.itemGroup')).toContainElement(screen.getByText('Item 3'))
    expect(screen.getByText('Group 2 label').closest('.itemGroup')).toContainElement(screen.getByText('Item 4'))
  })
})
