import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { SPACE_SIZES } from '../../../constants/spaces';
import { Space, Button } from '../../../index';

describe('Space', () => {
  test('should render correctly with no props', () => {
    render(<Space />);

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveClass('container direction-horizontal', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Space id="test-id" className="test-class" />);

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveAttribute('id', 'test-id');
    expect(screen.getByTestId('Space')).toHaveClass('test-class');
  });

  test('should render correctly with direction prop', () => {
    render(<Space direction="vertical" />);

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveClass('direction-vertical');
    expect(screen.getByTestId('Space')).not.toHaveClass('direction-horizontal');
  });

  test('should render correctly with size prop', () => {
    render(<Space size={SPACE_SIZES.S24} />);

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveStyle('columnGap: 24px');
    expect(screen.getByTestId('Space')).toHaveStyle('rowGap: 24px');
  });

  test('should render correctly with align prop', () => {
    render(<Space align="end" />);

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveClass('align-end');
  });

  test('should render correctly with justify prop', () => {
    render(<Space justify="space-between" />);

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveClass('justify-space-between');
  });

  test('should render correctly with inline prop', () => {
    render(<Space inline />);

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveClass('inline');
  });

  test('should render correctly with wrap prop', () => {
    render(<Space wrap />);

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveClass('wrap');
  });

  test('should render correctly with children', () => {
    render(
      <Space>
        <Button>1</Button>
        <Button>2</Button>
      </Space>
    );

    expect(screen.getByTestId('Space')).toMatchSnapshot();
    expect(screen.getByTestId('Space')).toHaveTextContent('12');
    expect(screen.getByRole('button', { name: '1' })).toBeVisible();
    expect(screen.getByRole('button', { name: '2' })).toBeVisible();
  });
});
