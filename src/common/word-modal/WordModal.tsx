import { Button, Form, Input, Select, Switch, Typography } from "antd";

import ModalContainer from "components/ModalContainer";
import type { WordForm } from "models/Library.models";

import { FormFields } from "./constants";

const { Text } = Typography;

const ADD_TEXT = "Add";
const UPDATE_TEXT = "Update";
const TOGGLER_TEXT = "Need to bookmark ?";
const PLACEHOLDER_WORD_TEXT = "Example";
const PLACEHOLDER_TRANSLATE_TEXT = "Пример";

interface WordModalProps {
  isOpened: boolean;
  isDisabledPin?: boolean;
  onClose: () => void;
  onSubmit: (data: WordForm) => void;
  translate?: string[];
  pined?: boolean;
  isCheckUniqueWord?: boolean;
  isLoading?: boolean;
  words?: string[];
  isUpdate?: boolean;
  word?: string;
}

const WordModal = ({
  onClose,
  onSubmit,
  isOpened,
  pined = false,
  isCheckUniqueWord = false,
  isLoading = false,
  words = [],
  isUpdate = false,
  translate = [],
  word,
  isDisabledPin = false,
}: WordModalProps) => {
  const [form] = Form.useForm();
  let text = isUpdate ? UPDATE_TEXT : ADD_TEXT;

  return (
    <ModalContainer isOpened={isOpened} onClose={onClose}>
      <Form
        form={form}
        className="w-full max-w-2xl flex flex-col"
        onFinish={onSubmit}
        data-testid="word-modal-form"
      >
        <Form.Item {...FormFields.word}>
          <Input size="large" placeholder={PLACEHOLDER_TRANSLATE_TEXT} />
        </Form.Item>
        <Form.Item {...FormFields.translate}>
          <Select
            size="large"
            mode="tags"
            placeholder={PLACEHOLDER_WORD_TEXT}
          />
        </Form.Item>

        <div className="flex gap-x-1 justify-between">
          <Text>{TOGGLER_TEXT}</Text>
          <Form.Item name={["pined"]} valuePropName="checked">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </div>
        <Button
          loading={isLoading}
          type="primary"
          size="large"
          className="w-full"
          htmlType="submit"
        >
          {text}
        </Button>
      </Form>
    </ModalContainer>
  );
};

export default WordModal;
