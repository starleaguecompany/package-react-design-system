import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Card } from '../index';

describe('Card', () => {
  test('should render correctly with no props', () => {
    render(<Card />);

    expect(screen.getByTestId('Card')).toMatchSnapshot();
    expect(screen.getByTestId('Card')).toHaveClass('container size-24 color-light-primary', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Card id="test-id" className="test-class" />);

    expect(screen.getByTestId('Card')).toMatchSnapshot();
    expect(screen.getByTestId('Card')).toHaveClass('test-class');
    expect(screen.getByTestId('Card')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with content', () => {
    render(<Card>Test content</Card>);

    expect(screen.getByTestId('Card')).toMatchSnapshot();
    expect(screen.getByText('Test content')).toBeVisible();
  });

  test('should render correctly with shadow prop', () => {
    render(<Card shadow>Testing card</Card>);

    expect(screen.getByTestId('Card')).toMatchSnapshot();
    expect(screen.getByTestId('Card')).toHaveClass('shadow');
  });

  test('should render correctly with variant prop', () => {
    render(<Card variant="primary">Testing card</Card>);

    expect(screen.getByTestId('Card')).toMatchSnapshot();
    expect(screen.getByTestId('Card')).toHaveClass('color-light-primary');
  });

  test('should render correctly with color prop', () => {
    render(<Card color="blue">Testing card</Card>);

    expect(screen.getByTestId('Card')).toMatchSnapshot();
    expect(screen.getByTestId('Card')).toHaveClass('color-blue-primary');
  });

  test('should render correctly with color and variant props', () => {
    render(
      <Card color="blue" variant="outlined">
        Testing card
      </Card>
    );

    expect(screen.getByTestId('Card')).toMatchSnapshot();
    expect(screen.getByTestId('Card')).toHaveClass('color-blue-outlined');
  });

  test('should render correctly with size prop', () => {
    render(<Card size={40}>Testing card</Card>);

    expect(screen.getByTestId('Card')).toMatchSnapshot();
    expect(screen.getByTestId('Card')).toHaveClass('size-40');
  });
});
