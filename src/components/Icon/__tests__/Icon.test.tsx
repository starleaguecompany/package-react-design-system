import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { CONTENT_SIZES } from '../../../constants/sizes';
import { Menu } from '@starleaguecompany/react-icons';
import { Icon } from '../index';

describe('Icon', () => {
  test('should render correctly without prop', () => {
    render(<Icon />);

    expect(screen.getByTestId('Icon')).toMatchSnapshot();
    expect(screen.getByTestId('Icon')).toHaveClass('container size-20 shape-round', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Icon id="test-id" className="test-class" icon={<Menu />} />);

    expect(screen.getByTestId('Icon')).toMatchSnapshot();
    expect(screen.getByTestId('Icon')).toHaveClass('test-class');
    expect(screen.getByTestId('Icon')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with icon', () => {
    render(<Icon icon={<Menu />} />);

    expect(screen.getByTestId('Icon')).toMatchSnapshot();
    expect(screen.getByTestId('Icon')).toContainElement(screen.getByTestId('Menu'));
    expect(screen.getByTestId('Menu')).toBeVisible();
  });

  test('should render correctly with container', () => {
    render(
      <Icon>
        <Menu />
      </Icon>
    );

    expect(screen.getByTestId('Icon')).toMatchSnapshot();
    expect(screen.getByTestId('Menu')).toBeVisible();
  });

  test('should render correctly with strong prop', () => {
    render(<Icon strong icon={<Menu />} />);

    expect(screen.getByTestId('Icon')).toMatchSnapshot();
    expect(screen.getByTestId('Icon')).toHaveClass('strong');
  });

  test('should render correctly with color prop', () => {
    render(<Icon color="blue" icon={<Menu />} />);

    expect(screen.getByTestId('Icon')).toMatchSnapshot();
    expect(screen.getByTestId('Icon')).toHaveClass('color-blue');
  });

  test('should render correctly with shape prop', () => {
    render(<Icon shape="circle" icon={<Menu />} />);

    expect(screen.getByTestId('Icon')).toMatchSnapshot();
    expect(screen.getByTestId('Icon')).toHaveClass('shape-circle');
  });

  test('should render correctly with size prop', () => {
    render(<Icon size={CONTENT_SIZES.S16} icon={<Menu />} />);

    expect(screen.getByTestId('Icon')).toMatchSnapshot();
    expect(screen.getByTestId('Icon')).toHaveClass('size-16');
  });
});
