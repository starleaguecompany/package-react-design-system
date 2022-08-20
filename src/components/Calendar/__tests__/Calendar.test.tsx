import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import startOfDay from 'date-fns/startOfDay'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import { MONTHS, DAYS_OF_WEEK } from '../../DateInput/constants/'

import { Calendar } from '..'

const now = new Date()

//Fixed date because tests cannot be performed on a dynamic date
const fixedDate = new Date('10.04.2021')
const tomorrow = startOfDay(addDays(fixedDate, 1))
const dayAfterTomorrow = startOfDay(addDays(fixedDate, 2))
const yesterday = startOfDay(addDays(fixedDate, -1))
const dayBeforeYesterday = startOfDay(addDays(fixedDate, -2))
const twoMonthAfter = startOfDay(addMonths(fixedDate, 2))

describe('Calendar', () => {
  test('should render correctly with no props', async () => {
    render(<Calendar />)

    expect(screen.getByTestId('Calendar')).toHaveClass('container', { exact: true })
    expect(screen.getByText(`${MONTHS[now.getMonth()]} ${now.getFullYear()}`)).toBeVisible()
    DAYS_OF_WEEK.forEach(day => {
      expect(screen.getByText(day)).toBeVisible()
    })
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('data-direction', 'prev')
    expect(screen.getAllByRole('button')[1]).toHaveAttribute('data-direction', 'next')
    expect(screen.getAllByRole('button')[0]).toBeVisible()
    expect(screen.getAllByRole('button')[1]).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Отмена' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Выбрать' })).not.toBeInTheDocument()
  })

  test('should render correctly with attributes', () => {
    render(<Calendar id="test-id" className="test-class" />)

    expect(screen.getByTestId('Calendar')).toHaveAttribute('id', 'test-id')
    expect(screen.getByTestId('Calendar')).toHaveClass('test-class')
  })

  test('should render with controls in footer (range mode)', async () => {
    render(<Calendar mode="range" />)

    expect(screen.getByTestId('Calendar')).toContainElement(screen.getByRole('button', { name: 'Выбрать' }))
    expect(screen.getByTestId('Calendar')).toContainElement(screen.getByRole('button', { name: 'Отмена' }))
    expect(screen.getByRole('button', { name: 'Отмена' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Выбрать' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Отмена' })).toHaveAttribute('disabled')
    expect(screen.getByRole('button', { name: 'Выбрать' })).toHaveAttribute('disabled')
  })

  test('should render correctly with selection prop (single mode)', () => {
    render(<Calendar selection={{ from: fixedDate, to: fixedDate }} />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    expect(screen.getByText(dayBeforeYesterday.getDate())).not.toHaveClass('active')
    expect(screen.getByText(yesterday.getDate())).not.toHaveClass('active')
    expect(screen.getByText(fixedDate.getDate())).toHaveClass('active')
    expect(screen.getByText(tomorrow.getDate())).not.toHaveClass('active')
    expect(screen.getByText(dayAfterTomorrow.getDate())).not.toHaveClass('active')
  })

  test('should render correctly with selection prop (range mode)', () => {
    render(<Calendar selection={{ from: fixedDate, to: tomorrow }} mode="range" />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    expect(screen.getByText(dayBeforeYesterday.getDate())).not.toHaveClass('active')
    expect(screen.getByText(yesterday.getDate())).not.toHaveClass('active')
    expect(screen.getByText(fixedDate.getDate())).toHaveClass('active')
    expect(screen.getByText(tomorrow.getDate())).toHaveClass('active')
    expect(screen.getByText(dayAfterTomorrow.getDate())).not.toHaveClass('active')
  })

  test('should render correctly Calendar with defaultDate prop', () => {
    render(<Calendar defaultDate={twoMonthAfter} />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    expect(screen.getByText('Декабрь 2021')).toBeVisible()
    expect(screen.getByText(twoMonthAfter.getDate())).toBeVisible()
    expect(screen.getByText(twoMonthAfter.getDate())).not.toHaveClass('active')
  })

  test('should execute onChange callback and return selection by click (single mode)', () => {
    const onChangeCallback = jest.fn(value => value)
    render(<Calendar selection={{ from: fixedDate, to: fixedDate }} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    userEvent.click(screen.getByText(tomorrow.getDate()))
    expect(onChangeCallback).toBeCalledTimes(1)
    expect(onChangeCallback).toReturnWith({ from: tomorrow, to: tomorrow })
  })

  test('should execute onChange callback and return selection by click (range mode)', () => {
    const onChangeCallback = jest.fn(value => value)
    render(<Calendar selection={{ from: fixedDate, to: fixedDate }} onChange={onChangeCallback} mode="range" />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    userEvent.click(screen.getByText(yesterday.getDate()))
    expect(onChangeCallback).toBeCalledTimes(0)
    userEvent.click(screen.getByText(tomorrow.getDate()))
    expect(onChangeCallback).toBeCalledTimes(0)
    userEvent.click(screen.getByRole('button', { name: 'Выбрать' }))
    expect(onChangeCallback).toBeCalledTimes(1)
    expect(onChangeCallback).toReturnWith({ from: yesterday, to: tomorrow })
  })

  test('should clear selection by click Chancel button (range mode)', () => {
    const onChangeCallback = jest.fn(value => value)
    render(<Calendar selection={{ from: fixedDate, to: fixedDate }} onChange={onChangeCallback} mode="range" />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    userEvent.click(screen.getByText(yesterday.getDate()))
    userEvent.click(screen.getByText(tomorrow.getDate()))
    userEvent.click(screen.getByRole('button', { name: 'Отмена' }))
    expect(onChangeCallback).toBeCalledTimes(1)
    expect(onChangeCallback).toReturnWith({ from: undefined, to: undefined })
    expect(screen.getByText(yesterday.getDate())).not.toHaveClass('active')
    expect(screen.getByText(fixedDate.getDate())).not.toHaveClass('active')
    expect(screen.getByText(tomorrow.getDate())).not.toHaveClass('active')
  })

  test('should render correctly with maxDate prop', () => {
    const onChangeCallback = jest.fn()
    render(<Calendar maxDate={fixedDate} selection={{ from: fixedDate, to: fixedDate }} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    expect(screen.getByText(fixedDate.getDate())).not.toHaveClass('disabled')
    expect(screen.getByText(tomorrow.getDate())).toHaveClass('disabled')
    userEvent.click(screen.getByText(tomorrow.getDate()))
    expect(onChangeCallback).toBeCalledTimes(0)
  })

  test('should render correctly with minDate prop', () => {
    const onChangeCallback = jest.fn()
    render(<Calendar minDate={fixedDate} selection={{ from: fixedDate, to: fixedDate }} onChange={onChangeCallback} />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    expect(screen.getByText(fixedDate.getDate())).not.toHaveClass('disabled')
    expect(screen.getByText(yesterday.getDate())).toHaveClass('disabled')
    userEvent.click(screen.getByText(yesterday.getDate()))
    expect(onChangeCallback).toBeCalledTimes(0)
  })

  test('should highlight the date when selecting it (single mode)', () => {
    render(<Calendar />)

    expect(screen.getByText('15')).not.toHaveClass('active')
    userEvent.click(screen.getByText('15'))
    expect(screen.getByText('15')).toHaveClass('active')
  })

  test('should highlight the dates range when selecting it (range mode)', () => {
    render(<Calendar mode="range" />)

    expect(screen.getByText('15')).not.toHaveClass('active')
    expect(screen.getByText('16')).not.toHaveClass('active')
    expect(screen.getByText('17')).not.toHaveClass('active')
    userEvent.click(screen.getByText('15'))
    userEvent.click(screen.getByText('17'))
    expect(screen.getByText('15')).toHaveClass('active')
    expect(screen.getByText('16')).toHaveClass('active')
    expect(screen.getByText('17')).toHaveClass('active')
  })

  test('should render correctly with rangeLimit prop', () => {
    render(<Calendar mode="range" rangeLimit={2} selection={{ from: fixedDate, to: fixedDate }} />)

    userEvent.click(screen.getByText(yesterday.getDate()))
    expect(screen.getByText(dayBeforeYesterday.getDate())).toHaveClass('disabled')
    expect(screen.getByText(yesterday.getDate())).not.toHaveClass('disabled')
    expect(screen.getByText(fixedDate.getDate())).not.toHaveClass('disabled')
    expect(screen.getByText(tomorrow.getDate())).not.toHaveClass('disabled')
    expect(screen.getByText(dayAfterTomorrow.getDate())).toHaveClass('disabled')
  })

  test('should render correctly with disabledIntervals prop', () => {
    render(
      <Calendar
        mode="range"
        disabledIntervals={[{ from: yesterday, to: tomorrow }]}
        selection={{ from: fixedDate, to: fixedDate }}
      />
    )

    expect(screen.getByText(dayBeforeYesterday.getDate())).not.toHaveClass('disabled')
    expect(screen.getByText(yesterday.getDate())).toHaveClass('disabled')
    expect(screen.getByText(fixedDate.getDate())).toHaveClass('disabled')
    expect(screen.getByText(tomorrow.getDate())).toHaveClass('disabled')
    expect(screen.getByText(dayAfterTomorrow.getDate())).not.toHaveClass('disabled')
  })

  test('should render previous/next month by clicking corresponding button', async () => {
    render(<Calendar selection={{ from: fixedDate, to: fixedDate }} />)

    expect(screen.getByTestId('Calendar')).toMatchSnapshot()
    userEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByText('Сентябрь 2021')).toBeVisible()
    userEvent.click(screen.getAllByRole('button')[1])
    userEvent.click(screen.getAllByRole('button')[1])
    expect(screen.getByText('Ноябрь 2021')).toBeVisible()
  })
})
