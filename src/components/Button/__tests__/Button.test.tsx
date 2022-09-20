import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CONTAINER_SIZES } from '../../../constants/sizes';
import { Menu } from '@starleaguecompany/react-icons';
import { Button, Icon } from '../../../index';

describe('Button', () => {
  test('should render correctly with no props', () => {
    render(<Button />);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('container size-44 color-gray-outlined', { exact: true });
  });

  test('should render correctly with text', () => {
    render(<Button>Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveTextContent('Testing button');
  });

  test('should render correctly with attributes', () => {
    render(
      <Button id="test-id" className="test-class">
        Testing button
      </Button>
    );

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveAttribute('id', 'test-id');
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });

  test('should render correctly with variant prop', () => {
    render(<Button variant="primary">Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('color-gray-primary');
  });

  test('should render correctly with color prop', () => {
    render(<Button color="blue">Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('color-blue-outlined');
  });

  test('should render correctly with color and variant props', () => {
    render(
      <Button color="blue" variant="primary">
        Testing button
      </Button>
    );

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('color-blue-primary');
  });

  test('should render correctly with size prop', () => {
    render(<Button size={CONTAINER_SIZES.S60}>Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('size-60');
  });

  test('should render correctly with block prop', () => {
    render(<Button block>Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('block');
  });

  test('should render correctly with loading prop', () => {
    render(<Button loading>Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('disabled-outlined');
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('Spinner'));
  });

  test('should render correctly with disabled prop', () => {
    render(<Button disabled>Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('disabled-outlined');
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('should render correctly with active prop', () => {
    render(<Button active>Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toHaveClass('active');
  });

  test('should render correctly with icon', () => {
    render(
      <Button>
        <Icon icon={<Menu />} />
      </Button>
    );

    expect(screen.getByRole('button')).toMatchSnapshot();
    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('Menu'));
  });

  test('should execute callBack on click', () => {
    const clickCallback = jest.fn();
    render(<Button onClick={clickCallback}>Testing button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
    userEvent.click(screen.getByRole('button'));
    expect(clickCallback).toBeCalledTimes(1);
  });
});
