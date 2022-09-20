import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown, Button } from '../../..';
import { SelectOption } from '../../../types/Select.types';

const options: SelectOption[] = [
  { label: 'label 1', value: 1 },
  { label: 'label 2', value: 2 },
  { label: 'label 3', value: 3 },
];

const child = <Button>OK</Button>;

describe('Dropdown', () => {
  test('should render correctly with no props', () => {
    render(<Dropdown>{child}</Dropdown>);

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    expect(screen.getByTestId('Dropdown')).toBeVisible();
  });

  test('should render correctly with attributes', () => {
    render(
      <Dropdown id="test-id" className="test-class">
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    expect(screen.getByTestId('Dropdown')).toHaveClass('test-class');
    expect(screen.getByTestId('Dropdown')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with required option prop', () => {
    render(<Dropdown options={options}>{child}</Dropdown>);

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    expect(screen.getByRole('button')).toBeVisible();
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
    expect(screen.queryByText('label 2')).not.toBeInTheDocument();
    expect(screen.queryByText('label 3')).not.toBeInTheDocument();
  });

  test('should display list of option by click on dropdown element', async () => {
    render(<Dropdown options={options}>{child}</Dropdown>);

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('label 1')).toBeVisible());
    await waitFor(() => expect(screen.getByText('label 2')).toBeVisible());
    await waitFor(() => expect(screen.getByText('label 3')).toBeVisible());
  });

  test('should hide list of option by click outside', async () => {
    render(<Dropdown options={options}>{child}</Dropdown>);

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    userEvent.click(document.body);
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument());
  });

  test('should change active item in list of option on select it', () => {
    render(
      <Dropdown value={1} options={options}>
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByText('label 3'));
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).toHaveClass('active');
  });

  test('should render correctly with defaultValue prop', () => {
    render(
      <Dropdown defaultValue={2} options={options}>
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).not.toHaveClass('active');
  });

  test('should render correctly with value prop', () => {
    render(
      <Dropdown value={3} options={options}>
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).toHaveClass('active');
  });

  test('should render correctly with placement prop', () => {
    render(
      <Dropdown placement="left" options={options}>
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    const dropdownContainer = document.querySelector('[data-popper-placement="left"]');
    expect(dropdownContainer).toBeInTheDocument();
  });

  test('should execute onChangeCallback on select item', () => {
    const onChangeCallback = jest.fn(value => value);
    render(
      <Dropdown onChange={onChangeCallback} options={options}>
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    expect(onChangeCallback).toBeCalledTimes(0);
    userEvent.click(screen.getByText('label 3'));
    expect(onChangeCallback).toBeCalledTimes(1);
    expect(onChangeCallback).toReturnWith(3);
  });

  test('should return selected value on select item', () => {
    let value;
    render(
      <Dropdown onChange={e => (value = e)} options={options}>
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByText('label 3'));
    expect(value).toEqual(3);
  });

  test('should execute callbacks on open and on close dropdown', () => {
    const onOpenCallback = jest.fn();
    const onCloseCallback = jest.fn();
    render(
      <Dropdown onOpen={onOpenCallback} onClose={onCloseCallback} options={options}>
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    expect(onOpenCallback).toBeCalledTimes(0);
    expect(onCloseCallback).toBeCalledTimes(0);
    userEvent.click(screen.getByRole('button'));
    expect(onOpenCallback).toBeCalledTimes(1);
    expect(onCloseCallback).toBeCalledTimes(0);
    userEvent.click(document.body);
    expect(onCloseCallback).toBeCalledTimes(1);
  });

  test('should render correctly with mode prop', () => {
    render(
      <Dropdown options={options} mode="multiple">
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByText('label 2'));
    userEvent.click(screen.getByText('label 3'));
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).toHaveClass('active');
  });

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(
      <Dropdown options={options} value={1} onChange={onChangeCallback}>
        {child}
      </Dropdown>
    );

    expect(screen.getByTestId('Dropdown')).toMatchSnapshot();

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('label 1').closest('.itemBase')).toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).not.toHaveClass('active');

    rerender(
      <Dropdown options={options} value={2} onChange={onChangeCallback}>
        {child}
      </Dropdown>
    );

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).not.toHaveClass('active');
    expect(onChangeCallback).toBeCalledTimes(0);
  });
});
