import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { CONTAINER_SIZES } from '../../../constants/sizes';
import { Menu } from '@starleaguecompany/react-icons';

import { Tag, Icon } from '../../../index';
import userEvent from '@testing-library/user-event';

describe('Tag', () => {
  test('should render correctly with no props', () => {
    render(<Tag />);

    expect(screen.getByTestId('Tag')).toMatchSnapshot();
    expect(screen.getByTestId('Tag')).toHaveClass('container size-44', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Tag id="test-id" className="test-class" />);

    expect(screen.getByTestId('Tag')).toMatchSnapshot();
    expect(screen.getByTestId('Tag')).toHaveAttribute('id', 'test-id');
    expect(screen.getByTestId('Tag')).toHaveClass('test-class');
  });

  test('should render correctly with text', () => {
    render(<Tag>Testing tag</Tag>);

    expect(screen.getByTestId('Tag')).toMatchSnapshot();
    expect(screen.getByText('Testing tag')).toBeVisible();
  });

  test('should render correctly with size prop', () => {
    render(<Tag size={CONTAINER_SIZES.S36}>Testing tag</Tag>);

    expect(screen.getByTestId('Tag')).toMatchSnapshot();
    expect(screen.getByTestId('Tag')).toHaveClass('size-36');
  });

  test('should render correctly with active prop', () => {
    render(<Tag active>Testing tag</Tag>);

    expect(screen.getByTestId('Tag')).toMatchSnapshot();
    expect(screen.getByTestId('Tag')).toHaveClass('active');
  });

  test('should render correctly with closable prop and execute onClose callback on click', () => {
    const closeCallback = jest.fn();
    render(
      <Tag closable onClose={closeCallback}>
        Testing tag
      </Tag>
    );

    expect(screen.getByTestId('Tag')).toMatchSnapshot();
    expect(screen.getByTestId('Tag')).toContainElement(screen.getByTestId('Cross'));
    userEvent.click(screen.getByTestId('Cross'));
    expect(closeCallback).toBeCalledTimes(1);
  });

  test('should render correctly with icon', () => {
    render(
      <Tag>
        <Icon icon={<Menu />} />
        Testing pane
      </Tag>
    );

    expect(screen.getByTestId('Tag')).toMatchSnapshot();
    expect(screen.getByTestId('Menu')).toBeVisible();
    expect(screen.getByText('Testing pane')).toBeVisible();
    expect(screen.getByTestId('Tag')).toContainElement(screen.getByTestId('Menu'));
  });

  test('should render correctly on external value update', () => {
    const onChangeCallback = jest.fn();
    const { rerender } = render(<Tag active={false} onChange={onChangeCallback} />);

    expect(screen.getByTestId('Tag')).toMatchSnapshot();
    rerender(<Tag active={true} onChange={onChangeCallback} />);
    expect(screen.getByTestId('Tag')).toHaveClass('active');
    expect(onChangeCallback).toBeCalledTimes(0);
  });
});
