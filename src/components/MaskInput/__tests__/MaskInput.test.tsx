import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MaskInput } from '..';
import { Menu } from '@starleaguecompany/react-icons';

describe('MaskInput', () => {
  test('should render correctly with no props', () => {
    render(<MaskInput />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByTestId('MaskInput')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeVisible();
  });

  test('should render correctly with attributes', () => {
    render(<MaskInput id="test-id" className="test-class" />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByTestId('MaskInput')).toHaveClass('test-class');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id');
  });

  test('should focused input field on click', () => {
    const { container } = render(<MaskInput label="Test label" mask="999-999" />);
    const input = container.querySelector('[data-qa="TextInput"]');

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(input).toHaveClass('active');
    expect(screen.getByRole('textbox')).toHaveClass('active');
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(screen.getByText('Test label')).toHaveClass('active');
  });

  test('should render correctly with disabled prop', () => {
    render(<MaskInput label="Test label" mask="999-999" disabled />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByTestId('TextInput')).toHaveClass('disabled');
    expect(screen.getByRole('textbox')).toHaveClass('disabled');
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByText('Test label')).toHaveClass('disabled');
  });

  test('should render correctly with invalid prop', () => {
    render(<MaskInput placeholder="Test placeholder" mask="999-999" invalid />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByTestId('TextInput')).toHaveClass('invalid');
    expect(screen.getByRole('textbox')).toHaveClass('invalid');
    expect(screen.getByRole('textbox')).toHaveClass('invalid');
    expect(screen.getByText('Test placeholder')).toHaveClass('invalid');
  });

  test('should render correctly with value prop', () => {
    render(<MaskInput value="123-456" />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByText('123-456')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('123-456');
  });

  test('should render correctly with defaultValue prop', () => {
    render(<MaskInput defaultValue="0" />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByText('0')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  test('should render correctly with placeholder prop', () => {
    render(<MaskInput placeholder="Test placeholder" mask="999-999" />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByText('Test placeholder')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('should render correctly with required mask prop', () => {
    render(<MaskInput mask="999-999" value="123456789" />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByText('123-456')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('123-456');
  });

  test('should render correctly input value with mask', () => {
    render(<MaskInput mask="999-999" value="abc123456def" />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByText('123-456')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('123-456');
  });

  test('should execute onChange callback on keyboard typing', () => {
    const onChangeCallback = jest.fn(event => event.currentTarget.value);
    render(<MaskInput mask="999-999" onChange={onChangeCallback} />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    userEvent.keyboard('123456');
    expect(onChangeCallback).toBeCalledTimes(7);
    expect(onChangeCallback).toHaveReturnedTimes(7);
  });

  test('should render correctly when icon prop', () => {
    render(<MaskInput mask="999-999" icon={<Menu />} />);

    //expect(screen.getByTestId('MaskInput')).toMatchSnapshot()
    expect(screen.getByTestId('MaskInput')).toContainElement(screen.getByTestId('Icon'));
    expect(screen.getByTestId('Icon')).toContainElement(screen.getByTestId('Menu'));
  });

  test('should render correctly with loading prop', () => {
    const { rerender } = render(<MaskInput mask="999-999" loading />);

    //expect(screen.getByTestId('MaskInput')).toMatchSnapshot()
    expect(screen.getByTestId('MaskInput')).toContainElement(screen.getByTestId('Spinner'));
    rerender(<MaskInput mask="999-999" value="123-456" />);
    expect(screen.getByTestId('MaskInput')).not.toContainElement(screen.queryByTestId('Spinner'));
  });

  test('should render correctly with postfix prop', () => {
    render(<MaskInput mask="999-999" value="123456" postfix="$" />);

    //expect(screen.getByTestId('MaskInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveValue('123-456');
    expect(screen.getByTestId('MaskInput')).toHaveTextContent('123-456 $');
  });

  test('should render correctly with readOnly prop', async () => {
    render(<MaskInput mask="999-999" value="123456" readOnly />);

    //expect(screen.getByTestId('MaskInput')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    userEvent.click(screen.getByRole('textbox'));
    userEvent.keyboard('[Backspace]');
    expect(screen.getByRole('textbox')).toHaveValue('123-456');
  });

  test('should render correctly with autoFocus prop', () => {
    render(<MaskInput mask="999-999" autoFocus />);

    //expect(screen.getByTestId('MaskInput')).toMatchSnapshot()
    expect(screen.getByTestId('TextInput')).toHaveClass('focused');
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  test('should render correctly with value prop equals 0', () => {
    const { rerender } = render(<MaskInput mask="999-999" value="0" />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue('0__-___');
    expect(screen.getByText('0__-___')).toBeVisible();
    rerender(<MaskInput mask="999-999" value="123" />);
    expect(screen.getByRole('textbox')).toHaveValue('123-___');
    expect(screen.getByText('123-___')).toBeVisible();
  });

  test('should render correctly on update value from outside', () => {
    const { rerender } = render(<MaskInput mask="999-999" value="123456" />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    rerender(<MaskInput mask="999-999" value="654321" />);
    expect(screen.getByText('654-321')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('654-321');
  });

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<MaskInput mask="999-999" value="123456" onChange={onChangeCallback} />);

    expect(screen.getByTestId('MaskInput')).toMatchSnapshot();
    rerender(<MaskInput mask="999-999" value="123457" onChange={onChangeCallback} />);
    expect(screen.getByText('123-457')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('123-457');
    expect(onChangeCallback).toBeCalledTimes(0);
  });
});
