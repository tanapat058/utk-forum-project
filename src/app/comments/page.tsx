"use client";
import React, { useState } from "react";
import { Button, Input, List, Avatar } from "antd";

const { TextArea } = Input;

type Comment = {
  id: number;
  username: string;
  content: string;
};

const CommentPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: "Alice", content: "โพสต์นี้ดีมากเลย!" },
    { id: 2, username: "Bob", content: "ขอบคุณสำหรับข้อมูลครับ" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const newEntry: Comment = {
      id: comments.length + 1,
      username: "ผู้ใช้งานทั่วไป",
      content: newComment.trim(),
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          แสดงความคิดเห็น
        </h2>

        <TextArea
          rows={4}
          placeholder="พิมพ์ความคิดเห็นของคุณ..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-8"
        />

        <Button
          type="primary"
          className="w-full mb-8 mt-4"
          size="large"
          onClick={handleSubmit}
        >
          ส่งความคิดเห็น
        </Button>

        <List
          header={`${comments.length} ความคิดเห็น`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{item.username[0]}</Avatar>}
                title={<span className="font-semibold">{item.username}</span>}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default CommentPage;
