import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { Uploader } from '..'
import userEvent from '@testing-library/user-event'

const file = new File([''], 'uploader.png', { type: 'image/png' })

describe('Uploader', () => {
  test('should render correctly with no props', () => {
    render(<Uploader />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByTestId('Uploader')).toHaveClass('container direction-vertical', { exact: true })
    expect(screen.getByRole('button')).toHaveTextContent('Загрузить')
  })

  test('should render correctly with attributes', () => {
    const { container } = render(<Uploader id="test-id" className="test-class" />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByTestId('Uploader')).toHaveClass('test-class')
    expect(container.querySelector('input[type=file]')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with title prop', () => {
    render(<Uploader title="Testing Uploader title" />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByTestId('Uploader')).toContainElement(screen.getByText('Testing Uploader title'))
  })

  test('should render correctly with description prop', () => {
    render(<Uploader description="Testing Uploader description" />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByTestId('Uploader')).toContainElement(screen.getByText('Testing Uploader description'))
  })

  test('should render correctly with dragZoneDescription prop', () => {
    render(<Uploader dragZoneDescription="Testing Uploader drag zone description" />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByTestId('Uploader')).toContainElement(screen.getByText('Testing Uploader drag zone description'))
  })

  test('should render correctly with buttonCaption prop', () => {
    render(<Uploader buttonCaption="Button caption" />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByRole('button')).toContainElement(screen.getByText('Button caption'))
  })

  test('should execute onDragEnter callback', () => {
    const onDragEnter = jest.fn()
    render(<Uploader onDragEnter={onDragEnter} />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    fireEvent.dragEnter(screen.getByTestId('DropZone'))
    expect(onDragEnter).toBeCalledTimes(1)
  })

  test('should execute onDragLeave callback', () => {
    const onDragLeave = jest.fn()
    render(<Uploader onDragLeave={onDragLeave} />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    fireEvent.dragLeave(screen.getByTestId('DropZone'))
    expect(onDragLeave).toBeCalledTimes(1)
  })

  test('should execute onDragOver callback', () => {
    const onDragOver = jest.fn()
    render(<Uploader onDragOver={onDragOver} />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    fireEvent.dragOver(screen.getByTestId('DropZone'))
    expect(onDragOver).toBeCalledTimes(1)
  })

  test('should execute onDrop callback', () => {
    const onDrop = jest.fn()
    render(<Uploader onDrop={onDrop} />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    fireEvent.drop(screen.getByTestId('DropZone'))
    expect(onDrop).toBeCalledTimes(1)
  })

  test('should execute onFilesUpload callback with drop action', () => {
    const onFilesUpload = jest.fn()
    render(<Uploader onFilesUpload={onFilesUpload} />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    fireEvent.drop(screen.getByTestId('DropZone'), {
      dataTransfer: {
        files: {
          length: 1,
          item: jest.fn(),
        },
        clearData: jest.fn(),
      },
    })
    expect(onFilesUpload).toBeCalledTimes(1)
  })

  test('should execute onFilesUpload callback with file selection', () => {
    const onFilesUpload = jest.fn()
    const { container } = render(<Uploader onFilesUpload={onFilesUpload} />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    userEvent.upload(container.querySelector('input[type=file]'), [file])
    expect(onFilesUpload).toBeCalledTimes(1)
  })

  test('should execute onChange callback with file selection', () => {
    const onChange = jest.fn()
    const { container } = render(<Uploader onChange={onChange} />)

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    userEvent.upload(container.querySelector('input[type=file]'), [file])
    expect(onChange).toBeCalledTimes(1)
  })

  test('should display Uploader item', () => {
    render(
      <Uploader>
        <Uploader.Item file={file} />
      </Uploader>
    )

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.queryAllByTestId('UploaderItem').length).toBe(1)
  })

  test('should render correctly Uploader item with errorMessage prop', () => {
    render(
      <Uploader>
        <Uploader.Item file={file} errorMessage="Error" />
      </Uploader>
    )

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByTestId('UploaderItem')).toHaveClass('error')
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.queryByTestId('Trash')).not.toBeInTheDocument()
  })

  test('should render correctly Uploader item with progressPercent prop', () => {
    render(
      <Uploader>
        <Uploader.Item file={file} progressPercent={30} />
      </Uploader>
    )

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByTestId('Progress')).toBeInTheDocument()
  })

  test('should execute onRemove callback when Uploader item is removed', () => {
    const onRemove = jest.fn()
    render(
      <Uploader>
        <Uploader.Item file={file} onRemove={onRemove} />
      </Uploader>
    )

    expect(screen.getByTestId('Uploader')).toMatchSnapshot()
    expect(screen.getByTestId('Trash')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('Trash'))
    expect(onRemove).toBeCalledTimes(1)
  })
})
