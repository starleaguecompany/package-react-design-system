import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import startOfDay from 'date-fns/startOfDay';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';

import { Menu } from '@starleaguecompany/react-icons';
import { DateInput } from '../../..';

//Fixed date because tests cannot be performed on a dynamic date
const now = new Date('10.04.2021');
const tomorrow = startOfDay(addDays(now, 1));
const dayAfterTomorrow = startOfDay(addDays(now, 2));
const yesterday = startOfDay(addDays(now, -1));
const dayBeforeYesterday = startOfDay(addDays(now, -2));
const twoMonthAfter = startOfDay(addMonths(now, 2));

describe('DateInput', () => {
  test('should render correctly with no props', () => {
    render(<DateInput />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByTestId('DateInput')).toHaveClass('container', { exact: true });
    expect(screen.getByRole('textbox')).not.toHaveValue();
  });

  test('should render correctly with attributes', () => {
    render(<DateInput id="test-id" className="test-class" />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByTestId('DateInput')).toHaveClass('test-class');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly Input with defaultValue prop', () => {
    render(<DateInput defaultValue={now} />);
    const date = now.toLocaleDateString('ru-RU');

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByText(date)).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue(date);
  });

  test('should render correctly Calendar with defaultValue prop', async () => {
    render(<DateInput defaultValue={tomorrow} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => expect(screen.getByText(tomorrow.getDate())).toBeVisible());
    await waitFor(() => expect(screen.getByText(tomorrow.getDate())).toHaveClass('active'));
  });

  test('should render correctly Calendar with defaultDate prop', async () => {
    render(<DateInput defaultDate={twoMonthAfter} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => expect(screen.getByText('Декабрь 2021')).toBeVisible());
    await waitFor(() => expect(screen.getByText(twoMonthAfter.getDate())).toBeVisible());
    await waitFor(() => expect(screen.getByText(twoMonthAfter.getDate())).not.toHaveClass('active'));
  });

  test('should render correctly with value prop', () => {
    render(<DateInput value={now} />);
    const date = now.toLocaleDateString('ru-RU');

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByText(date)).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue(date);
  });

  test('should render correctly with disabled prop', () => {
    render(<DateInput disabled />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('should render correctly with dateFormat prop', () => {
    render(<DateInput value={now} dateFormat="dd MMMM" />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByText('04 октября')).toBeVisible();
  });

  test('should render correctly with placement prop', () => {
    render(<DateInput placement="right" />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    const calendarContainer = document.querySelector('[data-popper-placement="right"]');
    expect(calendarContainer).toBeInTheDocument();
  });

  test('should display calendar and focus input on click', async () => {
    const onFocus = jest.fn();
    render(<DateInput value={now} onFocus={onFocus} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).toHaveFocus();
    await waitFor(() => expect(screen.getByTestId('Calendar')).toBeVisible());
    await waitFor(() => expect(onFocus).toBeCalledTimes(1));
    await waitFor(() => expect(screen.getAllByRole('button')[0]).toHaveAttribute('data-direction', 'prev'));
    await waitFor(() => expect(screen.getAllByRole('button')[1]).toHaveAttribute('data-direction', 'next'));
    await waitFor(() => expect(screen.getAllByRole('button')[0]).toBeVisible());
    await waitFor(() => expect(screen.getAllByRole('button')[1]).toBeVisible());
    await waitFor(() => expect(screen.getByText('Октябрь 2021')).toBeVisible());
  });

  test('should hide calendar and blur on click outside', async () => {
    render(<DateInput />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(document.body);
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    await waitFor(() => expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument());
  });

  test('should highlight a single date in the Calendar by clicking on it', () => {
    render(<DateInput />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByText('15')).not.toHaveClass('active');
    userEvent.click(screen.getByText('15'));
    expect(screen.getByText('15')).toHaveClass('active');
  });

  test('should change value on calendar date click', async () => {
    render(<DateInput value={now} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => expect(screen.getByTestId('Calendar')).toBeVisible());
    userEvent.click(screen.getByText(tomorrow.getDate()));
    expect(screen.getByRole('textbox')).toHaveValue(format(tomorrow, 'dd.MM.yyyy'));
    await waitFor(() => expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument());
  });

  test('should execute onChange callback and return value on Choose date', () => {
    const onChangeCallback = jest.fn(value => value);
    render(<DateInput value={now} onChange={onChangeCallback} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(screen.getByText(tomorrow.getDate()));
    expect(onChangeCallback).toReturnWith({ from: tomorrow, to: tomorrow });
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  test('should execute onFocus callback on focus', () => {
    const onFocusCallback = jest.fn();
    render(<DateInput value={now} onFocus={onFocusCallback} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(onFocusCallback).toBeCalledTimes(1);
  });

  test('should render correctly with maxDate prop', () => {
    render(<DateInput maxDate={now} value={now} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByText(yesterday.getDate())).not.toHaveClass('disabled');
    expect(screen.getByText(now.getDate())).not.toHaveClass('disabled');
    expect(screen.getByText(tomorrow.getDate())).toHaveClass('disabled');
    userEvent.click(screen.getByText(tomorrow.getDate()));
    expect(screen.getByRole('textbox')).toHaveValue(format(now, 'dd.MM.yyyy'));
  });

  test('should render correctly with minDate prop', () => {
    render(<DateInput minDate={now} value={now} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByText(yesterday.getDate())).toHaveClass('disabled');
    expect(screen.getByText(now.getDate())).not.toHaveClass('disabled');
    expect(screen.getByText(tomorrow.getDate())).not.toHaveClass('disabled');
    userEvent.click(screen.getByText(yesterday.getDate()));
    expect(screen.getByRole('textbox')).toHaveValue(format(now, 'dd.MM.yyyy'));
  });

  test('should render correctly with invalid prop', () => {
    render(<DateInput value={now} invalid />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByTestId('TextInput')).toHaveClass('invalid');
    expect(screen.getByRole('textbox')).toHaveClass('invalid');
  });

  test('should render correctly with postfix prop', () => {
    render(<DateInput value={now} postfix="$" />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue(format(now, 'dd.MM.yyyy'));
    expect(screen.getByTestId('DateInput')).toHaveTextContent(`${format(now, 'dd.MM.yyyy')} $`);
  });

  test('should render correctly with readOnly prop', async () => {
    render(<DateInput value={now} readOnly />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    await waitFor(() => expect(screen.queryByTestId('Calendar')).not.toBeInTheDocument());
  });

  test('should render correctly with icon prop', () => {
    render(<DateInput value={now} icon={<Menu />} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByTestId('DateInput')).toContainElement(screen.getByTestId('Icon'));
    expect(screen.getByTestId('Icon')).toContainElement(screen.getByTestId('Menu'));
  });

  test('should render correctly with loading prop', () => {
    const { rerender } = render(<DateInput value={now} loading />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByTestId('DateInput')).toContainElement(screen.getByTestId('Spinner'));
    rerender(<DateInput value={now} />);
    expect(screen.getByTestId('DateInput')).not.toContainElement(screen.queryByTestId('Spinner'));
  });

  test('should render correctly with autoFocus prop', () => {
    render(<DateInput autoFocus />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByTestId('TextInput')).toHaveClass('focused');
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  test('should render correctly with label prop', () => {
    render(<DateInput label="Test label" value={now} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByText('Test label')).toBeVisible();
    expect(screen.getByText('Test label')).toHaveClass('placeholder filled', { exact: true });
  });

  test('should render correctly Input in range mode', () => {
    render(<DateInput value={{ from: yesterday, to: tomorrow }} mode="range" />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    const range = `${yesterday.toLocaleDateString('ru-RU')} — ${tomorrow.toLocaleDateString('ru-RU')}`;
    expect(screen.getByText(range)).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue(range);
  });

  test('should render correctly Calendar in range mode', () => {
    render(<DateInput value={{ from: yesterday, to: tomorrow }} mode="range" />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByText(dayBeforeYesterday.getDate())).not.toHaveClass('active');
    expect(screen.getByText(yesterday.getDate())).toHaveClass('active');
    expect(screen.getByText(now.getDate())).toHaveClass('active');
    expect(screen.getByText(tomorrow.getDate())).toHaveClass('active');
    expect(screen.getByText(dayAfterTomorrow.getDate())).not.toHaveClass('active');
  });

  test('should highlight dates range in Calendar when choose it (in range mode)', () => {
    render(<DateInput mode="range" value={now} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(screen.getByText(yesterday.getDate()));
    userEvent.click(screen.getByText(tomorrow.getDate()));
    expect(screen.getByText(dayBeforeYesterday.getDate())).not.toHaveClass('active');
    expect(screen.getByText(yesterday.getDate())).toHaveClass('active');
    expect(screen.getByText(now.getDate())).toHaveClass('active');
    expect(screen.getByText(tomorrow.getDate())).toHaveClass('active');
    expect(screen.getByText(dayAfterTomorrow.getDate())).not.toHaveClass('active');
  });

  test('should change value by clicking Choose date button in range mode', async () => {
    render(<DateInput mode="range" value={now} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    const range = `${yesterday.toLocaleDateString('ru-RU')} — ${tomorrow.toLocaleDateString('ru-RU')}`;
    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(screen.getByText(yesterday.getDate()));
    userEvent.click(screen.getByText(tomorrow.getDate()));
    userEvent.click(screen.getByRole('button', { name: 'Выбрать' }));
    expect(screen.getByText(range)).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue(range);
  });

  test('should render correctly with rangeLimit prop', () => {
    render(<DateInput mode="range" rangeLimit={2} value={now} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(screen.getByText(yesterday.getDate()));
    expect(screen.getByText(dayBeforeYesterday.getDate())).toHaveClass('disabled');
    expect(screen.getByText(yesterday.getDate())).not.toHaveClass('disabled');
    expect(screen.getByText(now.getDate())).not.toHaveClass('disabled');
    expect(screen.getByText(tomorrow.getDate())).not.toHaveClass('disabled');
    expect(screen.getByText(dayAfterTomorrow.getDate())).toHaveClass('disabled');
  });

  test('should render correctly with disabledIntervals prop', () => {
    render(<DateInput mode="range" disabledIntervals={[{ from: yesterday, to: tomorrow }]} value={now} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByText(dayBeforeYesterday.getDate())).not.toHaveClass('disabled');
    expect(screen.getByText(yesterday.getDate())).toHaveClass('disabled');
    expect(screen.getByText(now.getDate())).toHaveClass('disabled');
    expect(screen.getByText(tomorrow.getDate())).toHaveClass('disabled');
    expect(screen.getByText(dayAfterTomorrow.getDate())).not.toHaveClass('disabled');
  });

  test('should render correctly when value is updated from outside', () => {
    const { rerender } = render(<DateInput value={now} />);
    const dateNow = now.toLocaleDateString('ru-RU');
    const dateTomorrow = tomorrow.toLocaleDateString('ru-RU');

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByText(dateNow)).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue(dateNow);
    rerender(<DateInput value={tomorrow} />);
    expect(screen.getByText(dateTomorrow)).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue(dateTomorrow);
  });

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<DateInput value={now} onChange={onChangeCallback} />);
    const dateTomorrow = tomorrow.toLocaleDateString('ru-RU');

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    rerender(<DateInput value={tomorrow} onChange={onChangeCallback} />);
    expect(screen.getByText(dateTomorrow)).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue(dateTomorrow);
    expect(onChangeCallback).toBeCalledTimes(0);
  });

  test('should reset value by external setting undefine ', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<DateInput value={now} onChange={onChangeCallback} />);

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    rerender(<DateInput value={undefined} onChange={onChangeCallback} />);
    expect(screen.getByRole('textbox')).not.toHaveValue();
    expect(onChangeCallback).toBeCalledTimes(0);
  });

  test('should change display date when external dateFormat changed', () => {
    const { rerender } = render(<DateInput value={now} dateFormat="dd MMMM" />);
    const date = now.toLocaleDateString('ru-RU');

    expect(screen.getByTestId('DateInput')).toMatchSnapshot();
    expect(screen.getByText('04 октября')).toBeVisible();
    rerender(<DateInput value={now} dateFormat="dd.MM.yyyy" />);
    expect(screen.getByText(date)).toBeVisible();
  });
});
