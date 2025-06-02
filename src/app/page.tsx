"use client";
import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { login } from "./action"; // ฟังก์ชันล็อกอินของคุณ
import { useRouter } from "next/navigation";

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

const buttonGlowStyle: React.CSSProperties = {
  transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
};
const buttonGlowHoverStyle: React.CSSProperties = {
  boxShadow: "0 0 16px 2px #8ec5fc, 0 0 8px 2px #722ed1",
  transform: "scale(1.07)",
};

const App: React.FC = () => {
  const router = useRouter();
  const [loginHovered, setLoginHovered] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const isLogin = await login(values.username, values.password);
      if (isLogin) {
        message.success("เข้าสู่ระบบเเล้ว ยินดีต้อนรับ " + values.username);
        router.push("/postss"); // ไปหน้ารายการกระทู้
      } else {
        message.error("ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการล็อกอิน");
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
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
          }}
        >
          เข้าสู่ระบบ
        </h2>

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
            rules={[{ required: true, message: "กรุณาใส่ชื่อผู้ใช้งาน!" }]}
          >
            <Input
              size="large"
              style={{
                borderRadius: 8,
                borderColor: "#722ed1",
                background: "#f9f0ff",
              }}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[{ required: true, message: "กรุณาใส่รหัสผ่าน!" }]}
          >
            <Input.Password
              size="large"
              style={{
                borderRadius: 8,
                borderColor: "#722ed1",
                background: "#f9f0ff",
              }}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ marginBottom: 16 }}
          >
            <Checkbox style={{ color: "#722ed1" }}>จดจำฉัน</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  minWidth: 140,
                  background: "linear-gradient(90deg, #722ed1 0%, #8ec5fc 100%)",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  ...buttonGlowStyle,
                  ...(loginHovered ? buttonGlowHoverStyle : {}),
                }}
                onMouseEnter={() => setLoginHovered(true)}
                onMouseLeave={() => setLoginHovered(false)}
              >
                เข้าสู่ระบบ
              </Button>

              <Button
                type="default"
                size="large"
                style={{
                  minWidth: 140,
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#722ed1",
                  borderColor: "#722ed1",
                  backgroundColor: "#fff",
                  transition: "all 0.2s ease-in-out",
                  boxShadow: registerHovered
                    ? "0 0 16px 2px #8ec5fc, 0 0 8px 2px #722ed1"
                    : "none",
                  transform: registerHovered ? "scale(1.07)" : "none",
                }}
                onMouseEnter={() => setRegisterHovered(true)}
                onMouseLeave={() => setRegisterHovered(false)}
                onClick={() => router.push("/members")}
              >
                สมัครสมาชิก
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
