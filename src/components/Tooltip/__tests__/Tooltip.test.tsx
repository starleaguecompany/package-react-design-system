import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { Tooltip } from '../../../index'
import userEvent from '@testing-library/user-event'

describe('Tooltip', () => {
  test('should render correctly with no props', async () => {
    render(
      <Tooltip>
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    expect(screen.getByText('Test tooltip')).toHaveAttribute('tabindex', '0')
  })

  test('should render correctly with attributes', async () => {
    render(
      <Tooltip id="test-id" className="test-class">
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    expect(screen.getByTestId('Tooltip')).toHaveClass('test-class')
    expect(screen.getByTestId('Tooltip')).toHaveAttribute('id', 'test-id')
    expect(screen.getByText('Test tooltip')).toBeVisible()
  })

  test('should render correctly with title and visible on hover', async () => {
    render(
      <Tooltip title="Tooltip title">
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    userEvent.unhover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.queryByText('Tooltip title')).not.toBeInTheDocument())
    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByText('Tooltip title')).toBeVisible())
  })

  test('should render correctly with content and visible on hover', async () => {
    render(
      <Tooltip content="Tooltip content">
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    userEvent.unhover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument())
    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByText('Tooltip content')).toBeVisible())
  })

  test('should render correctly with footer and visible on hover', async () => {
    render(
      <Tooltip footer="Tooltip footer">
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    userEvent.unhover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.queryByText('Tooltip footer')).not.toBeInTheDocument())
    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByText('Tooltip footer')).toBeVisible())
  })

  test('should render correctly with width and visible on hover', async () => {
    render(
      <Tooltip width={400}>
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    expect(screen.getByTestId('Tooltip')).toHaveStyle('width: 400px')
  })

  test('should render correctly with placement prop', async () => {
    render(
      <Tooltip title="Tooltip title" placement="right">
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    const bottomTooltip = document.querySelector('[data-popper-placement="right"]')
    expect(bottomTooltip).toBeInTheDocument()
  })

  test('should hide tooltip on end of hover', async () => {
    render(
      <Tooltip title="Title">
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    userEvent.unhover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.queryByText('Title')).not.toBeInTheDocument())
  })

  test('should render correctly with closable prop', async () => {
    render(
      <Tooltip title="Title" closable>
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    expect(screen.getByTestId('Tooltip')).toContainElement(screen.getByTestId('Cross'))
  })

  test('should execute callback on clicking cross icon', async () => {
    const handleClose = jest.fn()

    render(
      <Tooltip title="Title" onClose={handleClose} closable>
        <span>Test tooltip</span>
      </Tooltip>
    )

    userEvent.hover(screen.getByText('Test tooltip'))
    await waitFor(() => expect(screen.getByTestId('Tooltip')).toMatchSnapshot())
    userEvent.unhover(screen.getByText('Test tooltip'))
    expect(handleClose).toBeCalledTimes(0)
    userEvent.hover(screen.getByText('Test tooltip'))
    userEvent.click(screen.getByTestId('Cross'))
    expect(handleClose).toBeCalledTimes(1)
  })
})
