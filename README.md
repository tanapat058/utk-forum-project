This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Customization & Features

### สิ่งที่ถูกเพิ่มและแก้ไขในโปรเจกต์นี้

- **ระบบ Forum กระทู้และคอมเมนต์**
  - เพิ่มหน้า `/posts` สำหรับสร้างและแสดงรายการกระทู้ (Post)
  - เพิ่มหน้า `/comments` สำหรับแสดงความคิดเห็นในแต่ละกระทู้
  - หน้า `/posts` สามารถเพิ่ม, แก้ไข, ลบ, และอ่านกระทู้ได้ (อ่านจะลิงก์ไปหน้า comments พร้อม postId)
  - หน้า `/comments` จะแสดงชื่อและเนื้อหากระทู้ที่เลือกอ่าน พร้อมฟอร์มแสดงความคิดเห็น
  - เพิ่มปุ่ม "ย้อนกลับไปหน้ากระทู้" ในหน้า comments

- **เชื่อมต่อฐานข้อมูลจริงด้วย Prisma + SQLite**
  - เพิ่ม model `Post` ใน `prisma/schema.prisma` สำหรับเก็บข้อมูลกระทู้
  - สร้างและ migrate database ด้วย Prisma (`prisma migrate dev`)
  - สร้าง API `/api/posts` (GET, POST) สำหรับดึงและเพิ่มกระทู้จริง
  - หน้า `/posts` และ `/comments` ดึงข้อมูลกระทู้จาก API (ไม่ใช้ mock data)

- **แก้ไขปัญหาและปรับปรุงโค้ด**
  - เพิ่ม "use client" ในไฟล์ที่ใช้ React hook
  - อธิบายและแก้ปัญหา Prisma Client, DATABASE_URL, และ permission ของไฟล์ .prisma
  - อธิบายโครงสร้าง database (`prisma/dev.db`)

- **หมายเหตุ**
  - ข้อมูลคอมเมนต์ในหน้า `/comments` ยังเป็น mock data (ไม่ได้เชื่อมต่อ database จริง)
  - หากต้องการให้คอมเมนต์เชื่อมกับฐานข้อมูล ให้เพิ่ม model และ API สำหรับ comments เพิ่มเติม

---

### How to continue development
- ดูตัวอย่างการเชื่อมต่อฐานข้อมูลและ API ได้ที่ไฟล์ `src/app/api/posts/route.ts`
- ดูตัวอย่างการ fetch ข้อมูลจาก API ได้ที่ `src/app/posts/page.tsx` และ `src/app/comments/page.tsx`
- หากต้องการเพิ่มฟีเจอร์ใหม่ เช่น ระบบคอมเมนต์จริง หรือระบบผู้ใช้ (User) ให้เพิ่ม model ใน `prisma/schema.prisma` และสร้าง API เพิ่มเติม

---

> **เอกสารนี้สรุปสิ่งที่ถูกเพิ่มและแก้ไขในโปรเจกต์นี้ เพื่อให้ผู้พัฒนาต่อเข้าใจและพัฒนาต่อได้ง่ายขึ้น**

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

