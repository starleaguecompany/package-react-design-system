import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from '../../../index';

describe('Switch', () => {
  test('should render correctly with no props', () => {
    render(<Switch />);

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    expect(screen.getByTestId('Switch')).toHaveClass('container');
  });

  test('should render correctly with attributes', () => {
    render(<Switch id="test-id" className="test-class" />);

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    expect(screen.getByTestId('Switch')).toHaveClass('test-class');
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with label', () => {
    render(<Switch>Test switch</Switch>);

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    expect(screen.getByText('Test switch')).toBeVisible();
    expect(screen.getByText('Test switch')).toHaveClass('label');
  });

  test('should render correctly with checked prop', () => {
    const { container } = render(<Switch checked />);
    const checked = container.querySelectorAll('.checked');

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    expect(screen.getByTestId('Switch')).toHaveClass('checked');
    expect(checked.length).toEqual(3);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('should render correctly with disabled prop', () => {
    const { container } = render(<Switch disabled />);
    const disabled = container.querySelectorAll('.disabled');

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    expect(screen.getByTestId('Switch')).toHaveClass('disabled');
    expect(disabled.length).toEqual(3);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  test('should render correctly with name prop', () => {
    render(<Switch name="Test switch" />);

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'Test switch');
  });

  test('should render correctly with value prop', () => {
    render(<Switch value="5" />);

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    expect(screen.getByRole('checkbox')).toHaveAttribute('value', '5');
  });

  test('should render correctly with readOnly prop', () => {
    render(<Switch readOnly />);

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    expect(screen.getByTestId('Switch')).toHaveClass('readOnly');
  });

  test('should execute onChange callback on click switch', () => {
    const onChangeCallback = jest.fn();
    render(<Switch value="5" onChange={onChangeCallback} />);

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    userEvent.click(screen.getByRole('checkbox'));
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<Switch checked={false} onChange={onChangeCallback} />);

    expect(screen.getByTestId('Switch')).toMatchSnapshot();
    rerender(<Switch checked={true} onChange={onChangeCallback} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(onChangeCallback).toBeCalledTimes(0);
  });
});
