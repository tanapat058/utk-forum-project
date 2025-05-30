"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  List,
  Avatar,
  Card,
  Typography,
  Divider,
  message,
} from "antd";
import { useSearchParams, useRouter } from "next/navigation";

const { TextArea } = Input;
const { Title } = Typography;

type Comment = {
  id: number;
  username: string;
  content: string;
  createdAt: string; // เพิ่มเวลาสร้าง
};

type Post = {
  id: number;
  title: string;
  content: string;
};

const buttonGlowStyle: React.CSSProperties = {
  transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
};
const buttonGlowHoverStyle: React.CSSProperties = {
  boxShadow: "0 0 16px 2px #8ec5fc, 0 0 8px 2px #722ed1",
  transform: "scale(1.07)",
};

const CommentPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const searchParams = useSearchParams();
  const postId = Number(searchParams.get("postId"));
  const [post, setPost] = useState<Post | undefined>(undefined);
  const router = useRouter();
  const [sendHovered, setSendHovered] = useState(false);
  const [backHovered, setBackHovered] = useState(false);

  useEffect(() => {
    if (!postId) return;
    fetch(`/api/postss`)
      .then((res) => res.json())
      .then((data: Post[]) => setPost(data.find((p) => p.id === postId)));

    fetch(`/api/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((data: Comment[]) => setComments(data));
  }, [postId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) {
      message.warning("กรุณากรอกความคิดเห็น");
      return;
    }
    const userId = 1; // หรือดึงจาก store
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        userId,
        content: newComment.trim(),
      }),
    });
    if (res.ok) {
      setNewComment("");
      // โหลด comments ใหม่
      fetch(`/api/comments?postId=${postId}`)
        .then((res) => res.json())
        .then((data: Comment[]) => setComments(data));
      message.success("ส่งความคิดเห็นสำเร็จ!");
    } else {
      message.error("เกิดข้อผิดพลาดในการส่งความคิดเห็น");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0c3fc 0%, #fdf6e3 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 8px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 8px 32px 0 rgba(114, 46, 209, 0.10)",
          padding: 36,
        }}
      >
        <Button
          onClick={() => router.push("/postss")}
          style={{
            marginBottom: 24,
            background: "linear-gradient(90deg, #722ed1 0%, #8ec5fc 100%)",
            border: "none",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 8,
            ...buttonGlowStyle,
            ...(backHovered ? buttonGlowHoverStyle : {}),
          }}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
        >
          ย้อนกลับไปหน้ากระทู้
        </Button>
        {post && (
          <>
            <Title
              level={2}
              style={{ textAlign: "center", color: "#722ed1", marginBottom: 8 }}
            >
              {post.title}
            </Title>
            <Card
              className="mb-8"
              title={
                <span style={{ color: "#722ed1", fontWeight: 600 }}>
                  เนื้อหากระทู้
                </span>
              }
              style={{
                marginBottom: 32,
                borderRadius: 16,
                background: "#f9f0ff",
                border: "none",
                boxShadow: "0 2px 8px 0 rgba(114,46,209,0.05)",
              }}
            >
              <p style={{ fontSize: 16, color: "#333", margin: 0 }}>
                {post.content}
              </p>
            </Card>
          </>
        )}
        <Divider />
        <Title
          level={4}
          style={{ color: "#722ed1", marginBottom: 16, textAlign: "center" }}
        >
          แสดงความคิดเห็น
        </Title>
        <TextArea
          rows={4}
          placeholder="พิมพ์ความคิดเห็นของคุณ..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            marginBottom: 16,
            borderRadius: 8,
            borderColor: "#722ed1",
            background: "#fff",
            fontSize: 15,
          }}
        />
        <Button
          type="primary"
          block
          size="large"
          style={{
            background: "linear-gradient(90deg, #722ed1 0%, #8ec5fc 100%)",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 32,
            ...buttonGlowStyle,
            ...(sendHovered ? buttonGlowHoverStyle : {}),
          }}
          onMouseEnter={() => setSendHovered(true)}
          onMouseLeave={() => setSendHovered(false)}
          onClick={handleSubmit}
        >
          ส่งความคิดเห็น
        </Button>
        <Divider />
        <List
          header={
            <span style={{ color: "#722ed1", fontWeight: 600 }}>
              {comments.length} ความคิดเห็น
            </span>
          }
          itemLayout="horizontal"
          dataSource={comments}
          locale={{ emptyText: "ยังไม่มีความคิดเห็น" }}
          renderItem={(item) => (
            <List.Item
              style={{
                background: "#fff",
                borderRadius: 8,
                margin: "8px 0",
                boxShadow: "0 2px 8px 0 rgba(114,46,209,0.05)",
                border: "1px solid #f0f0f0",
                padding: "16px 20px",
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      background:
                        "linear-gradient(135deg, #722ed1 0%, #8ec5fc 100%)",
                      fontWeight: 700,
                    }}
                  >
                    {item.username[0]}
                  </Avatar>
                }
                title={
                  <div>
                    <span style={{ fontWeight: 600, color: "#722ed1" }}>
                      {item.username}
                    </span>
                    <span
                      style={{ color: "#aaa", fontSize: 13, marginLeft: 12 }}
                    >
                      {new Date(item.createdAt).toLocaleString("th-TH", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                }
                description={
                  <span style={{ color: "#333" }}>{item.content}</span>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default CommentPage;
