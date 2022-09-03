import renderer from 'react-test-renderer';

import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import TextField from './TextField'
import { useForm } from 'react-hook-form'
import { wait } from '@testing-library/user-event/dist/utils';

interface FormValue {
  english: string
}

afterEach(cleanup)

it('TextField required attributes', async () => {
  const Component = () => {
    const { control } = useForm<FormValue>({
      defaultValues: {
        english: '',
      }
    })

    return (
      <TextField
        name="english"
        control={control}
      />
    )
  }

  render(<Component />)

  const TextFieldElement = screen.getByTestId('text-field') as HTMLInputElement

  expect(TextFieldElement).toHaveAttribute('name')

  fireEvent.change(TextFieldElement, {
    target: {
      value: 'test value'
    }
  })

  await wait(100)

  expect(TextFieldElement).toHaveValue('test value')

  fireEvent.change(TextFieldElement, {
    target: {
      value: '',
    }
  })

  await wait(100)

  // expect(TextFieldElement).toHaveValue('')

  // fireEvent.blur(InputElement)


  const error = screen.getByTestId('text-field-error')

  expect(error).not.toBeNull()


})


