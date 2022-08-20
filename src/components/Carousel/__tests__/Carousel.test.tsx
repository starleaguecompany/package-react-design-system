import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'

import { Carousel } from '../index'
import userEvent from '@testing-library/user-event'

const mockReact = React

jest.mock('react', () => {
  return {
    ...jest.requireActual<typeof mockReact>('react'),
    useRef: jest.fn(),
  }
})

const useMockRef = mocked(React.useRef)

describe('Carousel', () => {
  beforeEach(() => {
    const ref = { current: {} }
    Object.defineProperty(ref, 'current', {
      set(_current) {
        if (_current) {
          jest.spyOn(_current, 'offsetWidth', 'get').mockReturnValue(100)
          jest.spyOn(_current, 'scrollWidth', 'get').mockReturnValue(200)
        }
        this._current = _current
      },
      get() {
        return this._current
      },
    })
    useMockRef.mockReturnValueOnce(ref)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should render correctly with no props', () => {
    render(<Carousel />)

    expect(screen.getByTestId('Carousel')).toMatchSnapshot()
    expect(screen.getByTestId('Carousel')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with slides', () => {
    render(
      <Carousel>
        {Array.from(new Array(3)).map((_, key) => (
          <div key={key}>{key + 1}</div>
        ))}
      </Carousel>
    )

    expect(screen.getByTestId('Carousel')).toMatchSnapshot()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByTestId('ArrowLeft')).toBeInTheDocument()
    expect(screen.getByTestId('ArrowRight')).toBeInTheDocument()
  })

  test('should render with title', () => {
    render(<Carousel title="Title"></Carousel>)

    expect(screen.getByTestId('Carousel')).toMatchSnapshot()
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  test('should render correctly with slides and gradient', () => {
    const { container } = render(
      <Carousel gradient>
        {Array.from(new Array(3)).map((_, key) => (
          <div key={key} style={{ width: '300px' }}>
            {key + 1}
          </div>
        ))}
      </Carousel>
    )

    expect(screen.getByTestId('Carousel')).toMatchSnapshot()
    expect(container.querySelector('.slides')).toHaveClass('gradient')
  })

  test('should move slide', () => {
    const { container } = render(
      <Carousel gradient>
        {Array.from(new Array(4)).map((_, key) => (
          <div key={key} style={{ width: '300px' }}>
            {key + 1}
          </div>
        ))}
      </Carousel>
    )

    expect(screen.getByTestId('Carousel')).toMatchSnapshot()
    //@ts-ignore
    userEvent.click(container.querySelector('.rightArrow'))
    expect(container.querySelector('.slides')).toHaveClass('leftGradient')
    expect(container.querySelector('.rightArrow')).not.toHaveClass('disabled')
  })
})
