import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Menu } from '@starleaguecompany/react-icons'

import { NumberInput } from '../../..'

describe('NumberInput', () => {
  test('should render correctly with no props', () => {
    render(<NumberInput />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByTestId('NumberInput')).toHaveClass('container')
  })

  test('should render correctly with attributes', () => {
    render(<NumberInput id="test-id" className="test-class" />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByTestId('NumberInput')).toHaveClass('test-class')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with value prop', () => {
    render(<NumberInput value={10} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveValue('10')
    expect(screen.getByText('10')).toBeVisible
  })

  test('should render correctly with defaultValue prop', () => {
    render(<NumberInput defaultValue={10} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveValue('10')
    expect(screen.getByText('10')).toBeVisible
  })

  test('should render correctly with postfix prop', () => {
    render(<NumberInput value={10} postfix="₽" />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByText('₽')).toBeVisible()
    expect(screen.getByText('₽')).toHaveClass('inputPostfix')
    expect(screen.getByTestId('NumberInput')).toHaveTextContent('10 ₽')
  })

  test('should render correctly with disabled prop', () => {
    const { container } = render(<NumberInput disabled />)
    const disabledElements = container.querySelectorAll('.disabled')

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('disabled')
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('textbox')).toHaveClass('disabled')
    expect(disabledElements.length).toEqual(2)
  })

  test('should render correctly with invalid prop', () => {
    const { container } = render(<NumberInput invalid />)
    const invalidElements = container.querySelectorAll('.invalid')

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('invalid')
    expect(screen.getByRole('textbox')).toHaveClass('invalid')
    expect(invalidElements.length).toEqual(2)
  })

  test('should render correctly with format prop', () => {
    render(<NumberInput value={31122021} format="##/##/####" />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByText('31/12/2021')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('31/12/2021')
  })

  test('should render correctly with readOnly prop', () => {
    render(<NumberInput value={50} readOnly />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('[Backspace]')
    expect(screen.getByRole('textbox')).toHaveValue('50')
  })

  test('should render correctly with max prop', () => {
    render(<NumberInput max={100} value={150} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByText('100')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('100')
  })

  test('should render correctly with min prop', () => {
    render(<NumberInput min={100} value={50} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByText('100')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('100')
  })

  test('should render correctly with step prop (step < 1)', () => {
    render(<NumberInput step={0.1} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('12.123')
    expect(screen.getByText('12,123')).toBeVisible()
    userEvent.click(document.body)
    expect(screen.getByText('12,1')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('12,1')
  })

  test('should render correctly with step prop (step > 1)', () => {
    render(<NumberInput step={10} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('128')
    userEvent.click(document.body)
    expect(screen.getByText('130')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('130')
  })

  test('should render correctly with decimalSeparator prop', () => {
    render(<NumberInput decimalSeparator="," />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('10.123')
    userEvent.click(document.body)
    expect(screen.getByText('10,123')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('10,123')
  })

  test('should allow to input only digits, comma and dot', () => {
    render(<NumberInput value={10} min={0} max={100} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('abc ,.5')
    expect(screen.getByText('10,5')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('10,5')
  })

  test('should render correctly on update value', () => {
    const onChangeCallback = jest.fn()
    const { rerender } = render(<NumberInput value={50} decimalSeparator="," onChange={onChangeCallback} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    rerender(<NumberInput value={150.1} decimalSeparator="," onChange={onChangeCallback} />)
    expect(screen.getByText('150,1')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('150,1')
    expect(onChangeCallback).toBeCalledTimes(0)
  })

  test('should execute onChange callback on input value', () => {
    const onChangeCallback = jest.fn(value => value)
    render(<NumberInput onChange={onChangeCallback} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('1,23')
    expect(onChangeCallback).toBeCalledTimes(3)
    expect(onChangeCallback).toReturnWith(1)
    expect(onChangeCallback).toReturnWith(1.2)
    expect(onChangeCallback).toReturnWith(1.23)
  })

  test('should render correctly with undefined value', () => {
    const onChangeCallback = jest.fn(value => value)
    render(<NumberInput onChange={onChangeCallback} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveValue('')
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('1')
    userEvent.keyboard('[Backspace]')
    expect(onChangeCallback).toBeCalledTimes(2)
    expect(onChangeCallback).toReturnWith(1)
    expect(onChangeCallback).toReturnWith(undefined)
  })

  test('should render correctly with loading prop', () => {
    const { rerender } = render(<NumberInput loading />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByTestId('NumberInput')).toContainElement(screen.getByTestId('Spinner'))
    rerender(<NumberInput />)
    expect(screen.getByTestId('NumberInput')).not.toContainElement(screen.queryByTestId('Spinner'))
  })

  test('should render correctly with icon prop', () => {
    render(<NumberInput icon={<Menu />} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByTestId('NumberInput')).toContainElement(screen.getByTestId('Icon'))
    expect(screen.getByTestId('Icon')).toContainElement(screen.getByTestId('Menu'))
  })

  test('should render correctly with autoFocus prop', () => {
    render(<NumberInput autoFocus />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('focused')
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  test('should render correctly with thousandSeparator prop', () => {
    render(<NumberInput value={123456789} thousandSeparator=" " />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByText('123 456 789')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('123 456 789')
  })

  test('should render correctly with decimalScale prop', () => {
    render(<NumberInput value={12.34444} decimalScale={2} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByText('12,34')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('12,34')
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard('[Backspace]')
    expect(screen.getByText('12,30')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('12,30')
  })

  test('should render correctly with fixedDecimalScale prop', () => {
    render(<NumberInput value={100} decimalScale={1} fixedDecimalScale={false} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByText('100')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('100')
    userEvent.click(screen.getByRole('textbox'))
    userEvent.keyboard(',12345')
    expect(screen.getByText('100,1')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('100,1')
    userEvent.keyboard('[Backspace]')
    userEvent.keyboard('[Backspace]')
    expect(screen.getByText('100')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('100')
  })

  test('should format input value on blur', async () => {
    const onChangeCallback = jest.fn(value => value)
    render(<NumberInput min={0} max={100} onChange={onChangeCallback} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    userEvent.type(screen.getByRole('textbox'), '200')
    userEvent.click(document.body)
    await waitFor(() => expect(onChangeCallback).toBeCalledTimes(4))
    await waitFor(() => expect(onChangeCallback).toHaveLastReturnedWith(100))
  })

  test('should format value on enter key press', async () => {
    const onKeyPressCallback = jest.fn(v => v)
    render(<NumberInput onKeyPress={onKeyPressCallback} max={100} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    userEvent.keyboard('[Enter]')
    expect(onKeyPressCallback).toBeCalledTimes(0)
    await userEvent.type(screen.getByRole('textbox'), '200{enter}', { delay: 5 })
    //TODO: fix when testing-library/user-event is updated
    //https://github.com/testing-library/user-event/issues/766
    // await waitFor(() => expect(onKeyPressCallback).toBeCalledTimes(4))
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue('100'))
  })

  test('should reset value', async () => {
    const { rerender } = render(<NumberInput value={500} />)

    expect(screen.getByTestId('NumberInput')).toMatchSnapshot()
    expect(screen.getByText('500')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('500')

    rerender(<NumberInput value={undefined} />)
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue(''))
  })
})
