# 🚀 คู่มือตั้งค่า Netlify สำหรับ Deploy Allure Report

## ขั้นตอนที่ 1: สร้าง Site ใน Netlify

### วิธีที่ 1: สร้าง Site แบบ Manual (แนะนำ)

1. **ไปที่ Netlify Dashboard**

   - เปิด: https://app.netlify.com/
   - คลิก **"Add new project"** (ปุ่มสีเขียว)

2. **เลือก "Deploy manually"**

   - เลือก **"Deploy manually"** หรือ **"Import an existing project"**
   - เลือก **"Deploy manually"**

3. **ตั้งชื่อ Site**

   - ตั้งชื่อ site (เช่น: `loginpage-allure-report`)
   - หรือใช้ชื่อที่ Netlify สร้างให้อัตโนมัติ

4. **บันทึก Site ID**
   - หลังจากสร้าง site แล้ว
   - Site ID จะแสดงในหน้า Site overview
   - หรือดูได้จาก URL: `https://app.netlify.com/sites/<site-name>/overview`

### วิธีที่ 2: ใช้ Site ที่มีอยู่แล้ว

1. **คลิกที่ Site ที่มีอยู่** (เช่น: `golden-sfogliatella-daf89b`)
2. **ไปที่ Site settings**
   - คลิก **"Site settings"** (ไอคอนฟันเฟือง) ที่ด้านบน
   - หรือไปที่เมนูด้านซ้าย → **"Site configuration"** → **"General"**
3. **หา Site ID**
   - ในส่วน **"Site details"**
   - จะเห็น **"Site ID"** (รูปแบบ: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
   - คัดลอก Site ID นี้

## ขั้นตอนที่ 2: สร้าง Access Token

1. **ไปที่ Personal Access Tokens**

   - เปิด: https://app.netlify.com/user/applications#personal-access-tokens
   - หรือ: คลิกที่ Profile (มุมขวาบน) → **"User settings"** → **"Applications"** → **"Personal access tokens"**

2. **สร้าง Token ใหม่**

   - คลิก **"New access token"**
   - ตั้งชื่อ (เช่น: `GitHub Actions Deploy`)
   - คลิก **"Generate token"**

3. **คัดลอก Token**
   - ⚠️ **สำคัญ**: Token จะแสดงแค่ครั้งเดียวเท่านั้น!
   - คัดลอก token ทันที (รูปแบบ: `nfp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - เก็บไว้ในที่ปลอดภัย

## ขั้นตอนที่ 3: เพิ่ม Secrets ใน GitHub

1. **ไปที่ Repository Settings**

   - เปิด: https://github.com/thanisornsu/loginpage-allure/settings
   - หรือ: คลิก **"Settings"** ใน repository

2. **ไปที่ Secrets**

   - ในเมนูด้านซ้าย: **"Secrets and variables"** → **"Actions"**

3. **เพิ่ม NETLIFY_AUTH_TOKEN**

   - คลิก **"New repository secret"**
   - **Name**: `NETLIFY_AUTH_TOKEN`
   - **Secret**: วาง token ที่คัดลอกมาจาก Netlify
   - คลิก **"Add secret"**

4. **เพิ่ม NETLIFY_SITE_ID**
   - คลิก **"New repository secret"** อีกครั้ง
   - **Name**: `NETLIFY_SITE_ID`
   - **Secret**: วาง Site ID ที่คัดลอกมา
   - คลิก **"Add secret"**

## ขั้นตอนที่ 4: ทดสอบ Deployment

1. **Push code ไปที่ main branch**

   ```bash
   git push origin main
   ```

2. **ตรวจสอบ GitHub Actions**

   - ไปที่: https://github.com/thanisornsu/loginpage-allure/actions
   - ดู workflow run
   - ควรเห็น step "Deploy to Netlify" สำเร็จ

3. **ตรวจสอบ Netlify**
   - ไปที่ Netlify Dashboard
   - คลิกที่ site ของคุณ
   - ดู Deploys → ควรเห็น deployment ใหม่
   - คลิกที่ deployment → จะเห็น URL ของ report

## 🔍 วิธีหา Site ID (ถ้ายังหาไม่เจอ)

### จาก Netlify Dashboard:

1. คลิกที่ site ของคุณ
2. ดูที่ URL: `https://app.netlify.com/sites/<site-name>/overview`
3. Site ID อาจจะอยู่ใน URL หรือดูได้จาก:
   - **Site settings** → **General** → **Site details**
   - หรือ **Site settings** → **Build & deploy** → **Build settings**

### จาก Netlify CLI:

```bash
# ติดตั้ง Netlify CLI (ถ้ายังไม่มี)
npm install -g netlify-cli

# Login
netlify login

# ดูรายการ sites
netlify sites:list
```

### จาก API:

```bash
# ใช้ curl (ต้องมี token)
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.netlify.com/api/v1/sites
```

## ✅ ตรวจสอบว่า Setup สำเร็จ

หลังจากเพิ่ม Secrets แล้ว:

1. **ตรวจสอบใน GitHub**

   - ไปที่: Settings → Secrets and variables → Actions
   - ควรเห็น 2 secrets:
     - ✅ `NETLIFY_AUTH_TOKEN`
     - ✅ `NETLIFY_SITE_ID`

2. **ทดสอบด้วยการ Push**
   - Push code ไปที่ main branch
   - ดู workflow logs
   - ควรเห็น "✅ Report deployed successfully to Netlify!"

## 🆘 Troubleshooting

### ถ้า Deploy ไม่สำเร็จ:

- ตรวจสอบว่า Secrets ถูกต้อง
- ตรวจสอบว่า Site ID ถูกต้อง
- ดู logs ใน GitHub Actions
- ดู logs ใน Netlify Dashboard

### ถ้าหา Site ID ไม่เจอ:

- ลองสร้าง site ใหม่
- หรือใช้ Site ที่มีอยู่แล้ว (golden-sfogliatella-daf89b)
- Site ID จะอยู่ใน Site settings → General

## 📝 หมายเหตุ

- Site ID จะเป็นรูปแบบ: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- Access Token จะเป็นรูปแบบ: `nfp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- ทั้งสองต้องถูกต้องถึงจะ deploy ได้
