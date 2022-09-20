import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog, Icon, Button } from '../../../index';
import { Menu } from '@starleaguecompany/react-icons';

describe('Dialog', () => {
  test('should render correctly with no props', async () => {
    const { container } = render(<Dialog />);

    expect(container).toMatchSnapshot();
    expect(screen.queryByTestId('Dialog')).toBeNull();
  });

  test('should render correctly with visible prop', async () => {
    render(<Dialog visible />);

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    await waitFor(() => expect(screen.getByTestId('Dialog')).toBeVisible());
  });

  test('should render correctly with attributes', () => {
    render(<Dialog id="test-id" className="test-class" visible />);

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    expect(screen.getByTestId('Dialog')).toHaveClass('test-class');
    expect(screen.getByTestId('Dialog')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with content', async () => {
    render(
      <Dialog visible>
        <Dialog.Content>Test content</Dialog.Content>
      </Dialog>
    );

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    await waitFor(() => expect(screen.getByTestId('Dialog').children[1]).toHaveClass('content'));
    await waitFor(() => expect(screen.getByText('Test content')).toBeVisible());
    await waitFor(() => expect(screen.getByText('Test content')).toHaveClass('content'));
  });

  test('should render correctly with title prop', async () => {
    render(
      <Dialog visible>
        <Dialog.Header title="Test title" />
      </Dialog>
    );

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    await waitFor(() => expect(screen.getByTestId('Dialog').children[1]).toHaveClass('header'));
    await waitFor(() => expect(screen.getByText('Test title')).toBeVisible());
    await waitFor(() => expect(screen.getByText('Test title')).toHaveClass('title'));
  });

  test('should render correctly with subtitle prop', async () => {
    render(
      <Dialog visible>
        <Dialog.Header title="Test title" subtitle="Test subtitle" />
      </Dialog>
    );

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    await waitFor(() => expect(screen.getByText('Test subtitle')).toBeVisible());
    await waitFor(() => expect(screen.getByText('Test subtitle')).toHaveClass('subtitle'));
  });

  test('should render correctly with icon prop', async () => {
    render(
      <Dialog visible>
        <Dialog.Header icon={<Icon icon={<Menu />} />} title="Test title" subtitle="Test subtitle" />
      </Dialog>
    );

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    await waitFor(() => expect(screen.getByTestId('Menu')).toBeVisible());
  });

  test('should render correctly with fullscreen prop', async () => {
    render(<Dialog fullscreen visible />);

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    await waitFor(() => expect(screen.getByTestId('Dialog')).toHaveClass('fullscreen'));
  });

  test('should render correctly with footer prop', async () => {
    render(
      <Dialog visible>
        <Dialog.Footer>
          <Button>OK</Button>
        </Dialog.Footer>
      </Dialog>
    );

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    await waitFor(() => expect(screen.getByRole('button')).toBeVisible());
    await waitFor(() => expect(screen.getByTestId('Dialog').lastChild).toHaveClass('footer'));
  });

  test('should render correctly with closeable prop', () => {
    render(<Dialog visible closable={false} />);

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    expect(screen.queryByTestId('Cross')).not.toBeInTheDocument();
  });

  test('should execute callBack on close button click', () => {
    const onCloseCallback = jest.fn();
    render(<Dialog visible onClose={onCloseCallback} />);

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    expect(onCloseCallback).toBeCalledTimes(0);
    userEvent.click(screen.getByTestId('Cross'));
    expect(onCloseCallback).toBeCalledTimes(1);
  });

  test('should execute callBack on click outside of dialog', async () => {
    const onCloseCallback = jest.fn();
    render(<Dialog visible onClose={onCloseCallback} />);

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    expect(onCloseCallback).toBeCalledTimes(0);
    userEvent.click(document.querySelector('.backdrop'));
    expect(onCloseCallback).toBeCalledTimes(1);
  });

  test('should execute callBack on escape button click', async () => {
    const onCloseCallback = jest.fn();
    render(<Dialog visible onClose={onCloseCallback} />);

    expect(screen.getByTestId('Dialog')).toMatchSnapshot();
    expect(onCloseCallback).toBeCalledTimes(0);
    userEvent.keyboard('{esc}');
    expect(onCloseCallback).toBeCalledTimes(1);
  });

  test('should execute onClose callBack once on escape button click', async () => {
    const onCloseCallback = jest.fn();
    const onCloseCallback2 = jest.fn();
    const onCloseCallback3 = jest.fn();
    const { rerender } = render(
      <Dialog visible onClose={onCloseCallback}>
        <Dialog.Content>
          <Dialog visible onClose={onCloseCallback2}>
            <Dialog.Content>
              <Dialog visible onClose={onCloseCallback3}>
                <Dialog.Content>Dialog</Dialog.Content>
              </Dialog>
            </Dialog.Content>
          </Dialog>
        </Dialog.Content>
      </Dialog>
    );

    expect(screen.queryAllByTestId('Dialog')[0]).toMatchSnapshot();
    expect(onCloseCallback).toBeCalledTimes(0);
    expect(onCloseCallback2).toBeCalledTimes(0);
    expect(onCloseCallback3).toBeCalledTimes(0);
    userEvent.keyboard('{esc}');
    expect(onCloseCallback).toBeCalledTimes(0);
    expect(onCloseCallback2).toBeCalledTimes(0);
    expect(onCloseCallback3).toBeCalledTimes(1);

    onCloseCallback.mockClear();
    onCloseCallback2.mockClear();
    onCloseCallback3.mockClear();
    rerender(
      <Dialog visible onClose={onCloseCallback}>
        <Dialog.Content>
          <Dialog visible onClose={onCloseCallback2}>
            <Dialog.Content>
              <Dialog onClose={onCloseCallback3}>
                <Dialog.Content>Dialog</Dialog.Content>
              </Dialog>
            </Dialog.Content>
          </Dialog>
        </Dialog.Content>
      </Dialog>
    );
    userEvent.keyboard('{esc}');
    expect(onCloseCallback).toBeCalledTimes(0);
    expect(onCloseCallback2).toBeCalledTimes(1);
    expect(onCloseCallback3).toBeCalledTimes(0);

    onCloseCallback.mockClear();
    onCloseCallback2.mockClear();
    onCloseCallback3.mockClear();
    rerender(
      <Dialog visible onClose={onCloseCallback}>
        <Dialog.Content>
          <Dialog onClose={onCloseCallback2}>
            <Dialog.Content>
              <Dialog onClose={onCloseCallback3}>
                <Dialog.Content>Dialog</Dialog.Content>
              </Dialog>
            </Dialog.Content>
          </Dialog>
        </Dialog.Content>
      </Dialog>
    );
    userEvent.keyboard('{esc}');
    expect(onCloseCallback).toBeCalledTimes(1);
    expect(onCloseCallback2).toBeCalledTimes(0);
    expect(onCloseCallback3).toBeCalledTimes(0);
  });

  test('should execute onClose callBack once on escape button click. Internal dialog closed by cross icon', async () => {
    const onCloseCallback = jest.fn();
    const onCloseCallback2 = jest.fn();
    const { rerender } = render(
      <Dialog visible onClose={onCloseCallback}>
        <Dialog.Content>
          <Dialog visible onClose={onCloseCallback2}>
            <Dialog.Content>content</Dialog.Content>
          </Dialog>
        </Dialog.Content>
      </Dialog>
    );

    expect(screen.queryAllByTestId('Dialog')[0]).toMatchSnapshot();
    expect(onCloseCallback).toBeCalledTimes(0);
    expect(onCloseCallback2).toBeCalledTimes(0);
    userEvent.click(screen.queryAllByTestId('Cross')[1]);
    expect(onCloseCallback).toBeCalledTimes(0);
    expect(onCloseCallback2).toBeCalledTimes(1);

    onCloseCallback.mockClear();
    onCloseCallback2.mockClear();
    rerender(
      <Dialog visible onClose={onCloseCallback}>
        <Dialog.Content>
          <Dialog onClose={onCloseCallback2}>
            <Dialog.Content>content</Dialog.Content>
          </Dialog>
        </Dialog.Content>
      </Dialog>
    );
    userEvent.keyboard('{esc}');
    expect(onCloseCallback).toBeCalledTimes(1);
    expect(onCloseCallback2).toBeCalledTimes(0);
  });
});
