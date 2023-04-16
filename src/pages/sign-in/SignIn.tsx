import { useSelector } from "react-redux"
import { Button, Form, Input, Typography } from "antd"

import useSignIn from "./hooks/useSignIn"
import {
  FormFields,
  LINK_TEXT,
  SIGN_IN_TEXT,
  LOGIN_TEXT,
  LINE_STYLES,
} from "./constants"
import Link from "components/link"
import { getLoading } from "services/loading/Loading.store"

const { Text } = Typography

const SignIn = () => {
  const isLoading = useSelector(getLoading).signIn?.isLoading

  const [form] = Form.useForm()

  const {
    handleSubmit,
    contextHolder,
    isDisabled,
  } = useSignIn({
    form,
  })

  return (
    <div className="w-full flex justify-center items-center h-screen text-center">
      {contextHolder}
      <div className="w-4/5 sm:w-[450px] bg-white p-3 rounded-md shadow-lg">
        <div className="flex justify-between  items-center text-2xl">
          <Text className="mr-3 ml-3 text-[22px] whitespace-nowrap" >{SIGN_IN_TEXT}</Text>
          <div className={LINE_STYLES} />
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          className="mt-5"
        >
          <Form.Item {...FormFields.login.item}>
            <Input {...FormFields.login.input} size="large" />
          </Form.Item>
          <Form.Item {...FormFields.password.item}>
            <Input.Password {...FormFields.password.input} size="large" />
          </Form.Item>
          <div className="flex justify-center">
            <Button
              loading={isLoading || isDisabled}
              htmlType="submit"
              type="primary"
              size="large"
              className="mb-3 mt-3"
            >
              {LOGIN_TEXT}
            </Button >
          </div>
          <Link
            text={LINK_TEXT}
            to="/sign-up"
          />
        </Form >
      </div>
    </div>
  )
}

export default SignIn