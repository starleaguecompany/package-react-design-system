import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sheet } from '../index';

describe('Sheet', () => {
  test('should render correctly with no props', async () => {
    const { container } = render(<Sheet />);

    expect(container).toMatchSnapshot();
    expect(screen.queryByTestId('Sheet')).not.toBeInTheDocument();
  });

  test('should render correctly with visible prop', async () => {
    render(<Sheet visible />);

    expect(screen.getByTestId('Sheet')).toMatchSnapshot();
    expect(screen.getByTestId('Sheet')).toHaveClass('container', { exact: true });
    expect(screen.getByTestId('Sheet')).toBeVisible();
  });

  test('should render correctly with attributes', () => {
    render(<Sheet id="test-id" className="test-class" visible />);

    expect(screen.getByTestId('Sheet')).toMatchSnapshot();
    expect(screen.getByTestId('Sheet')).toHaveClass('test-class');
    expect(screen.getByTestId('Sheet')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with content', async () => {
    render(
      <Sheet visible>
        <Sheet.Content>Test content</Sheet.Content>
      </Sheet>
    );

    expect(screen.getByTestId('Sheet')).toMatchSnapshot();
    expect(screen.getByTestId('Sheet')).toHaveTextContent('Test content');
    expect(screen.getByText('Test content')).toBeVisible();
    expect(screen.getByText('Test content')).toHaveClass('content');
  });

  test('should render correctly with title prop', async () => {
    render(
      <Sheet visible>
        <Sheet.Header title="Test title" />
      </Sheet>
    );

    expect(screen.getByTestId('Sheet')).toMatchSnapshot();
    expect(screen.getByTestId('Sheet')).toContainElement(screen.getByText('Test title'));
    expect(screen.getByText('Test title')).toBeVisible();
    expect(screen.getByText('Test title')).toHaveClass('title');
  });

  test('should render correctly with subtitle prop', async () => {
    render(
      <Sheet visible>
        <Sheet.Header subtitle="Test subtitle" />
      </Sheet>
    );

    expect(screen.getByTestId('Sheet')).toMatchSnapshot();
    expect(screen.getByTestId('Sheet')).toContainElement(screen.getByText('Test subtitle'));
    expect(screen.getByText('Test subtitle')).toBeVisible();
    expect(screen.getByText('Test subtitle')).toHaveClass('subtitle');
  });

  test('should render correctly with closable prop', async () => {
    render(<Sheet visible closable />);

    expect(screen.getByTestId('Sheet')).toMatchSnapshot();
    expect(screen.getByTestId('Sheet')).toContainElement(screen.getByTestId('Cross'));
    expect(screen.getByTestId('Cross')).toBeVisible();
  });

  test('should render correctly with footer prop', async () => {
    render(
      <Sheet visible>
        <Sheet.Footer>Test footer</Sheet.Footer>
      </Sheet>
    );

    expect(screen.getByTestId('Sheet')).toMatchSnapshot();
    expect(screen.getByTestId('Sheet')).toContainElement(screen.getByText('Test footer'));
    expect(screen.getByText('Test footer')).toBeVisible();
    expect(screen.getByText('Test footer')).toHaveClass('footer');
  });

  test('should execute onClose callback on close button click', async () => {
    const onCloseCallback = jest.fn();
    render(<Sheet visible closable onClose={onCloseCallback} />);

    expect(screen.getByTestId('Sheet')).toMatchSnapshot();
    userEvent.click(screen.getByTestId('Cross'));
    expect(onCloseCallback).toBeCalledTimes(1);
  });
});
