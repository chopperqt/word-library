import { Button, Form, Input, Select, Switch, Typography } from "antd";

import TextField from "common/text-field/TextField";
import InputMulti, { Option } from "components/input-multi";
import ModalContainer from "components/ModalContainer";
import Toggle from "components/Toggle";
import { FIELD_REQUIRED_TEXT, UNACCEPTABLE_SYMBOL_TEXT } from "helpers/texts";

import { useEffect } from "react";

import type { WordForm } from "models/Library.models";

import { Fields, FormFields } from "./constants";

const { Text } = Typography;

const ADD_TEXT = "Add";
const UPDATE_TEXT = "Update";
const TOGGLER_TEXT = "Need to bookmark ?";

interface WordModalProps {
  isOpened: boolean;
  isDisabledPin?: boolean;
  onClose: () => void;
  onSubmit: (data: WordForm) => void;
  control: any;
  translate?: Option[];
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
  control,
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
          <Input size="large" placeholder="Example" />
        </Form.Item>
        <Form.Item
          name={[Fields.translate]}
          rules={[
            {
              required: true,
              type: "array",
              message: "This field is required!",
            },

            {
              pattern: /^[а-яА-ЯёЁ\s]+$/,
              type: "array",
              message: UNACCEPTABLE_SYMBOL_TEXT,
            },
            () => ({
              validator(_, value: string[]) {
                let error = "";

                value?.forEach((word) => {
                  if (word.match(/^[а-яА-ЯёЁ\s]+$/) === null) {
                    error = "Unacceptable symbol!";
                  }
                });

                if (error) {
                  return Promise.reject(new Error(error));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Select size="large" mode="tags" placeholder="Пример" />
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
