import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { CountDown } from '../index';

describe('CountDown', () => {
  test('should render correctly with no props', () => {
    render(<CountDown />);

    expect(screen.getByTestId('CountDown')).toMatchSnapshot();
    expect(screen.getByTestId('CountDown')).toHaveClass('container', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<CountDown id="test-id" className="test-class" />);

    expect(screen.getByTestId('CountDown')).toMatchSnapshot();
    expect(screen.getByTestId('CountDown')).toHaveClass('test-class');
    expect(screen.getByTestId('CountDown')).toHaveAttribute('id', 'test-id');
  });

  test('should render correctly with from, to props', async () => {
    render(<CountDown from={100} to={987654} />);

    expect(screen.getByTestId('CountDown')).toMatchSnapshot();
    expect(screen.getByText('100')).toBeVisible();
    expect(screen.queryByText('987654')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('987654')).toBeVisible();
      expect(screen.queryByText('100')).not.toBeInTheDocument();
    });
  });

  test('should render correctly with speed prop', async () => {
    render(<CountDown from={100} to={987654} speed={1000} />);

    expect(screen.getByTestId('CountDown')).toMatchSnapshot();
    await waitFor(() => {
      expect(screen.queryByText('987654')).not.toBeInTheDocument();
    });
    await waitFor(
      () => {
        expect(screen.getByText('987654')).toBeVisible();
      },
      { timeout: 1500 }
    );
  });

  test('should render correctly with interval prop', async () => {
    render(<CountDown from={100} to={987654} interval={500} />);

    expect(screen.getByTestId('CountDown')).toMatchSnapshot();
    await waitFor(
      () => {
        expect(screen.getByText('100')).toBeVisible();
      },
      { timeout: 500 }
    );
    await waitFor(
      () => {
        expect(screen.queryByText('100')).not.toBeInTheDocument();
      },
      { timeout: 501 }
    );
  });

  const formatter = (number: number) => {
    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(+number);
  };

  test('should render correctly with formatter prop', async () => {
    render(<CountDown from={100} to={987654} formatter={formatter} />);

    expect(screen.getByTestId('CountDown')).toMatchSnapshot();
    expect(screen.getByText('100,00 ₽')).toBeVisible();
    await waitFor(() => {
      expect(screen.getByText('987 654,00 ₽')).toBeVisible();
    });
  });
});
