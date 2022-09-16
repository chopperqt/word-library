import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { useForm } from 'react-hook-form'

import '@testing-library/jest-dom/extend-expect'

import WordModal from '../WordModal'
import type { WordForm } from 'models/Library.models'

afterEach(cleanup)

it('WordModal render correctly', () => {
  const Component = () => {
    const {
      control,
    } = useForm<WordForm>({
      mode: 'onChange',
    })

    return (
      <WordModal
        control={control}
        isOpened={true}
        onClose={() => { }}
        onSubmit={() => { }}
      />
    )
  }

  render((
    <Component />
  ))
})

describe('Check clicks', () => {
  const handleSubmit = jest.fn()

  it('Click submit', async () => {
    const Component = () => {
      const {
        control,
      } = useForm<WordForm>({
        mode: 'onChange',
      })

      handleSubmit.mockImplementation(event => {
        event.preventDefault()
      })

      return (
        <WordModal
          control={control}
          isOpened={true}
          onClose={() => { }}
          onSubmit={handleSubmit}
        />
      )
    }

    render(<Component />)


    const submitButton = screen.getByText('Add')

    fireEvent.click(submitButton)

    await waitFor(() => expect(handleSubmit).toBeCalled())
  })
})