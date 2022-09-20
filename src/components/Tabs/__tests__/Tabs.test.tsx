import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs } from '../index';

describe('Tabs', () => {
  test('should render correctly with no props', () => {
    render(<Tabs />);

    expect(screen.getByTestId('Tabs')).toMatchSnapshot();
    expect(screen.getByTestId('Tabs')).not.toHaveClass('');
  });

  test('should render correctly with attributes', () => {
    render(<Tabs id="test-id" className="test-class" />);

    expect(screen.getByTestId('Tabs')).toMatchSnapshot();
    expect(screen.getByTestId('Tabs')).toHaveAttribute('id', 'test-id');
    expect(screen.getByTestId('Tabs')).toHaveClass('test-class');
  });

  test('should render correctly with tabs pain', () => {
    render(
      <Tabs>
        <Tabs.TabPane title="Pane 1">Pane content 1</Tabs.TabPane>
        <Tabs.TabPane title="Pane 2">Pane content 2</Tabs.TabPane>
      </Tabs>
    );

    expect(screen.getByTestId('Tabs')).toMatchSnapshot();
    expect(screen.getByText('Pane 1')).toBeVisible();
    expect(screen.getByText('Pane 2')).toBeVisible();
    expect(screen.getByText('Pane content 1')).toBeVisible();
    expect(screen.getByText('Pane content 2')).toBeVisible();
    expect(screen.getByText('Pane 1')).toHaveClass('active');
    expect(screen.getByText('Pane 2')).not.toHaveClass('active');
    expect(screen.getByText('Pane content 1')).toHaveClass('active');
    expect(screen.getByText('Pane content 2')).not.toHaveClass('active');
  });

  test('should render correctly with defaultIndex prop', () => {
    render(
      <Tabs defaultIndex={1}>
        <Tabs.TabPane title="Pane 1" />
        <Tabs.TabPane title="Pane 2" />
        <Tabs.TabPane title="Pane 3" />
      </Tabs>
    );

    expect(screen.getByTestId('Tabs')).toMatchSnapshot();
    expect(screen.getByText('Pane 1')).not.toHaveClass('active');
    expect(screen.getByText('Pane 2')).toHaveClass('active');
    expect(screen.getByText('Pane 3')).not.toHaveClass('active');
  });

  test('should execute onChange callback with tab pane index when click on it', () => {
    const onChangeCallback = jest.fn(tabPainIndex => tabPainIndex);
    render(
      <Tabs onChange={onChangeCallback}>
        <Tabs.TabPane title="Pane 1" />
        <Tabs.TabPane title="Pane 2" />
        <Tabs.TabPane title="Pane 3" />
      </Tabs>
    );

    expect(screen.getByTestId('Tabs')).toMatchSnapshot();
    userEvent.click(screen.getByText('Pane 3'));
    expect(onChangeCallback).toBeCalledTimes(1);
    expect(onChangeCallback).toReturnWith(2);
  });
});
