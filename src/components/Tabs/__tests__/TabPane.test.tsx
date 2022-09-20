import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Tabs } from '../../../index';

describe('TabPane', () => {
  test('should render correctly with no props', () => {
    render(<Tabs.TabPane />);

    expect(screen.getByTestId('TabPane')).toMatchSnapshot();
    expect(screen.getByTestId('TabPane')).toHaveClass('pane');
  });

  test('should render correctly with attributes', () => {
    render(<Tabs.TabPane id="test-id" className="test-class" />);

    expect(screen.getByTestId('TabPane')).toMatchSnapshot();
    expect(screen.getByTestId('TabPane')).toHaveAttribute('id', 'test-id');
    expect(screen.getByTestId('TabPane')).toHaveClass('test-class');
  });

  test('should render correctly with title prop', () => {
    render(<Tabs.TabPane title="Title pane" />);

    expect(screen.getByTestId('TabPane')).toMatchSnapshot();
    expect(screen.getByTestId('TabPane')).toHaveAttribute('title', 'Title pane');
    expect(screen.getByTestId('TabPane')).toBeVisible();
  });

  test('should render correctly with content', () => {
    render(<Tabs.TabPane title="Title pane">Pane content</Tabs.TabPane>);

    expect(screen.getByTestId('TabPane')).toMatchSnapshot();
    expect(screen.getByTestId('TabPane')).toHaveTextContent('Pane content');
    expect(screen.getByText('Pane content')).toBeVisible();
  });
});
