"use client";
import React, { useEffect, useState } from "react";
import { Button, List, Modal, Form, Input, message } from "antd";

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // โหลดรายการกระทู้
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
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
      const res = await fetch("/api/posts", {
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          รายการกระทู้
        </h2>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="mb-4"
        >
          เพิ่มกระทู้
        </Button>
        <List
          bordered
          dataSource={posts}
          locale={{ emptyText: "ยังไม่มีกระทู้" }}
          renderItem={(item) => (
            <List.Item>
              <div>
                <div className="font-bold">{item.title}</div>
                <div className="text-gray-600">{item.content}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="เพิ่มกระทู้"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="ชื่อกระทู้"
            name="title"
            rules={[{ required: true, message: "กรุณาใส่ชื่อกระทู้" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="เนื้อหา"
            name="content"
            rules={[{ required: true, message: "กรุณาใส่เนื้อหา" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              บันทึก
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostsPage;
