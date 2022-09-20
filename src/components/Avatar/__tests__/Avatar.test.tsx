import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { CONTAINER_SIZES } from '../../../constants/sizes';
import { Avatar } from '../index';

describe('Avatar', () => {
  test('should render correctly with no props', () => {
    render(<Avatar />);

    expect(screen.getByTestId('Avatar')).toMatchSnapshot();
    expect(screen.getByTestId('Avatar')).toHaveClass('avatar size-44', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Avatar id="test-id" className="test-class" />);

    expect(screen.getByTestId('Avatar')).toMatchSnapshot();
    expect(screen.getByTestId('Avatar')).toHaveClass('test-class');
    expect(screen.getByTestId('Avatar')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with src prop', () => {
    render(<Avatar src="test" />);

    expect(screen.getByTestId('Avatar')).toMatchSnapshot();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveClass('image');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test');
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
  });

  test('should render correctly with text', () => {
    render(<Avatar>test</Avatar>);

    expect(screen.getByTestId('Avatar')).toMatchSnapshot();
    expect(screen.getByTestId('Avatar')).toHaveTextContent('test');
    expect(screen.getByText('test')).toBeVisible();
  });

  test('should render correctly with size prop', () => {
    render(<Avatar size={CONTAINER_SIZES.S60}>test</Avatar>);

    expect(screen.getByTestId('Avatar')).toMatchSnapshot();
    expect(screen.getByTestId('Avatar')).toHaveClass('size-60');
  });
});
