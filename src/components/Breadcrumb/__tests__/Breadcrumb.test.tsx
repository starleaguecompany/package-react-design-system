import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Menu } from '@starleaguecompany/react-icons';
import { Breadcrumb, Icon } from '../../../index';

describe('Breadcrumb', () => {
  test('should render correctly with no props', () => {
    render(<Breadcrumb />);

    expect(screen.getByTestId('Breadcrumb')).toMatchSnapshot();
    expect(screen.getByTestId('Breadcrumb')).toHaveClass('container');
  });

  test('should render correctly with attributes', () => {
    render(<Breadcrumb id="test-id" className="test-class" />);

    expect(screen.getByTestId('Breadcrumb')).toMatchSnapshot();
    expect(screen.getByTestId('Breadcrumb')).toHaveClass('test-class');
    expect(screen.getByTestId('Breadcrumb')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly breadcrumb items with text', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/href_1">Breadcrumb 1</Breadcrumb.Item>
        <Breadcrumb.Item href="/href_2">Breadcrumb 2</Breadcrumb.Item>
        <Breadcrumb.Item href="/href_3">Breadcrumb 3</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByTestId('Breadcrumb')).toMatchSnapshot();
    expect(screen.getAllByRole('link').length).toEqual(3);
    expect(screen.getAllByRole('link')[0]).toBeVisible();
    expect(screen.getAllByRole('link')[1]).toBeVisible();
    expect(screen.getAllByRole('link')[2]).toBeVisible();
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/href_1');
    expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', '/href_2');
    expect(screen.getAllByRole('link')[2]).toHaveAttribute('href', '/href_3');
  });

  test('should render correctly breadcrumb items with icon', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/href_1">
          <Icon icon={<Menu />} />
          Breadcrumb 1
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/href_2">
          <Icon icon={<Menu />} />
          Breadcrumb 2
        </Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByTestId('Breadcrumb')).toMatchSnapshot();
    expect(screen.getAllByRole('link').length).toEqual(2);
    expect(screen.getAllByTestId('Menu')[0]).toBeVisible();
    expect(screen.getAllByTestId('Menu')[1]).toBeVisible();
    expect(screen.getByText('Breadcrumb 1')).toBeVisible();
    expect(screen.getByText('Breadcrumb 2')).toBeVisible();
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/href_1');
    expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', '/href_2');
  });
});
