import ModalContainer from "components/ModalContainer"
import type { ModalContainerProps } from 'components/ModalContainer'
import InputMulti from "components/InputMulti/InputMulti"
import { useForm } from "react-hook-form"
import Button from "components/Button"

const ENGLISH_PLACEHOLDER_TEXT = 'Example'
const RUSSIA_PLACEHOLDER_TEXT = 'Пример'

type AddWordProps = Pick<ModalContainerProps, 'isOpened' | 'onClose'>
const AddWord = ({
  isOpened,
  onClose,
}: AddWordProps) => {
  const {
    control,
    handleSubmit: formSubmit,
  } = useForm()

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <ModalContainer
      isOpened={isOpened}
      onClose={onClose}
    >
      <form
        className="w-full max-w-2xl flex flex-col gap-3"
        onSubmit={formSubmit(handleSubmit)}
      >
        <InputMulti
          name="english"
          control={control}
          placeholder={ENGLISH_PLACEHOLDER_TEXT}
        />
        <InputMulti
          name="russia"
          control={control}
          placeholder={RUSSIA_PLACEHOLDER_TEXT}
        />
        <Button>
          Добавить
        </Button>
      </form>
    </ModalContainer>
  )
}

export default AddWord