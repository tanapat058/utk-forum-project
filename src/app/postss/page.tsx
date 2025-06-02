"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  Modal,
  Form,
  Input,
  message,
  Divider,
  Select,
} from "antd";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../../store/user";

const { Option } = Select;

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  category?: string;
}

const categories = [
  { label: "ทั่วไป", value: "general" },
  { label: "ประกาศมหาวิทยาลัย", value: "announcement" },
  { label: "กิจกรรม", value: "event" },
  { label: "สอบและเกรด", value: "exam" },
  { label: "ที่พักและอาหาร", value: "housing" },
  { label: "อื่นๆ", value: "other" },
];

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { id: userId } = useUserStore() as { id: string; username: string };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/postss");
      const data: Post[] = await res.json();
      const fixedPosts = data.map((p) => ({
        ...p,
        category: p.category || "general",
      }));
      setPosts(fixedPosts);
    } catch {
      message.error("โหลดกระทู้ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  const postsGroupedByCategory = categories.reduce((acc, cat) => {
    const filtered = filteredPosts.filter((post) => post.category === cat.value);
    if (filtered.length > 0) acc[cat.value] = filtered;
    return acc;
  }, {} as Record<string, Post[]>);

  const onFinish = async (values: {
    title: string;
    content: string;
    category: string;
  }) => {
    try {
      if (!userId) {
        message.error("กรุณาเข้าสู่ระบบก่อนโพสต์กระทู้");
        return;
      }
      const res = await fetch("/api/postss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, authorId: userId }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }
      form.resetFields();
      setIsModalOpen(false);
      fetchPosts();
      message.success("เพิ่มกระทู้สำเร็จ");
    } catch (err: any) {
      message.error("เพิ่มกระทู้ไม่สำเร็จ: " + (err?.message || ""));
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
  const [addBtnHovered, setAddBtnHovered] = useState(false);

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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{
              background: "linear-gradient(90deg, #722ed1 0%, #8ec5fc 100%)",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              ...buttonGlowStyle,
              ...(addBtnHovered ? buttonGlowHoverStyle : {}),
            }}
            onMouseEnter={() => setAddBtnHovered(true)}
            onMouseLeave={() => setAddBtnHovered(false)}
          >
            + เพิ่มกระทู้
          </Button>

          <Select
            style={{ width: 200 }}
            placeholder="เลือกหมวดหมู่"
            allowClear
            value={selectedCategory || undefined}
            onChange={(value) => setSelectedCategory(value || null)}
          >
            {categories.map((cat) => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>
        </div>

        {Object.entries(postsGroupedByCategory).map(([catValue, catPosts]) => {
          const cat = categories.find((c) => c.value === catValue);
          if (!cat || catPosts.length === 0) return null;
          return (
            <div key={cat.value} style={{ marginBottom: 40 }}>
              <h3
                style={{
                  color: "#722ed1",
                  borderBottom: "2px solid #722ed1",
                  paddingBottom: 6,
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                {cat.label}
              </h3>

              <List
                bordered
                dataSource={catPosts}
                locale={{ emptyText: "ยังไม่มีกระทู้" }}
                style={{
                  background: "#f9f0ff",
                  borderRadius: 12,
                  border: "none",
                }}
                renderItem={(item) => (
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
                        style={{ color: "#722ed1", fontWeight: 600 }}
                        onClick={() => router.push(`/comments?postId=${item.id}`)}
                      >
                        Comments
                      </Button>,
                    ]}
                  >
                    <div
                      style={{ fontWeight: 700, fontSize: 18, color: "#722ed1" }}
                    >
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
          );
        })}
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
        destroyOnClose
        centered
        bodyStyle={{ padding: 24, borderRadius: 16, background: "#f9f0ff" }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label={<span style={{ color: "#722ed1" }}>ชื่อกระทู้</span>}
            name="title"
            rules={[{ required: true, message: "กรุณาใส่ชื่อกระทู้" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#722ed1" }}>เนื้อหา</span>}
            name="content"
            rules={[{ required: true, message: "กรุณาใส่เนื้อหา" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#722ed1" }}>หมวดหมู่</span>}
            name="category"
            rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่" }]}
          >
            <Select>
              {categories.map((cat) => (
                <Option key={cat.value} value={cat.value}>
                  {cat.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                background: "#722ed1",
                border: "none",
                fontWeight: 600,
                ...buttonGlowStyle,
                ...(saveHovered ? buttonGlowHoverStyle : {}),
              }}
              onMouseEnter={() => setSaveHovered(true)}
              onMouseLeave={() => setSaveHovered(false)}
            >
              บันทึกกระทู้
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostsPage;
