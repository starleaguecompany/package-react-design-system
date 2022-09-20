import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Slider } from '../../../index';
import userEvent from '@testing-library/user-event';

describe('Slider', () => {
  test('should render correctly with no props', () => {
    render(<Slider />);

    expect(screen.getByTestId('Slider')).toMatchSnapshot();
    expect(screen.getByTestId('Slider')).toBeVisible();
  });

  test('should render correctly with attributes', () => {
    render(<Slider id="test-id" className="test-class" />);

    expect(screen.getByTestId('Slider')).toMatchSnapshot();
    expect(screen.getByTestId('Slider')).toHaveClass('test-class');
    expect(screen.getByTestId('Slider')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with disabled prop', () => {
    const { container } = render(<Slider disabled />);
    const inner = container.querySelector('.inner');
    const track = container.querySelector('.track');

    expect(screen.getByTestId('Slider')).toMatchSnapshot();
    expect(inner).toHaveClass('disabled');
    expect(track).toHaveClass('disabled');
  });

  test('should render correctly with value prop', () => {
    const { container } = render(<Slider value={60} />);
    const handler = container.querySelector('.handler');

    expect(screen.getByTestId('Slider')).toMatchSnapshot();
    expect(handler).toHaveStyle('margin-left: 60%');
  });

  test('should execute onChange callback on slider track click', async () => {
    const onChangeCallback = jest.fn(value => value);
    render(<Slider onChange={onChangeCallback} />);
    const inner = document.querySelector('.inner');

    expect(screen.getByTestId('Slider')).toMatchSnapshot();
    userEvent.click(inner);
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<Slider value={60} onChange={onChangeCallback} />);

    expect(screen.getByTestId('Slider')).toMatchSnapshot();
    rerender(<Slider value={70} onChange={onChangeCallback} />);
    expect(onChangeCallback).toBeCalledTimes(0);
  });
});
