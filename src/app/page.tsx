'use client'
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from './action';

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  console.log('Success:', values);
  const isLogin = await login(values.username, values.password);
  if (isLogin) {
    alert('เข้าสู่ระบบเเล้ว');
  } else {
    alert('username หรือ password ไม่ถูกต้อง');
  }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">เข้าสู่ระบบ</h2>

      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="ชื่อผู้ใช้งาน"
          name="username"
          rules={[{ required: true, message: 'กรุณาใส่ชื่อผู้ใช้งาน!' }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="รหัสผ่าน"
          name="password"
          rules={[{ required: true, message: 'กรุณาใส่รหัสผ่าน!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" className="mb-4">
          <Checkbox>จดจำฉัน</Checkbox>
        </Form.Item>

        <Form.Item className="mb-0">
          <Button type="primary" htmlType="submit" className="w-full" size="large">
            เข้าสู่ระบบ
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default App;