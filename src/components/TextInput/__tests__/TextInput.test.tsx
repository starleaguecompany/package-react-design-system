import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Menu } from '@starleaguecompany/react-icons'
import { TextInput } from '../../../index'

describe('TextInput', () => {
  test('should render correctly with no props', () => {
    render(<TextInput />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('container')
  })

  test('should render correctly with attributes', () => {
    render(<TextInput id="test-id" className="test-class" />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('test-class')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with value prop', () => {
    render(<TextInput value="Test text" />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveValue('Test text')
    expect(screen.getByText('Test text')).toBeVisible()
  })

  test('should render correctly with disabled prop', () => {
    const { container } = render(<TextInput placeholder="Test placeholder" disabled />)
    const disabled = container.querySelectorAll('.disabled')

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('disabled')
    expect(screen.getByText('Test placeholder')).toHaveClass('disabled')
    expect(disabled.length).toEqual(3)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  test('should render correctly with invalid prop', () => {
    const { container } = render(<TextInput invalid />)
    const invalid = container.querySelectorAll('.invalid')

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('invalid')
    expect(screen.getByRole('textbox')).toHaveClass('invalid')
    expect(invalid.length).toEqual(2)
  })

  test('should render correctly with loading prop', () => {
    const { container, rerender } = render(<TextInput loading />)
    const withIcon = container.querySelectorAll('.with-icon')

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toContainElement(screen.getByTestId('Spinner'))
    expect(withIcon.length).toEqual(1)
    rerender(<TextInput />)
    expect(screen.getByTestId('TextInput')).not.toContainElement(screen.queryByTestId('Spinner'))
  })

  test('should render correctly with icon prop', () => {
    const { container } = render(<TextInput icon={<Menu />} />)
    const withIcon = container.querySelectorAll('.with-icon')

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toContainElement(screen.getByTestId('Menu'))
    expect(withIcon.length).toEqual(1)
  })

  test('should render correctly with placeholder prop', () => {
    render(<TextInput placeholder="Test placeholder" />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByText('Test placeholder')).toBeVisible()
    expect(screen.getByText('Test placeholder')).toHaveClass('placeholder')
  })

  test('should render correctly with postfix prop', () => {
    render(<TextInput value="100" postfix="₽" />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveTextContent('100 ₽')
  })

  test('should render correctly with type prop', () => {
    render(<TextInput type="email" />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  test('should render correctly with readOnly prop', () => {
    render(<TextInput readOnly value="Test value" />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('New value')
    expect(screen.getByRole('textbox')).toHaveValue('Test value')
  })

  test('should execute onChange callback when typing', () => {
    const onChangeCallback = jest.fn()
    render(<TextInput value="Test value" onChange={onChangeCallback} />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('12345')
    expect(onChangeCallback).toHaveBeenCalledTimes(5)
  })

  test('should execute onFocus callback on click textInput', () => {
    const onFocusCallback = jest.fn()
    render(<TextInput onFocus={onFocusCallback} />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    expect(screen.getByRole('textbox')).toHaveFocus()
    expect(onFocusCallback).toHaveBeenCalledTimes(1)
  })

  test('should execute onBlur callback when blur focus', () => {
    const onBlurCallback = jest.fn()
    render(<TextInput onBlur={onBlurCallback} />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    userEvent.click(document.body)
    expect(screen.getByRole('textbox')).not.toHaveFocus()
    expect(onBlurCallback).toHaveBeenCalledTimes(1)
  })

  test('should render correctly with autoFocus prop', () => {
    const onFocusCallback = jest.fn()
    render(<TextInput autoFocus onFocus={onFocusCallback} />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('focused')
    expect(screen.getByRole('textbox')).toHaveFocus()
    expect(onFocusCallback).toHaveBeenCalledTimes(1)
  })

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn()
    const { rerender } = render(<TextInput value="123" onChange={onChangeCallback} />)

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    rerender(<TextInput value="1234" onChange={onChangeCallback} />)
    expect(screen.getByText('1234')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('1234')
    expect(onChangeCallback).toBeCalledTimes(0)
  })

  test('should change disabled attribute', () => {
    const { container, rerender } = render(<TextInput placeholder="Test placeholder" />)
    let disabled = container.querySelectorAll('.disabled')

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).not.toHaveClass('disabled')
    expect(screen.getByText('Test placeholder')).not.toHaveClass('disabled')
    expect(disabled.length).toEqual(0)
    expect(screen.getByRole('textbox')).not.toBeDisabled()

    rerender(<TextInput placeholder="Test placeholder" disabled />)
    disabled = container.querySelectorAll('.disabled')

    expect(screen.getByTestId('TextInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('disabled')
    expect(screen.getByText('Test placeholder')).toHaveClass('disabled')
    expect(disabled.length).toEqual(3)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
