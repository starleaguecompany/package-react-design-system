import * as React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Notifications, NotificationManager } from '../../../index'

describe('Notifications', () => {
  test('should render correctly with no props', () => {
    render(<Notifications />)

    expect(screen.getByTestId('Notifications')).toMatchSnapshot()
    expect(screen.getByTestId('Notifications')).toHaveClass('container', { exact: true })
  })

  test('should render correctly notification with text', async () => {
    const showNotification = () =>
      NotificationManager.show('Test notification title', 'Test notification subtitle', 'Test notification content')

    render(<Notifications />)

    expect(screen.queryByText('Test notification title')).not.toBeInTheDocument()
    expect(screen.queryByText('Test notification subtitle')).not.toBeInTheDocument()
    expect(screen.queryByText('Test notification content')).not.toBeInTheDocument()
    act(() => showNotification())
    expect(screen.getByTestId('Notifications')).toMatchSnapshot()
    await waitFor(() => expect(screen.getByText('Test notification title')).toBeVisible())
    await waitFor(() => expect(screen.getByText('Test notification subtitle')).toBeVisible())
    await waitFor(() => expect(screen.getByText('Test notification content')).toBeVisible())
    await waitFor(() => expect(screen.getByText('Test notification title')).toHaveClass('title'))
    await waitFor(() => expect(screen.getByText('Test notification subtitle')).toHaveClass('subtitle'))
    await waitFor(() => expect(screen.getByText('Test notification content')).toHaveClass('content'))
  })

  test('should hide notification on close icon click', async () => {
    const showNotification = () => NotificationManager.show('Test notification title 1', '', '')

    render(<Notifications />)

    act(() => showNotification())
    expect(screen.getByTestId('Notifications')).toMatchSnapshot()
    screen.getAllByTestId('Cross').forEach(iconClose => userEvent.click(iconClose))

    await waitFor(() => {
      expect(screen.queryByText('Test notification title 1')).not.toBeInTheDocument()
    })
  })

  test('should render correctly multiple notifications', async () => {
    const showNotification = (index: number) => NotificationManager.show(`Test notification title ${index}`, '', '')
    render(<Notifications />)

    act(() => showNotification(1))
    act(() => showNotification(2))
    act(() => showNotification(3))
    expect(screen.getByTestId('Notifications')).toMatchSnapshot()
    await waitFor(() => expect(screen.getByText('Test notification title 1')).toBeVisible())
    await waitFor(() => expect(screen.getByText('Test notification title 2')).toBeVisible())
    await waitFor(() => expect(screen.getByText('Test notification title 3')).toBeVisible())
  })

  test('should hide notification after timeout (with transition duration)', async () => {
    const showNotification = () => NotificationManager.show('Test notification title X', '', '', 250)
    render(<Notifications />)

    act(() => showNotification())
    expect(screen.getByTestId('Notifications')).toMatchSnapshot()

    await waitFor(
      () => {
        expect(screen.queryByText('Test notification title X')).not.toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })
})
