import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { FormControl, TextInput } from '../../../index'

describe('FormControl', () => {
  test('should render correctly with no props', () => {
    render(<FormControl />)

    expect(screen.getByTestId('FormControl')).toMatchSnapshot()
    expect(screen.getByTestId('FormControl')).toHaveClass('container', { exact: true })
  })

  test('should render correctly with attributes', () => {
    render(<FormControl id="test-id" className="test-class" />)

    expect(screen.getByTestId('FormControl')).toMatchSnapshot()
    expect(screen.getByTestId('FormControl')).toHaveClass('test-class')
    expect(screen.getByTestId('FormControl')).toHaveAttribute('id', 'test-id')
  })

  test('should render correctly with children', () => {
    render(
      <FormControl>
        <TextInput placeholder="Test placeholder" />
        <FormControl.HelperText>Test helper text</FormControl.HelperText>
      </FormControl>
    )

    expect(screen.getByTestId('FormControl')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toBeVisible()
    expect(screen.getByText('Test helper text')).toBeVisible()
    expect(screen.getByText('Test helper text')).toHaveClass('helperText')
  })

  test('should render correctly with invalid prop', () => {
    render(
      <FormControl invalid>
        <TextInput placeholder="Test placeholder" />
        <FormControl.HelperText>Test helper text</FormControl.HelperText>
      </FormControl>
    )

    expect(screen.getByTestId('FormControl')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveClass('invalid')
    expect(screen.getByTestId('TextInput')).toHaveClass('invalid')
    expect(screen.getByText('Test placeholder')).toHaveClass('invalid')
    expect(screen.getByText('Test helper text')).toHaveClass('invalid')
  })

  test('should render correctly with disabled prop', () => {
    render(
      <FormControl disabled>
        <TextInput placeholder="Test placeholder" />
        <FormControl.HelperText>Test helper text</FormControl.HelperText>
      </FormControl>
    )

    expect(screen.getByTestId('FormControl')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).toHaveClass('disabled')
    expect(screen.getByTestId('TextInput')).toHaveClass('disabled')
    expect(screen.getByText('Test placeholder')).toHaveClass('disabled')
    expect(screen.getByText('Test helper text')).toHaveClass('disabled')
  })

  test('should change disabled attribute', () => {
    const { rerender } = render(
      <FormControl>
        <TextInput placeholder="Test placeholder" />
        <FormControl.HelperText>Test helper text</FormControl.HelperText>
      </FormControl>
    )

    expect(screen.getByTestId('FormControl')).toMatchSnapshot()
    expect(screen.getByRole('textbox')).not.toHaveClass('disabled')
    expect(screen.getByTestId('TextInput')).not.toHaveClass('disabled')
    expect(screen.getByText('Test placeholder')).not.toHaveClass('disabled')
    expect(screen.getByText('Test helper text')).not.toHaveClass('disabled')

    rerender(
      <FormControl disabled>
        <TextInput placeholder="Test placeholder" />
        <FormControl.HelperText>Test helper text</FormControl.HelperText>
      </FormControl>
    )

    expect(screen.getByRole('textbox')).toHaveClass('disabled')
    expect(screen.getByTestId('TextInput')).toHaveClass('disabled')
    expect(screen.getByText('Test placeholder')).toHaveClass('disabled')
    expect(screen.getByText('Test helper text')).toHaveClass('disabled')
  })
})
