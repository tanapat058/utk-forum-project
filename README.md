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

ไฟล์ route.ts คือ API Route ของ Next.js สำหรับจัดการข้อมูลกระทู้ (posts)  
- รองรับ GET (ดึงรายการกระทู้ทั้งหมด) และ POST (เพิ่มกระทู้ใหม่) โดยเชื่อมกับฐานข้อมูลผ่าน Prisma

**เหตุผลที่ไฟล์นี้ขึ้นแดงใน VS Code แต่ระบบยังทำงานได้:**
- VS Code อาจแสดง error หรือ warning ชั่วคราว เช่น ปัญหา type, import, หรือ Prisma Client ยังไม่ generate
- แต่ถ้า build หรือรันจริง (เช่น `npm run dev`) ไม่มี error ร้ายแรง ระบบก็ยังทำงานได้ตามปกติ เพราะ Next.js จะ compile และรัน API route นี้จริง
- อีกกรณีคือ VS Code อาจ cache error เก่า หรือ extension ยัง sync ไม่ทัน

**สรุป:**  
- ไฟล์นี้คือ backend API สำหรับ posts
- ถ้าใช้งานจริงได้ (เพิ่ม/ดึงกระทู้ได้) แปลว่า error ที่เห็นใน VS Code ไม่กระทบการทำงานจริง
- ถ้าอยากให้ error หาย ลอง reload VS Code, รัน `npx prisma generate` หรือเช็คว่า import ทุกอย่างถูกต้อง

---

> **เอกสารนี้สรุปสิ่งที่ถูกเพิ่มและแก้ไขในโปรเจกต์นี้ เพื่อให้ผู้พัฒนาต่อเข้าใจและพัฒนาต่อได้ง่ายขึ้น**

## ตารางทดสอบสำหรับ Tester

| ลำดับ | ฟีเจอร์ที่ทดสอบ                | รายละเอียด/ขั้นตอนทดสอบ                                                                 | ผลลัพธ์ที่คาดหวัง           |
|-------|-------------------------------|----------------------------------------------------------------------------------------|-----------------------------|
| 1     | สมัครสมาชิก                   | 1. ไปที่หน้า `/members`<br>2. กรอกข้อมูลและกดสมัครสมาชิก                          | สมัครสมาชิกสำเร็จ           |
| 2     | เข้าสู่ระบบ                   | 1. ไปที่หน้าแรก<br>2. กรอก username/password ที่ถูกต้อง<br>3. กด "เข้าสู่ระบบ"   | เข้าสู่ระบบและไปหน้ากระทู้  |
| 3     | เข้าสู่ระบบ (ผิดพลาด)         | 1. กรอก username/password ไม่ถูกต้อง<br>2. กด "เข้าสู่ระบบ"                     | แจ้งเตือนข้อผิดพลาด         |
| 4     | สร้างกระทู้ใหม่               | 1. ไปที่หน้า `/postss`<br>2. กด "สร้างกระทู้"<br>3. กรอกข้อมูลและบันทึก         | กระทู้ใหม่ถูกเพิ่ม           |
| 5     | อ่านรายละเอียดกระทู้          | 1. ไปที่หน้า `/postss`<br>2. คลิกชื่อกระทู้ที่ต้องการอ่าน                        | แสดงรายละเอียดกระทู้        |
| 6     | แสดงความคิดเห็น              | 1. ในหน้ารายละเอียดกระทู้<br>2. กรอกความคิดเห็นและกดส่ง                            | ความคิดเห็นถูกเพิ่ม          |
| 7     | จดจำฉัน (Remember me)         | 1. ติ๊ก "จดจำฉัน" ตอนเข้าสู่ระบบ<br>2. ปิด/เปิดเบราว์เซอร์ใหม่                     | ยังอยู่ในสถานะล็อกอิน        |
| 8     | ออกจากระบบ                    | 1. กดปุ่มออกจากระบบ (ถ้ามี)                                                          | กลับสู่หน้าเข้าสู่ระบบ       |

> **หมายเหตุ:** หากพบข้อผิดพลาดหรือผลลัพธ์ไม่ตรง ให้บันทึกรายละเอียดและแจ้งผู้พัฒนา

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

