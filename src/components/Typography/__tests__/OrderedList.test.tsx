import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { OrderedList, ListItem } from '../index';

describe('OrderedList', () => {
  test('should render correctly with no props', () => {
    const { container } = render(<OrderedList />);

    expect(container).toMatchSnapshot();
    expect(container.firstChild).toHaveClass('ordered', { exact: true });
  });

  test('should render correctly with ListItem', () => {
    render(
      <OrderedList>
        <ListItem>Testing list</ListItem>
      </OrderedList>
    );

    expect(screen.getByRole('list')).toMatchSnapshot();
    expect(screen.getByRole('list')).toContainElement(screen.getByRole('listitem'));
    expect(screen.getByText('Testing list')).toBeVisible();
  });

  test('should render correctly with attributes', () => {
    render(
      <OrderedList id="test-id" className="test-class">
        Testing list
      </OrderedList>
    );

    expect(screen.getByRole('list')).toMatchSnapshot();
    expect(screen.getByRole('list')).toHaveAttribute('id', 'test-id');
    expect(screen.getByRole('list')).toHaveClass('test-class');
  });
});
