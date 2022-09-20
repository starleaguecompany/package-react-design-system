import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Menu } from '@starleaguecompany/react-icons';
import { Alert } from '../../../index';

describe('Alert', () => {
  test('should render correctly with no props', () => {
    render(<Alert />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toHaveClass('container color-dark', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Alert id="test-id" className="test-class" />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toHaveAttribute('id', 'test-id');
    expect(screen.getByTestId('Alert')).toHaveClass('test-class');
  });

  test('should render correctly with color property', () => {
    render(<Alert color="orange" />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toHaveClass('color-orange');
  });

  test('should render correctly with title prop', () => {
    render(<Alert title="Testing Alert title" />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toContainElement(screen.getByText('Testing Alert title'));
  });

  test('should render correctly with title and subtitle prop', () => {
    render(<Alert title="Testing Alert title" subtitle="Testing Alert subtitle" />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toContainElement(screen.getByText('Testing Alert title'));
    expect(screen.getByTestId('Alert')).toContainElement(screen.getByText('Testing Alert subtitle'));
  });

  test('should render correctly with icon prop', () => {
    render(<Alert icon={<Menu />} />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toContainElement(screen.getByTestId('Menu'));
    expect(screen.getByTestId('Menu')).toBeVisible();
  });

  test('should render correctly with children', () => {
    render(
      <Alert>
        <Menu />
      </Alert>
    );

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toContainElement(screen.getByTestId('Menu'));
    expect(screen.getByTestId('Menu')).toBeVisible();
  });

  test('should render correctly with footer prop', () => {
    render(<Alert footer={<Menu />} />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toContainElement(screen.getByTestId('Menu'));
    expect(screen.getByTestId('Menu')).toBeVisible();
  });

  test('should render correctly with closeable prop', () => {
    render(<Alert title="Testing Alert title" closable />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    expect(screen.getByTestId('Alert')).toContainElement(screen.getByTestId('Cross'));
    expect(screen.getByTestId('Cross')).toBeVisible();
  });

  test('should execute callback on close button click', () => {
    const closeCallback = jest.fn();
    render(<Alert closable onClose={closeCallback} />);

    expect(screen.getByTestId('Alert')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Cross'));
    expect(closeCallback).toBeCalledTimes(1);
    userEvent.click(screen.getByTestId('Alert'));
    expect(closeCallback).toBeCalledTimes(1);
  });
});
