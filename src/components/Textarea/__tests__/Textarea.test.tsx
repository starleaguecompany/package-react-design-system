import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Menu } from '@starleaguecompany/react-icons';
import { Textarea } from '../../../index';

describe('Textarea', () => {
  test('should render correctly with no props', () => {
    render(<Textarea />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByTestId('Textarea')).toHaveClass('container');
  });

  test('should render correctly with attributes', () => {
    render(<Textarea id="test-id" className="test-class" />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id');
    expect(screen.getByTestId('Textarea')).toHaveClass('test-class');
  });

  test('should render correctly with value prop', () => {
    render(<Textarea value="Test text" />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue('Test text');
    expect(screen.getByText('Test text')).toBeVisible();
  });

  test('should render correctly with disabled prop', () => {
    const { container } = render(<Textarea label="Test label" disabled />);
    const disabled = container.querySelectorAll('.disabled');

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByTestId('Textarea')).toHaveClass('disabled');
    expect(disabled.length).toEqual(3);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('should render correctly with invalid prop', () => {
    const { container } = render(<Textarea label="Test label" invalid />);
    const invalid = container.querySelectorAll('.invalid');

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByTestId('Textarea')).toHaveClass('invalid');
    expect(screen.getByRole('textbox')).toHaveClass('invalid');
    expect(invalid.length).toEqual(3);
  });

  test('should render correctly with loading prop', () => {
    render(<Textarea loading />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByTestId('Textarea')).toContainElement(screen.getByTestId('Spinner'));
    expect(screen.getByRole('textbox')).toHaveClass('with-icon');
  });

  test('should render correctly with icon prop', () => {
    render(<Textarea icon={<Menu />} />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByTestId('Textarea')).toContainElement(screen.getByTestId('Menu'));
    expect(screen.getByRole('textbox')).toHaveClass('with-icon');
  });

  test('should render correctly with placeholder prop', () => {
    render(<Textarea placeholder="Test placeholder" />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByText('Test placeholder')).toBeVisible();
    expect(screen.getByText('Test placeholder')).toHaveClass('placeholder');
  });

  test('should render correctly with readOnly prop', () => {
    render(<Textarea readOnly value="Test value" />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    userEvent.click(screen.getByRole('textbox'));
    userEvent.keyboard('New value');
    expect(screen.getByRole('textbox')).toHaveValue('Test value');
  });

  test('should render correctly with rows prop', () => {
    render(<Textarea rows={4} />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
  });

  test('should render correctly with resizable prop', () => {
    render(<Textarea resizable />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveClass('resize');
  });

  test('should execute onChange callback when typing', () => {
    const onChangeCallback = jest.fn();
    render(<Textarea value="Test value" onChange={onChangeCallback} />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    userEvent.keyboard('12345');
    expect(onChangeCallback).toHaveBeenCalledTimes(5);
  });

  test('should execute onFocus callback on click textarea', () => {
    const onFocusCallback = jest.fn();
    render(<Textarea onFocus={onFocusCallback} />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(onFocusCallback).toHaveBeenCalledTimes(1);
  });

  test('should execute onBlur callback when blur focus', () => {
    const onBlurCallback = jest.fn();
    render(<Textarea onBlur={onBlurCallback} />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(document.body);
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    expect(onBlurCallback).toHaveBeenCalledTimes(1);
  });

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<Textarea value="" onChange={onChangeCallback} />);

    expect(screen.getByTestId('Textarea')).toMatchSnapshot();
    rerender(<Textarea value="123" onChange={onChangeCallback} />);
    expect(screen.getByText('123')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('123');
    expect(onChangeCallback).toBeCalledTimes(0);
  });
});
