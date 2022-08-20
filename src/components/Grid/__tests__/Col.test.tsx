import * as React from 'react'
import { render, screen } from '@testing-library/react'

import Row from '../src/Row'
import Col from '../src/Col'

describe('Col', () => {
  test('should render correctly with no props', () => {
    render(<Col />)

    expect(screen.getByTestId('Col')).toMatchSnapshot()
    expect(screen.getByTestId('Col')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(
      <Col id="test-id" className="test-class">
        Testing col
      </Col>
    )

    expect(screen.getByTestId('Col')).toMatchSnapshot()
    expect(screen.getByTestId('Col')).toHaveClass('test-class')
    expect(screen.getByTestId('Col')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with text', () => {
    render(<Col>Testing col</Col>)

    expect(screen.getByTestId('Col')).toMatchSnapshot()
    expect(screen.getByTestId('Col')).toHaveTextContent('Testing col')
    expect(screen.getByText('Testing col')).toBeVisible()
  })

  test('should render correctly with span prop', () => {
    render(<Col span={6}>Testing col</Col>)

    expect(screen.getByTestId('Col')).toMatchSnapshot()
    expect(screen.getByTestId('Col')).toHaveClass('span-6')
  })

  test('should render correctly with order prop', () => {
    render(
      <Row>
        <Col order={3}>Testing col 1</Col>
        <Col order={1}>Testing col 2</Col>
        <Col order={2}>Testing col 3</Col>
      </Row>
    )

    expect(screen.getByTestId('Row')).toMatchSnapshot()
    expect(screen.getByText('Testing col 1')).toHaveStyle('order: 3')
    expect(screen.getByText('Testing col 2')).toHaveStyle('order: 1')
    expect(screen.getByText('Testing col 3')).toHaveStyle('order: 2')
  })

  // test('should render correctly with breakpoints prop', () => {
  //   const breakpoints: ColProps['breakpoints'] = { mobile: { span: 12 }, tablet: { span: 6 } }
  //   render(
  //     <Row>
  //       <Col breakpoints={breakpoints} span={4}>
  //         Testing col 1
  //       </Col>
  //       <Col breakpoints={breakpoints} span={4}>
  //         Testing col 2
  //       </Col>
  //       <Col breakpoints={breakpoints} span={4}>
  //         Testing col 3
  //       </Col>
  //     </Row>
  //   )
  //
  //   expect(screen.getByTestId('Row')).toMatchSnapshot()
  //   expect(screen.getByText('Testing col 1')).toHaveClass('span-4')
  //   expect(screen.getByText('Testing col 2')).toHaveClass('span-4')
  //   expect(screen.getByText('Testing col 3')).toHaveClass('span-4')
  //
  //   /* eslint-disable-next-line no-global-assign */
  //   window = Object.assign(window, { innerWidth: 1000 })
  //   act(() => {
  //     window.dispatchEvent(new Event('resize'))
  //   })
  //   expect(screen.getByText('Testing col 1')).toHaveClass('span-6')
  //   expect(screen.getByText('Testing col 2')).toHaveClass('span-6')
  //   expect(screen.getByText('Testing col 3')).toHaveClass('span-6')
  //
  //   /* eslint-disable-next-line no-global-assign */
  //   window = Object.assign(window, { innerWidth: 500 })
  //   act(() => {
  //     window.dispatchEvent(new Event('resize'))
  //   })
  //   expect(screen.getByText('Testing col 1')).toHaveClass('span-12')
  //   expect(screen.getByText('Testing col 2')).toHaveClass('span-12')
  //   expect(screen.getByText('Testing col 3')).toHaveClass('span-12')
  // })
})
