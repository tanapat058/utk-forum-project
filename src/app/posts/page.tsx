"use client"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, List, Modal } from 'antd';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  // ดึงโพสต์จาก API
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // เพิ่มโพสต์ใหม่
  const onFinish = async (values: { title: string; content: string }) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const newPost = await res.json();
    setPosts([newPost, ...posts]);
    form.resetFields();
  };

  // Edit post (mock, ยังไม่เชื่อม API)
  const onEdit = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };
  const handleEditOk = () => {
    form.validateFields().then(values => {
      if (editingPost) {
        setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...values } : p));
        setIsModalOpen(false);
        setEditingPost(null);
        form.resetFields();
      }
    });
  };
  const handleEditCancel = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    form.resetFields();
  };

  // Delete post (mock, ยังไม่เชื่อม API)
  const onDelete = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  // Go to comments page
  const goToComments = (id: number) => {
    router.push(`/comments?postId=${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">สร้างกระทู้ใหม่</h2>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item label="ชื่อกระทู้" name="title" rules={[{ required: true, message: 'กรุณาใส่ชื่อกระทู้!' }]}> 
            <Input size="large" />
          </Form.Item>
          <Form.Item label="เนื้อหา" name="content" rules={[{ required: true, message: 'กรุณาใส่เนื้อหา!' }]}> 
            <Input.TextArea rows={4} size="large" />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" className="w-full" size="large">
              เพิ่มกระทู้
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-full max-w-xl">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">รายการกระทู้</h3>
        <List
          dataSource={posts}
          renderItem={item => (
            <List.Item
              actions={[
                <Button key="view" type="link" onClick={() => goToComments(item.id)}>อ่าน</Button>,
                <Button key="edit" type="link" onClick={() => onEdit(item)}>แก้ไข</Button>,
                <Button key="delete" type="link" danger onClick={() => onDelete(item.id)}>ลบ</Button>,
              ]}
            >
              <span>{item.title}</span>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="แก้ไขกระทู้"
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form layout="vertical" form={form} initialValues={editingPost || {}}>
          <Form.Item label="ชื่อกระทู้" name="title" rules={[{ required: true, message: 'กรุณาใส่ชื่อกระทู้!' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="เนื้อหา" name="content" rules={[{ required: true, message: 'กรุณาใส่เนื้อหา!' }]}> 
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostsPage;
