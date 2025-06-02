"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "สมัครสมาชิกไม่สำเร็จ");
      }

      message.success("สมัครสมาชิกสำเร็จ");

      // รอ 2 วินาทีก่อนเปลี่ยนหน้า เพื่อให้เห็นข้อความแจ้งเตือน
      setTimeout(() => {
        form.resetFields();
        router.push("/"); // ไปหน้า page.tsx หรือหน้าหลัก
      }, 2000);

    } catch (error: any) {
      message.error("สมัครสมาชิกไม่สำเร็จ: " + (error.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf6e3 0%, #e0c3fc 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 8px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          boxShadow: "0 8px 32px 0 rgba(114, 46, 209, 0.10)",
          borderRadius: 24,
          padding: 32,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            color: "#722ed1",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 1,
          }}
        >
          สมัครสมาชิก
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label={<span style={{ color: "#722ed1" }}>ชื่อผู้ใช้งาน</span>}
            name="username"
            rules={[{ required: true, message: "กรุณาใส่ชื่อผู้ใช้งาน" }]}
          >
            <Input
              size="large"
              placeholder="ชื่อผู้ใช้งาน"
              style={{ borderRadius: 8, borderColor: "#722ed1" }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#722ed1" }}>อีเมล</span>}
            name="email"
            rules={[
              { required: true, message: "กรุณาใส่อีเมล" },
              { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
            ]}
          >
            <Input
              size="large"
              placeholder="example@email.com"
              style={{ borderRadius: 8, borderColor: "#722ed1" }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#722ed1" }}>รหัสผ่าน</span>}
            name="password"
            rules={[{ required: true, message: "กรุณาใส่รหัสผ่าน" }]}
            hasFeedback
          >
            <Input.Password
              size="large"
              placeholder="รหัสผ่าน"
              style={{ borderRadius: 8, borderColor: "#722ed1" }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#722ed1" }}>ยืนยันรหัสผ่าน</span>}
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "กรุณายืนยันรหัสผ่าน" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="ยืนยันรหัสผ่าน"
              style={{ borderRadius: 8, borderColor: "#722ed1" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                background: "linear-gradient(90deg, #722ed1 0%, #8ec5fc 100%)",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              สมัครสมาชิก
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
