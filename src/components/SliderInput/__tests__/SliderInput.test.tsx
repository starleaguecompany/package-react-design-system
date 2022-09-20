import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SliderInput } from '../../../index';
import { Menu } from '@starleaguecompany/react-icons';

describe('SliderInput', () => {
  test('should render correctly with no props', () => {
    render(<SliderInput />);

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByTestId('SliderInput')).toHaveClass('container');
  });

  test('should render correctly with attributes', () => {
    render(<SliderInput id="test-id" className="test-class" />);

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByTestId('SliderInput')).toHaveClass('test-class');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with value prop', () => {
    const { container } = render(<SliderInput value={10} />);
    const handler = container.querySelector('.handler');

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue('10');
    expect(screen.getByText('10')).toBeVisible;
    expect(handler).toHaveStyle('margin-left: 10%');
  });

  test('should render correctly with defaultValue prop', () => {
    const { container } = render(<SliderInput defaultValue={10} />);
    const handler = container.querySelector('.handler');

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue('10');
    expect(screen.getByText('10')).toBeVisible;
    expect(handler).toHaveStyle('margin-left: 10%');
  });

  test('should render correctly with postfix prop', () => {
    render(<SliderInput value={10} postfix="₽" />);

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByText('₽')).toBeVisible();
    expect(screen.getByText('₽')).toHaveClass('inputPostfix');
    expect(screen.getByTestId('SliderInput')).toHaveTextContent('10 ₽');
  });

  test('should render correctly with disabled prop', () => {
    const { container } = render(<SliderInput disabled />);
    const disabledElements = container.querySelectorAll('.disabled');

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByTestId('TextInput')).toHaveClass('disabled');
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveClass('disabled');
    expect(disabledElements.length).toEqual(4);
  });

  test('should render correctly with invalid prop', () => {
    const { container } = render(<SliderInput invalid />);
    const invalidElements = container.querySelectorAll('.invalid');

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByTestId('TextInput')).toHaveClass('invalid');
    expect(screen.getByRole('textbox')).toHaveClass('invalid');
    expect(invalidElements.length).toEqual(2);
  });

  test('should render correctly with readOnly prop', () => {
    const { container } = render(<SliderInput value={50} readOnly />);
    const inner = container.querySelector('.inner');

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    userEvent.click(inner);
    expect(screen.getByRole('textbox')).toHaveValue('50');
  });

  test('should render correctly with max prop', () => {
    const { container, rerender } = render(<SliderInput max={100} value={150} />);
    const handler = container.querySelector('.handler');

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(handler).toHaveStyle('margin-left: 100%');
    rerender(<SliderInput max={100} value={100} />);
    expect(handler).toHaveStyle('margin-left: 100%');
    rerender(<SliderInput max={100} value={99} />);
    expect(handler).toHaveStyle('margin-left: 99%');
  });

  test('should render correctly with min prop', () => {
    const { container, rerender } = render(<SliderInput min={100} value={50} max={200} />);
    const handler = container.querySelector('.handler');

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(handler).toHaveStyle('margin-left: 0%');
    rerender(<SliderInput min={100} value={100} max={200} />);
    expect(handler).toHaveStyle('margin-left: 0%');
    rerender(<SliderInput min={100} value={101} max={200} />);
    expect(handler).toHaveStyle('margin-left: 1%');
  });

  test('should execute onChange callback on input value', async () => {
    const onChangeCallback = jest.fn();
    const { container } = render(<SliderInput value={5} onChange={onChangeCallback} />);
    const handler = container.querySelector('.handler');

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(onChangeCallback).toBeCalledTimes(0);
    userEvent.click(screen.getByRole('textbox'));
    userEvent.keyboard('0');
    await waitFor(() => expect(onChangeCallback).toBeCalledTimes(1));
    expect(screen.getByRole('textbox')).toHaveValue('50');
    expect(handler).toHaveStyle('margin-left: 50%');
  });

  test('should render correctly with loading prop', () => {
    const { rerender } = render(<SliderInput loading />);

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByTestId('SliderInput')).toContainElement(screen.getByTestId('Spinner'));
    rerender(<SliderInput />);
    expect(screen.getByTestId('SliderInput')).not.toContainElement(screen.queryByTestId('Spinner'));
  });

  test('should render correctly with autoFocus prop', () => {
    render(<SliderInput autoFocus />);

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByTestId('TextInput')).toHaveClass('focused');
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  test('should render correctly with icon prop', () => {
    render(<SliderInput icon={<Menu />} />);

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    expect(screen.getByTestId('SliderInput')).toContainElement(screen.getByTestId('Icon'));
    expect(screen.getByTestId('Icon')).toContainElement(screen.getByTestId('Menu'));
  });

  test('should render correctly on update value', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<SliderInput value={50} onChange={onChangeCallback} />);

    expect(screen.getByTestId('SliderInput')).toMatchSnapshot();
    rerender(<SliderInput value={90} onChange={onChangeCallback} />);
    expect(screen.getByText('90')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('90');
    expect(onChangeCallback).toBeCalledTimes(0);
  });
});
