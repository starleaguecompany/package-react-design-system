import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Divider } from '../../../index';

describe('Divider', () => {
  test('should render correctly with no props', () => {
    render(<Divider />);

    expect(screen.getByTestId('Divider')).toMatchSnapshot();
    expect(screen.getByTestId('Divider')).toHaveClass('container', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Divider id="test-id" className="test-class" />);

    expect(screen.getByTestId('Divider')).toMatchSnapshot();
    expect(screen.getByTestId('Divider')).toHaveClass('test-class');
    expect(screen.getByTestId('Divider')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with size prop', () => {
    render(<Divider size={2} />);

    expect(screen.getByTestId('Divider')).toMatchSnapshot();
    expect(screen.getByTestId('Divider')).toHaveClass('size-2');
  });
});
