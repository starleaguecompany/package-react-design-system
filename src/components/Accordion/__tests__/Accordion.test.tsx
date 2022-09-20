import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion, Icon } from '../../../index';

import { Menu, Warning } from '@starleaguecompany/react-icons';

describe('Accordion', () => {
  test('should render correctly with no props', () => {
    render(<Accordion />);

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getByTestId('Accordion')).toHaveClass('container container direction-vertical', { exact: true });
  });

  test('should render correctly with attributes', () => {
    render(<Accordion id="test-id" className="test-class" />);

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getByTestId('Accordion')).toHaveAttribute('id', 'test-id');
    expect(screen.getByTestId('Accordion')).toHaveClass('test-class');
  });

  test('should render correctly with children items', () => {
    render(
      <Accordion>
        <Accordion.Item title="Title 1" subtitle="Subtitle 1" icon={<Icon icon={<Warning />} />}>
          Content 1
        </Accordion.Item>
        <Accordion.Item title="Title 2" subtitle="Subtitle 2" icon={<Icon icon={<Menu />} />}>
          Content 2
        </Accordion.Item>
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getAllByTestId('CollapseItem')[0]).toContainElement(screen.getByText('Title 1'));
    expect(screen.getAllByTestId('CollapseItem')[0]).toContainElement(screen.getByText('Subtitle 1'));
    expect(screen.getAllByTestId('CollapseItem')[0]).toContainElement(screen.getByTestId('Warning'));
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toContainElement(screen.queryByText('Content 1'));
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toContainElement(screen.getByText('Title 2'));
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toContainElement(screen.getByText('Subtitle 2'));
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toContainElement(screen.getByTestId('Menu'));
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toContainElement(screen.queryByText('Content 2'));

    expect(screen.getAllByTestId('CollapseItem')[1]).toContainElement(screen.getByText('Title 2'));
    expect(screen.getAllByTestId('CollapseItem')[1]).toContainElement(screen.getByText('Subtitle 2'));
    expect(screen.getAllByTestId('CollapseItem')[1]).toContainElement(screen.getByTestId('Menu'));
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toContainElement(screen.queryByText('Content 2'));
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toContainElement(screen.getByText('Title 1'));
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toContainElement(screen.getByText('Subtitle 1'));
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toContainElement(screen.getByTestId('Warning'));
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toContainElement(screen.queryByText('Content 1'));
  });

  test('should render correctly with defaultIndex prop', () => {
    render(
      <Accordion defaultIndex={[1]}>
        <Accordion.Item title="Title 1">Content 1</Accordion.Item>
        <Accordion.Item title="Title 2">Content 2</Accordion.Item>
        <Accordion.Item title="Title 3">Content 3</Accordion.Item>
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[2]).not.toHaveClass('active');
  });

  test('should expand/collapse items by click', () => {
    render(
      <Accordion>
        <Accordion.Item title="Title 1">Content 1</Accordion.Item>
        <Accordion.Item title="Title 2">Content 2</Accordion.Item>
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toHaveClass('active');
    userEvent.click(screen.getByText('Title 1'));
    expect(screen.getAllByTestId('CollapseItem')[0]).toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toHaveClass('active');
    userEvent.click(screen.getByText('Title 2'));
    expect(screen.getAllByTestId('CollapseItem')[0]).toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).toHaveClass('active');
    userEvent.click(screen.getByText('Title 1'));
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).toHaveClass('active');
  });

  test('should execute callback when active item is change', () => {
    const onChangeCallback = jest.fn();
    render(
      <Accordion onChange={onChangeCallback}>
        <Accordion.Item title="Title 1">Content 1</Accordion.Item>
        <Accordion.Item title="Title 2">Content 2</Accordion.Item>
        <Accordion.Item title="Title 3">Content 3</Accordion.Item>
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    userEvent.click(screen.getByText('Title 1'));
    expect(onChangeCallback).toBeCalledTimes(1);
    userEvent.click(screen.getByText('Title 1'));
    expect(onChangeCallback).toBeCalledTimes(2);
    userEvent.click(screen.getByText('Title 2'));
    expect(onChangeCallback).toBeCalledTimes(3);
    userEvent.click(screen.getByText('Title 3'));
    expect(onChangeCallback).toBeCalledTimes(4);
  });

  test('should render with null/undefined items', () => {
    render(
      <Accordion>
        <Accordion.Item title="Title 1">Content 1</Accordion.Item>
        <Accordion.Item title="Title 2">Content 2</Accordion.Item>
        {null}
        {undefined}
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getAllByTestId('CollapseItem').length).toBe(2);
  });

  test('should render correctly with separator prop', () => {
    render(
      <Accordion separator="divider">
        <Accordion.Item title="Title 1">Content 1</Accordion.Item>
        <Accordion.Item title="Title 2">Content 2</Accordion.Item>
        <Accordion.Item title="Title 3">Content 3</Accordion.Item>
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getByTestId('Accordion')).toHaveClass('separator-divider');
  });

  test('should render correctly with background prop', () => {
    render(
      <Accordion background="white">
        <Accordion.Item title="Title 1">Content 1</Accordion.Item>
        <Accordion.Item title="Title 2">Content 2</Accordion.Item>
        <Accordion.Item title="Title 3">Content 3</Accordion.Item>
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getByTestId('Accordion')).toHaveClass('background-white');
  });

  test('should expand/collapse items by Enter keydown', () => {
    render(
      <Accordion>
        <Accordion.Item title="Title 1">Content 1</Accordion.Item>
        <Accordion.Item title="Title 2">Content 2</Accordion.Item>
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toHaveClass('active');
    userEvent.tab();
    userEvent.keyboard('[Enter]');
    expect(screen.getAllByTestId('CollapseItem')[0]).toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toHaveClass('active');
    userEvent.tab();
    userEvent.keyboard('[Enter]');
    expect(screen.getAllByTestId('CollapseItem')[0]).toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).toHaveClass('active');
    userEvent.tab({ shift: true });
    userEvent.keyboard('[Enter]');
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toHaveClass('active');
    expect(screen.getAllByTestId('CollapseItem')[1]).toHaveClass('active');
  });

  test('should render correctly with empty children', () => {
    render(
      <Accordion background="white">
        <Accordion.Item title="Title 1"></Accordion.Item>
        <Accordion.Item title="Title 2">{null}</Accordion.Item>
        <Accordion.Item title="Title 3">Content 3</Accordion.Item>
      </Accordion>
    );

    expect(screen.getByTestId('Accordion')).toMatchSnapshot();
    expect(screen.getAllByTestId('ArrowDown').length).toBe(1);
    userEvent.click(screen.getByText('Title 1'));
    expect(screen.getAllByTestId('CollapseItem')[0]).not.toHaveClass('active');
    userEvent.click(screen.getByText('Title 2'));
    expect(screen.getAllByTestId('CollapseItem')[1]).not.toHaveClass('active');
  });

  //TODO: investigate how to test scrollIntoView prop
});
