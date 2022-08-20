import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Select } from '../../../index'
import { Menu } from '@starleaguecompany/react-icons'
import { SelectOption } from '../../../types/Select.types'

const options: SelectOption[] = [
  { label: 'label 1', value: 1 },
  { label: 'label 2', value: 2 },
  { label: 'label 3', value: 3 },
]

const optionsDisabled: SelectOption[] = [
  { label: 'label 1', value: 1 },
  { label: 'label 2', value: 2, disabled: true },
  { label: 'label 3', value: 3 },
]

describe('Select', () => {
  test('should render correctly with no props', () => {
    render(<Select />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByTestId('Select')).toHaveClass('container', { exact: true })
    expect(screen.getByTestId('Select')).toContainElement(screen.getByRole('textbox'))
  })

  test('should render correctly with attributes', () => {
    render(<Select id="test-id" className="test-class" />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByTestId('Select')).toHaveClass('test-class')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with required option prop', () => {
    render(<Select options={options} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).not.toHaveValue()
    expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    expect(screen.queryByText('label 2')).not.toBeInTheDocument()
    expect(screen.queryByText('label 3')).not.toBeInTheDocument()
  })

  test('should render correctly with defaultValue prop', () => {
    render(<Select options={options} defaultValue={2} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveValue('label 2')
    expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    expect(screen.queryByText('label 3')).not.toBeInTheDocument()
  })

  test('should render correctly with value prop', () => {
    render(<Select options={options} value={2} defaultValue={3} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveValue('label 2')
    expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    expect(screen.queryByText('label 3')).not.toBeInTheDocument()
  })

  test('should render correctly with disabled prop', () => {
    render(<Select options={options} disabled placeholder="Test label" />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByTestId('TextInput')).toHaveClass('disabled')
    expect(screen.getByText('Test label')).toHaveClass('disabled')
  })

  test('should render correctly with invalid prop', () => {
    render(<Select options={options} invalid placeholder="Test label" />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveClass('invalid')
    expect(screen.getByTestId('TextInput')).toHaveClass('invalid')
    expect(screen.getByText('Test label')).toHaveClass('invalid')
  })

  test('should render correctly with mode prop', () => {
    render(<Select options={options} mode="multiple" />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.click(screen.getByText('label 2'))
    userEvent.click(screen.getByText('label 3'))
    expect(screen.getByRole('textbox')).toHaveDisplayValue('label 2, label 3')
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active')
    expect(screen.getByText('label 2').closest('.itemBase')).toHaveClass('active')
    expect(screen.getByText('label 3').closest('.itemBase')).toHaveClass('active')
  })

  test('should execute onChange callback when select value by click', async () => {
    const onChangeCallback = jest.fn()
    render(<Select options={options} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.click(await waitFor(() => screen.getByText('label 2')))
    expect(onChangeCallback).toBeCalledTimes(1)
  })

  test('should not execute onBlur callback when select value by click', async () => {
    const onBlurCallback = jest.fn()
    render(<Select options={options} onBlur={onBlurCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.click(await waitFor(() => screen.getByText('label 2')))
    expect(onBlurCallback).toBeCalledTimes(0)
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  test('should execute onChange callback when select value by Enter keydown', () => {
    const onChangeCallback = jest.fn()
    render(<Select options={options} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.keyboard('[ArrowDown]')
    userEvent.keyboard('[Enter]')
    expect(onChangeCallback).toBeCalledTimes(1)
  })

  test('should not execute onBlur callback when select value by Enter keydown', () => {
    const onBlurCallback = jest.fn()
    render(<Select options={options} onBlur={onBlurCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.keyboard('[ArrowDown]')
    userEvent.keyboard('[Enter]')
    expect(onBlurCallback).toBeCalledTimes(0)
  })

  test('should execute onFocus callback on focusing input', async () => {
    const onFocusCallback = jest.fn()
    render(<Select options={options} onFocus={onFocusCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(onFocusCallback).toBeCalledTimes(0)
    userEvent.click(screen.getByTestId('TextInput'))
    expect(onFocusCallback).toBeCalledTimes(1)
  })

  test('should execute onBlur callback on blurring input', async () => {
    const onBlurCallback = jest.fn()
    render(<Select options={options} onBlur={onBlurCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(onBlurCallback).toBeCalledTimes(0)
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.click(document.body)
    userEvent.click(document.body)
    expect(onBlurCallback).toBeCalledTimes(1)
  })

  test('should change display value on item click', () => {
    render(<Select options={options} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.click(screen.getByText('label 2'))
    expect(screen.getByRole('textbox')).toHaveDisplayValue('label 2')
  })

  test('should display list of option and have focus by click', async () => {
    render(<Select options={options} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    await waitFor(() => expect(screen.getByText('label 1')).toBeVisible())
    await waitFor(() => expect(screen.getByText('label 2')).toBeVisible())
    await waitFor(() => expect(screen.getByText('label 3')).toBeVisible())
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus())
  })

  test('should hide list of option and blur focus by click outside', async () => {
    const onBlurCallback = jest.fn()
    render(<Select options={options} onBlur={onBlurCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.click(document.body)
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('textbox')).not.toHaveFocus())
    expect(onBlurCallback).toBeCalledTimes(1)
  })

  test('should hide list of option and blur focus by Tab keypress', async () => {
    const onBlurCallback = jest.fn()
    render(<Select options={options} onBlur={onBlurCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.tab()
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('textbox')).not.toHaveFocus())
    expect(onBlurCallback).toBeCalledTimes(1)
  })

  test('should hide list of option and save focus by arrow click', async () => {
    render(<Select options={options} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.click(screen.getByTestId('ArrowDown'))
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus())
  })

  test('should hide list of option and save focus on Esc key down', async () => {
    const onBlurCallback = jest.fn()
    render(<Select options={options} onBlur={onBlurCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    expect(screen.getByRole('textbox')).toHaveFocus()
    userEvent.keyboard('{esc}')
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus())
    expect(onBlurCallback).toBeCalledTimes(0)
  })

  test('should hide list of option and blur focus on Tab key down', async () => {
    const onBlurCallback = jest.fn()
    render(<Select options={options} onBlur={onBlurCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    expect(screen.getByRole('textbox')).toHaveFocus()
    userEvent.tab()
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('textbox')).not.toHaveFocus())
    expect(onBlurCallback).toBeCalledTimes(1)
  })

  test('should correctly work keyboard navigation (arrow up, arrow down)', async () => {
    render(<Select options={options} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active')
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active')
    expect(screen.getByText('label 3').closest('.itemBase')).not.toHaveClass('active')
    userEvent.keyboard('[ArrowDown]')
    expect(screen.getByText('label 1').closest('.itemBase')).toHaveClass('active')
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active')
    expect(screen.getByText('label 3').closest('.itemBase')).not.toHaveClass('active')
    userEvent.keyboard('[ArrowUp]')
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active')
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active')
    expect(screen.getByText('label 3').closest('.itemBase')).toHaveClass('active')
  })

  test('should correctly change display value on Enter key down', () => {
    render(<Select options={options} defaultValue={2} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.keyboard('[ArrowDown]')
    userEvent.keyboard('[Enter]')
    expect(screen.getByRole('textbox')).toHaveDisplayValue('label 1')
  })

  test('should clear value by click on Cross icon', () => {
    render(<Select options={options} defaultValue={2} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.click(screen.getByTestId('Cross'))
    expect(screen.getByRole('textbox')).not.toHaveValue()
  })

  test('should render correctly with disabled items in options', () => {
    render(<Select options={optionsDisabled} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.keyboard('[ArrowDown]')
    userEvent.keyboard('[ArrowDown]')
    userEvent.keyboard('[Enter]')
    expect(screen.getByRole('textbox')).toHaveDisplayValue('label 3')
  })

  test('should render correctly with postfix prop', () => {
    render(<Select options={options} value={1} postfix="$" />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveValue('label 1')
    expect(screen.getByTestId('Select')).toHaveTextContent('label 1 $')
  })

  test('should render correctly with loading prop', () => {
    const { rerender } = render(<Select options={options} value={1} loading />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByTestId('Select')).toContainElement(screen.getByTestId('Spinner'))
    rerender(<Select options={options} value={1} />)
    expect(screen.getByTestId('Select')).not.toContainElement(screen.queryByTestId('Spinner'))
  })

  test('should render correctly with autoFocus prop', () => {
    render(<Select options={options} value={1} autoFocus />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('focused')
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  test('should render correctly with readOnly prop', async () => {
    render(<Select options={options} value={1} readOnly />)
    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    userEvent.click(screen.getByRole('textbox'))
    await waitFor(() => expect(screen.queryByTestId('Menu')).not.toBeInTheDocument())
  })

  test('should render correctly with icon prop', () => {
    render(<Select options={options} icon={<Menu />} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.getByTestId('Select')).toContainElement(screen.getByTestId('Icon'))
    expect(screen.getByTestId('Icon')).toContainElement(screen.getByTestId('Menu'))
  })

  test('should render correctly with placement prop', () => {
    render(<Select options={options} placement="bottom-end" fixedWidth />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByRole('textbox'))
    const popperPlacement = document.querySelector('[data-popper-placement="bottom-end"]')
    expect(popperPlacement).toBeInTheDocument()
  })

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn()
    const { rerender } = render(<Select options={options} value={1} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    rerender(<Select options={options} value={2} onChange={onChangeCallback} />)
    expect(screen.getByText('label 2')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('label 2')
    expect(onChangeCallback).toBeCalledTimes(0)
  })

  test('should render correctly on external options update', () => {
    const onChangeCallback = jest.fn()
    const { rerender } = render(<Select options={[]} value={1} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox')).not.toHaveValue('label 1')
    rerender(<Select options={options} value={1} />)
    expect(screen.getByText('label 1')).toBeVisible()
    expect(screen.getByRole('textbox')).toHaveValue('label 1')
    expect(onChangeCallback).toBeCalledTimes(0)
  })

  test('should render without Cross icon', () => {
    render(<Select options={options} defaultValue={2} withCrossIcon={false} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    expect(screen.getByTestId('ArrowDown')).toBeInTheDocument()
    expect(screen.queryByTestId('Cross')).not.toBeInTheDocument()
  })

  test('should toggle menu on click and keep focus', async () => {
    render(<Select options={options} />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    await waitFor(() => expect(screen.getByText('label 1')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('label 2')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('label 3')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus())
    userEvent.click(screen.getByTestId('TextInput'))
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus())
  })

  test('should lost focus on Tab keydown', () => {
    render(
      <>
        <Select options={options} />
        <Select options={options} />
      </>
    )

    expect(screen.getAllByTestId('Select')[0]).toMatchSnapshot()
    expect(screen.getAllByTestId('Select')[1]).toMatchSnapshot()
    userEvent.tab()
    expect(screen.getAllByRole('textbox')[0]).toHaveFocus()
    expect(screen.getAllByRole('textbox')[1]).not.toHaveFocus()
    userEvent.tab()
    expect(screen.getAllByRole('textbox')[0]).not.toHaveFocus()
    expect(screen.getAllByRole('textbox')[1]).toHaveFocus()
  })

  test('should check and uncheck item on Enter key down', () => {
    render(<Select options={options} mode="multiple" />)

    expect(screen.getByTestId('Select')).toMatchSnapshot()
    userEvent.click(screen.getByTestId('TextInput'))
    userEvent.keyboard('[ArrowDown]')
    userEvent.keyboard('[Enter]')
    expect(screen.getByRole('textbox')).toHaveDisplayValue('label 1')
    userEvent.keyboard('[Enter]')
    expect(screen.getByRole('textbox')).toHaveDisplayValue('')
  })
})
