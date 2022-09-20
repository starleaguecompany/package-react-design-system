import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from '@starleaguecompany/react-icons';

import { Autocomplete } from '../index';
import { defaultNotFoundText } from '../src/Autocomplete';
import { Dialog, Button } from '../../../index';

const options = [
  { label: 'label 1', value: 1 },
  { label: 'label 2', value: 2 },
  { label: 'label 3', value: 3 },
];

const optionsTestSearch = [
  { label: 'label 1', value: 1 },
  { label: 'other label 2', value: 2 },
  { label: 'label 3', value: 3 },
];

const optionsDisabled = [
  { label: 'label 1', value: 1 },
  { label: 'label 2', value: 2, disabled: true },
  { label: 'label 3', value: 3 },
];

const optionsWithZero = [
  { label: 'label 0', value: 0 },
  { label: 'label 1', value: 1 },
];

describe('Autocomplete', () => {
  test('should render correctly with no props', () => {
    render(<Autocomplete />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByTestId('Autocomplete')).toHaveClass('container', { exact: true });
    expect(screen.getByTestId('Autocomplete')).toContainElement(screen.getByRole('textbox'));
  });

  test('should render correctly with attributes', () => {
    render(<Autocomplete id="test-id" className="test-class" />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByTestId('Autocomplete')).toHaveClass('test-class');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with required option prop', () => {
    render(<Autocomplete options={options} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).not.toHaveValue();
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
    expect(screen.queryByText('label 2')).not.toBeInTheDocument();
    expect(screen.queryByText('label 3')).not.toBeInTheDocument();
  });

  test('should render correctly with defaultValue prop', () => {
    render(<Autocomplete options={options} defaultValue={2} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue('label 2');
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
    expect(screen.queryByText('label 3')).not.toBeInTheDocument();
  });

  test('should render correctly with value prop', () => {
    render(<Autocomplete options={options} value={2} defaultValue={3} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue('label 2');
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
    expect(screen.queryByText('label 3')).not.toBeInTheDocument();
  });

  test('should render correctly with disabled prop', () => {
    render(<Autocomplete options={options} disabled placeholder="Test label" />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByTestId('Textarea')).toHaveClass('disabled');
    expect(screen.getByText('Test label')).toHaveClass('disabled');
  });

  test('should render correctly with invalid prop', () => {
    render(<Autocomplete options={options} invalid placeholder="Test label" />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveClass('invalid');
    expect(screen.getByTestId('Textarea')).toHaveClass('invalid');
    expect(screen.getByText('Test label')).toHaveClass('invalid');
  });

  test('should render correctly with loading prop', () => {
    render(<Autocomplete options={options} loading />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByTestId('Autocomplete')).toContainElement(screen.getByTestId('Spinner'));
    expect(screen.getByTestId('Spinner')).toBeVisible();
  });

  test('should execute onChange callback when select value by click', () => {
    const onChangeCallback = jest.fn();
    render(<Autocomplete options={options} onChange={onChangeCallback} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.click(screen.getByText('label 2'));
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  test('should execute onBlur callback when select value by click', () => {
    const onBlurCallback = jest.fn();
    render(<Autocomplete options={options} onBlur={onBlurCallback} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.click(screen.getByText('label 2'));
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  test('should execute onChange callback when select value by Enter keydown', () => {
    const onChangeCallback = jest.fn();
    render(<Autocomplete options={options} onChange={onChangeCallback} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('[ArrowDown]');
    userEvent.keyboard('[Enter]');
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  test('should execute onBlur callback when select value by Enter keydown', () => {
    const onBlurCallback = jest.fn();
    render(<Autocomplete options={options} onBlur={onBlurCallback} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('[ArrowDown]');
    userEvent.keyboard('[Enter]');
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  test('should execute onSearch callback when searching items (typing symbols)', () => {
    const onSearchCallback = jest.fn();
    render(<Autocomplete options={options} onSearch={onSearchCallback} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('label');
    expect(onSearchCallback).toBeCalledTimes(5);
  });

  test('should change display value on item click', () => {
    render(<Autocomplete options={options} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.click(screen.getByText('label 2'));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('label 2');
  });

  test('should display list of option and have focus by click', async () => {
    render(<Autocomplete options={options} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    await waitFor(() => expect(screen.getByText('label 1')).toBeVisible());
    await waitFor(() => expect(screen.getByText('label 2')).toBeVisible());
    await waitFor(() => expect(screen.getByText('label 3')).toBeVisible());
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  test('should hide list of option and blur focus by click outside', async () => {
    render(<Autocomplete options={options} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.click(document.body);
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument());
    expect(screen.getByRole('textbox')).not.toHaveFocus();
  });

  test('should hide list of option and blur focus on Esc key down', async () => {
    const onBlurCallback = jest.fn();
    render(<Autocomplete options={options} onBlur={onBlurCallback} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    expect(screen.getByRole('textbox')).toHaveFocus();
    userEvent.keyboard('{esc}');
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument());
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  test('should hide list of option and blur focus on Tab key down', async () => {
    const onBlurCallback = jest.fn();
    render(<Autocomplete options={options} onBlur={onBlurCallback} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    expect(screen.getByRole('textbox')).toHaveFocus();
    userEvent.tab();
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument());
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  test('should correctly work keyboard navigation (arrow up, arrow down)', async () => {
    render(<Autocomplete options={options} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).not.toHaveClass('active');
    userEvent.keyboard('[ArrowDown]');
    expect(screen.getByText('label 1').closest('.itemBase')).toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).not.toHaveClass('active');
    userEvent.keyboard('[ArrowUp]');
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 2').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).toHaveClass('active');
  });

  test('should correctly work keyboard navigation (arrow up, arrow down) when search is done', () => {
    render(<Autocomplete options={optionsTestSearch} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('label');
    userEvent.keyboard('[ArrowDown]');
    expect(screen.getByText('label 1').closest('.itemBase')).toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).not.toHaveClass('active');
    userEvent.keyboard('[ArrowDown]');
    expect(screen.getByText('label 1').closest('.itemBase')).not.toHaveClass('active');
    expect(screen.getByText('label 3').closest('.itemBase')).toHaveClass('active');
  });

  test('should correctly change display value on Enter key down', () => {
    render(<Autocomplete options={options} defaultValue={2} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('[ArrowDown]');
    userEvent.keyboard('[Enter]');
    expect(screen.getByRole('textbox')).toHaveDisplayValue('label 3');
  });

  test('should display matching items in options list when typing symbols', async () => {
    render(<Autocomplete options={optionsTestSearch} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('label');
    await waitFor(() => expect(screen.getByText('label 1')).toBeVisible());
    await waitFor(() => expect(screen.getByText('label 3')).toBeVisible());
    expect(screen.queryByText('other label 2')).not.toBeInTheDocument();
  });

  test('should clear value by click on close icon', () => {
    render(<Autocomplete options={options} defaultValue={2} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.click(screen.getByTestId('Cross'));
    expect(screen.getByRole('textbox')).not.toHaveValue();
  });

  test('should render correctly with disabled items in options', () => {
    render(<Autocomplete options={optionsDisabled} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('[ArrowDown]');
    userEvent.keyboard('[ArrowDown]');
    userEvent.keyboard('[Enter]');
    expect(screen.getByRole('textbox')).toHaveDisplayValue('label 3');
  });

  test('should render correctly when icon prop', () => {
    render(<Autocomplete options={options} icon={<Menu />} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByTestId('Autocomplete')).toContainElement(screen.getByTestId('Icon'));
    expect(screen.getByTestId('Icon')).toContainElement(screen.getByTestId('Menu'));
  });

  test('should render correctly with loading prop', () => {
    const { rerender } = render(<Autocomplete options={options} loading />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByTestId('Autocomplete')).toContainElement(screen.getByTestId('Spinner'));
    rerender(<Autocomplete options={options} />);
    expect(screen.getByTestId('Autocomplete')).not.toContainElement(screen.queryByTestId('Spinner'));
  });

  test('should render correctly with readOnly prop', async () => {
    render(<Autocomplete options={options} defaultValue={1} readOnly />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    await waitFor(() => expect(screen.queryByTestId('Menu')).not.toBeInTheDocument());
  });

  test('should render correctly with autoFocus prop', () => {
    render(<Autocomplete options={options} autoFocus />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByTestId('Textarea')).toHaveClass('focused');
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  test('should render correctly with autoFocus prop (Autocomplete inside Dialog)', () => {
    const onFocusCallback = jest.fn();

    render(
      <Dialog visible>
        <Dialog.Content>
          <Autocomplete options={options} onFocus={onFocusCallback} autoFocus />
        </Dialog.Content>
      </Dialog>
    );

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByTestId('Textarea')).toHaveClass('focused');
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(onFocusCallback).toBeCalledTimes(1);
  });

  test('should render correctly with placeholder prop', () => {
    render(<Autocomplete options={options} defaultValue={1} label="Test label" />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByText('Test label')).toBeVisible();
    expect(screen.getByText('Test label')).toHaveClass('placeholder filled');
  });

  test('should render correctly with resizable prop', () => {
    const { rerender } = render(<Autocomplete options={options} defaultValue={1} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).not.toHaveClass('resize');
    expect(screen.getByRole('textbox')).toHaveAttribute('wrap', 'off');
    rerender(<Autocomplete options={options} defaultValue={1} resizable />);
    expect(screen.getByRole('textbox')).toHaveClass('resize');
    expect(screen.getByRole('textbox')).toHaveAttribute('wrap', 'soft');
  });

  test('should render correctly with defaultValue prop equals 0', () => {
    render(<Autocomplete options={optionsWithZero} defaultValue={0} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue('label 0');
    expect(screen.getByText('label 0')).toBeVisible();
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
  });

  test('should render correctly with value prop equals 0', () => {
    render(<Autocomplete options={optionsWithZero} value={0} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toHaveValue('label 0');
    expect(screen.getByText('label 0')).toBeVisible();
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
  });

  test('should execute onFocus callback on focusing input', async () => {
    const onFocusCallback = jest.fn();
    render(<Autocomplete options={options} onFocus={onFocusCallback} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(onFocusCallback).toBeCalledTimes(0);
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.click(screen.getByTestId('Textarea'));
    expect(onFocusCallback).toBeCalledTimes(1);
  });

  test('should execute onBlur callback on blurring input', async () => {
    const onBlurCallback = jest.fn();
    render(<Autocomplete options={options} onBlur={onBlurCallback} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(onBlurCallback).toBeCalledTimes(0);
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.click(document.body);
    userEvent.click(document.body);
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  test('should hide list of option and blur focus by arrow click', async () => {
    render(<Autocomplete options={options} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.click(screen.getByTestId('ArrowDown'));
    await waitFor(() => expect(screen.queryByText('label 1')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 2')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('label 3')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('textbox')).not.toHaveFocus());
  });

  test('should render correctly with placement prop', () => {
    render(<Autocomplete options={options} placement="bottom-end" fixedWidth />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByRole('textbox'));
    const popperPlacement = document.querySelector('[data-popper-placement="bottom-end"]');
    expect(popperPlacement).toBeInTheDocument();
  });

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<Autocomplete options={options} value={1} onChange={onChangeCallback} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    rerender(<Autocomplete options={options} value={2} onChange={onChangeCallback} />);
    expect(screen.getByText('label 2')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('label 2');
    expect(onChangeCallback).toBeCalledTimes(0);
  });

  test('should render correctly on external options update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<Autocomplete options={[]} value={1} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    expect(screen.queryByText('label 1')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveValue('label 1');
    rerender(<Autocomplete options={options} value={1} />);
    expect(screen.getByText('label 1')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveValue('label 1');
    expect(onChangeCallback).toBeCalledTimes(0);
  });

  test('should render correctly with notFoundContent', () => {
    const { rerender } = render(<Autocomplete options={options} />);

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('xxx');
    expect(document.body).toHaveTextContent(defaultNotFoundText);
    rerender(<Autocomplete options={options} notFoundContent={<Button>Test not found</Button>} />);
    userEvent.click(screen.getByTestId('Textarea'));
    userEvent.keyboard('xxx');
    expect(document.body).toContainElement(screen.getByRole('button', { name: 'Test not found' }));
  });

  test('should not change value on Tab keydown', async () => {
    render(<Autocomplete options={options} value={1} />);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    expect(screen.getByTestId('Autocomplete')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Textarea'));
    expect(screen.getByRole('textbox')).toHaveValue('label 1');
    userEvent.tab();
    userEvent.click(screen.getByTestId('Textarea'));
    expect(screen.getByRole('textbox')).toHaveValue('label 1');
  });

  //TODO: investigate how to test scrollIntoView prop
});
