import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { Collapse, Fade, ScaleFade, SlideFade } from '../index'

describe('Collapse Transition', () => {
  test('should render correctly with no props', () => {
    render(<Collapse data-qa="Collapse" />)

    expect(screen.getByTestId('Collapse')).toMatchSnapshot()
    expect(screen.getByTestId('Collapse')).not.toBeVisible()
  })

  test('should render correctly with attributes', () => {
    render(<Collapse data-qa="Collapse" id="test-id" className="test-class" />)

    expect(screen.getByTestId('Collapse')).toMatchSnapshot()
    expect(screen.getByTestId('Collapse')).toHaveClass('test-class')
    expect(screen.getByTestId('Collapse')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with content', () => {
    render(<Collapse data-qa="Collapse">Test content</Collapse>)

    expect(screen.getByTestId('Collapse')).toMatchSnapshot()
    expect(screen.getByTestId('Collapse')).toHaveTextContent('Test content')
  })

  test('should render correctly with visible prop', () => {
    render(
      <Collapse data-qa="Collapse" visible>
        Test content
      </Collapse>
    )

    expect(screen.getByTestId('Collapse')).toMatchSnapshot()
    expect(screen.getByTestId('Collapse')).toBeVisible()
  })

  test('should render correctly with unmountOnExit prop', () => {
    const { queryByTestId } = render(
      <Collapse data-qa="Collapse" unmountOnExit>
        Test content
      </Collapse>
    )

    expect(queryByTestId('Collapse')).toBeNull()
  })
})

describe('Fade Transition', () => {
  test('should render correctly with no props', () => {
    render(<Fade data-qa="Fade" />)

    expect(screen.getByTestId('Fade')).toMatchSnapshot()
    expect(screen.getByTestId('Fade')).not.toBeVisible()
  })

  test('should render correctly with attributes', () => {
    render(<Fade data-qa="Fade" id="test-id" className="test-class" />)

    expect(screen.getByTestId('Fade')).toMatchSnapshot()
    expect(screen.getByTestId('Fade')).toHaveClass('test-class')
    expect(screen.getByTestId('Fade')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with content', () => {
    render(<Fade data-qa="Fade">Test content</Fade>)

    expect(screen.getByTestId('Fade')).toMatchSnapshot()
    expect(screen.getByTestId('Fade')).toHaveTextContent('Test content')
  })

  test('should render correctly with visible prop', async () => {
    render(
      <Fade data-qa="Fade" visible>
        Test content
      </Fade>
    )

    expect(screen.getByTestId('Fade')).toMatchSnapshot()
    await waitFor(() => expect(screen.getByTestId('Fade')).toBeVisible())
  })

  test('should render correctly with unmountOnExit prop', () => {
    const { queryByTestId } = render(
      <Fade data-qa="Fade" unmountOnExit>
        Test content
      </Fade>
    )

    expect(queryByTestId('Fade')).toBeNull()
  })
})

describe('ScaleFade Transition', () => {
  test('should render correctly with no props', () => {
    render(<ScaleFade data-qa="ScaleFade" />)

    expect(screen.getByTestId('ScaleFade')).toMatchSnapshot()
    expect(screen.getByTestId('ScaleFade')).not.toBeVisible()
  })

  test('should render correctly with attributes', () => {
    render(<ScaleFade data-qa="ScaleFade" id="test-id" className="test-class" />)

    expect(screen.getByTestId('ScaleFade')).toMatchSnapshot()
    expect(screen.getByTestId('ScaleFade')).toHaveClass('test-class')
    expect(screen.getByTestId('ScaleFade')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with content', () => {
    render(<ScaleFade data-qa="ScaleFade">Test content</ScaleFade>)

    expect(screen.getByTestId('ScaleFade')).toMatchSnapshot()
    expect(screen.getByTestId('ScaleFade')).toHaveTextContent('Test content')
  })

  test('should render correctly with visible prop', async () => {
    render(
      <ScaleFade data-qa="ScaleFade" visible>
        Test content
      </ScaleFade>
    )

    expect(screen.getByTestId('ScaleFade')).toMatchSnapshot()
    await waitFor(() => expect(screen.getByTestId('ScaleFade')).toBeVisible())
  })

  test('should render correctly with unmountOnExit prop', () => {
    const { queryByTestId } = render(
      <ScaleFade data-qa="ScaleFade" unmountOnExit>
        Test content
      </ScaleFade>
    )

    expect(queryByTestId('ScaleFade')).toBeNull()
  })
})

describe('SlideFade Transition', () => {
  test('should render correctly with no props', () => {
    render(<SlideFade data-qa="SlideFade" />)

    expect(screen.getByTestId('SlideFade')).toMatchSnapshot()
    expect(screen.getByTestId('SlideFade')).not.toBeVisible()
  })

  test('should render correctly with attributes', () => {
    render(<SlideFade data-qa="SlideFade" id="test-id" className="test-class" />)

    expect(screen.getByTestId('SlideFade')).toMatchSnapshot()
    expect(screen.getByTestId('SlideFade')).toHaveClass('test-class')
    expect(screen.getByTestId('SlideFade')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with content', () => {
    render(<SlideFade data-qa="SlideFade">Test content</SlideFade>)

    expect(screen.getByTestId('SlideFade')).toMatchSnapshot()
    expect(screen.getByTestId('SlideFade')).toHaveTextContent('Test content')
  })

  test('should render correctly with visible prop', async () => {
    render(
      <SlideFade data-qa="SlideFade" visible>
        Test content
      </SlideFade>
    )

    expect(screen.getByTestId('SlideFade')).toMatchSnapshot()
    await waitFor(() => expect(screen.getByTestId('SlideFade')).toBeVisible())
  })

  test('should render correctly with unmountOnExit prop', () => {
    const { queryByTestId } = render(
      <SlideFade data-qa="SlideFade" unmountOnExit>
        Test content
      </SlideFade>
    )

    expect(queryByTestId('SlideFade')).toBeNull()
  })
})
