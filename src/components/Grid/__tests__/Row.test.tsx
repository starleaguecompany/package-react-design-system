import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Row from '../src/Row';
import Col from '../src/Col';

describe('Row', () => {
  test('should render correctly with no props', () => {
    render(<Row />);

    expect(screen.getByTestId('Row')).toMatchSnapshot();
    expect(screen.getByTestId('Row')).toHaveClass('container wrap align-top justify-start', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Row id="test-id" className="test-class" />);

    expect(screen.getByTestId('Row')).toMatchSnapshot();
    expect(screen.getByTestId('Row')).toHaveClass('test-class');
    expect(screen.getByTestId('Row')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with text', () => {
    render(<Row>Testing row</Row>);

    expect(screen.getByTestId('Row')).toMatchSnapshot();
    expect(screen.getByTestId('Row')).toHaveTextContent('Testing row');
    expect(screen.getByText('Testing row')).toBeVisible();
  });

  test('should render correctly with gutter prop', () => {
    render(
      <Row gutter={[10, 30]}>
        <Col>Testing value 1</Col>
        <Col>Testing value 2</Col>
      </Row>
    );

    expect(screen.getByTestId('Row')).toMatchSnapshot();
    expect(screen.getByTestId('Row')).toHaveStyle('margin-left: -5px; margin-right: -5px;');
    expect(screen.getByText('Testing value 1')).toHaveStyle('padding: 15px 5px 15px 5px;');
    expect(screen.getByText('Testing value 2')).toHaveStyle('padding: 15px 5px 15px 5px;');
  });

  test('should render correctly with align prop', () => {
    render(<Row align="bottom">Testing row</Row>);

    expect(screen.getByTestId('Row')).toMatchSnapshot();
    expect(screen.getByTestId('Row')).toHaveClass('align-bottom');
  });

  test('should render correctly with justify prop', () => {
    render(<Row justify="center">Testing row</Row>);

    expect(screen.getByTestId('Row')).toMatchSnapshot();
    expect(screen.getByTestId('Row')).toHaveClass('justify-center');
  });

  test('should render correctly with wrap prop', () => {
    render(<Row wrap={false}>Testing row</Row>);

    expect(screen.getByTestId('Row')).toMatchSnapshot();
    expect(screen.getByTestId('Row')).not.toHaveClass('wrap');
  });
});
