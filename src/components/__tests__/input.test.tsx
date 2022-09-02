import {
  act,
  cleanup,
  render,
  screen,
} from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect'

import Input from "components/Input";

afterEach(cleanup)

it('Check Input name attribute', () => {
  render(<Input name="name" />)

  const input = screen.getByTestId('input-field')

  expect(input).toHaveAttribute('name', 'name')
})

