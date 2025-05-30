"use client";
import React, { useEffect, useState } from "react";
import { Button, List, Modal, Form, Input, message, Divider } from "antd";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string; // เพิ่มตรงนี้
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  // โหลดรายการกระทู้
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/postss");
      const data = await res.json();
      setPosts(data);
    } catch {
      message.error("โหลดกระทู้ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // เพิ่มกระทู้ใหม่
  const onFinish = async (values: { title: string; content: string }) => {
    try {
      const res = await fetch("/api/postss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      form.resetFields();
      setIsModalOpen(false);
      fetchPosts();
      message.success("เพิ่มกระทู้สำเร็จ");
    } catch {
      message.error("เพิ่มกระทู้ไม่สำเร็จ");
    }
  };

  const buttonGlowStyle: React.CSSProperties = {
    transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
  };
  const buttonGlowHoverStyle: React.CSSProperties = {
    boxShadow: "0 0 16px 2px #8ec5fc, 0 0 8px 2px #722ed1",
    transform: "scale(1.07)",
  };

  const [hovered, setHovered] = useState<number | null>(null);
  const [saveHovered, setSaveHovered] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf6e3 0%, #e0c3fc 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 8px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          background: "#fff",
          boxShadow: "0 8px 32px 0 rgba(114, 46, 209, 0.10)",
          borderRadius: 24,
          padding: 32,
          marginBottom: 32,
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
          รายการกระทู้
        </h2>
        <Divider style={{ margin: "8px 0" }} />
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{
            marginBottom: 24,
            background: "linear-gradient(90deg, #722ed1 0%, #8ec5fc 100%)",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            ...buttonGlowStyle,
            ...(hovered === -1 ? buttonGlowHoverStyle : {}),
          }}
          onMouseEnter={() => setHovered(-1)}
          onMouseLeave={() => setHovered(null)}
        >
          + เพิ่มกระทู้
        </Button>
        <List
          bordered
          dataSource={posts}
          locale={{ emptyText: "ยังไม่มีกระทู้" }}
          style={{
            background: "#f9f0ff",
            borderRadius: 12,
            border: "none",
          }}
          renderItem={(item, idx) => (
            <List.Item
              style={{
                background: "#fff",
                borderRadius: 8,
                margin: "8px 0",
                boxShadow: "0 2px 8px 0 rgba(114,46,209,0.05)",
                border: "1px solid #f0f0f0",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              actions={[
                <Button
                  key="comments"
                  type="link"
                  style={{
                    color: "#722ed1",
                    fontWeight: 600,
                    ...buttonGlowStyle,
                    ...(hovered === idx ? buttonGlowHoverStyle : {}),
                  }}
                  onClick={() => router.push(`/comments?postId=${item.id}`)}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  Comments
                </Button>,
              ]}
            >
              <div style={{ fontWeight: 700, fontSize: 18, color: "#722ed1" }}>
                {item.title}
              </div>
              <div style={{ color: "#aaa", fontSize: 13, marginBottom: 4 }}>
                {new Date(item.createdAt).toLocaleString("th-TH", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </div>
              <div style={{ color: "#555", marginTop: 6 }}>{item.content}</div>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title={
          <span style={{ color: "#722ed1", fontWeight: 700, fontSize: 22 }}>
            เพิ่มกระทู้
          </span>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
        centered
        styles={{
          body: { padding: 24, borderRadius: 16, background: "#f9f0ff" },
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label={<span style={{ color: "#722ed1" }}>ชื่อกระทู้</span>}
            name="title"
            rules={[{ required: true, message: "กรุณาใส่ชื่อกระทู้" }]}
          >
            <Input
              size="large"
              style={{
                borderRadius: 8,
                borderColor: "#722ed1",
                background: "#fff",
              }}
              placeholder="ชื่อหัวกระทู้"
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#722ed1" }}>เนื้อหา</span>}
            name="content"
            rules={[{ required: true, message: "กรุณาใส่เนื้อหา" }]}
          >
            <Input.TextArea
              rows={4}
              size="large"
              style={{
                borderRadius: 8,
                borderColor: "#722ed1",
                background: "#fff",
              }}
              placeholder="รายละเอียดกระทู้"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                background: "linear-gradient(90deg, #722ed1 0%, #8ec5fc 100%)",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                ...buttonGlowStyle,
                ...(saveHovered ? buttonGlowHoverStyle : {}),
              }}
              onMouseEnter={() => setSaveHovered(true)}
              onMouseLeave={() => setSaveHovered(false)}
            >
              บันทึก
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostsPage;
