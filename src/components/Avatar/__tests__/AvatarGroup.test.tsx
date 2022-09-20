import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { CONTAINER_SIZES } from '../../../constants/sizes';
import { Avatar, AvatarGroup } from '../index';

describe('AvatarGroup', () => {
  test('should render correctly with no props', () => {
    render(<AvatarGroup />);

    expect(screen.getByTestId('AvatarGroup')).toMatchSnapshot();
    expect(screen.getByTestId('AvatarGroup')).toHaveClass('group', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<AvatarGroup id="test-id" className="test-class" />);

    expect(screen.getByTestId('AvatarGroup')).toMatchSnapshot();
    expect(screen.getByTestId('AvatarGroup')).toHaveAttribute('id', 'test-id');
    expect(screen.getByTestId('AvatarGroup')).toHaveClass('test-class');
  });

  test('should render correctly with avatars', () => {
    render(
      <AvatarGroup>
        <Avatar src="test" />
        <Avatar src="test" />
      </AvatarGroup>
    );

    expect(screen.getByTestId('AvatarGroup')).toMatchSnapshot();
    expect(screen.getAllByRole('img')[0]).toBeVisible();
    expect(screen.getAllByRole('img')[1]).toBeVisible();
    expect(screen.getAllByTestId('Avatar').length).toEqual(2);
  });

  test('should render correctly with size prop', () => {
    render(
      <AvatarGroup size={CONTAINER_SIZES.S60}>
        <Avatar src="test" />
        <Avatar src="test" />
      </AvatarGroup>
    );

    expect(screen.getByTestId('AvatarGroup')).toMatchSnapshot();
    expect(screen.getAllByTestId('Avatar')[0]).toHaveClass('size-60');
    expect(screen.getAllByTestId('Avatar')[1]).toHaveClass('size-60');
  });
});
