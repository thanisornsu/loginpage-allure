# 📋 สรุปโครงการ: Playwright + TypeScript + Allure Test Automation

## 🎯 เป้าหมายของโครงการ

สร้างระบบ Test Automation สำหรับ SwagLabs login page ด้วย:
- **Playwright** + **TypeScript** สำหรับการทดสอบ
- **Allure Report** สำหรับรายงานผลการทดสอบ
- **GitHub Actions CI/CD** สำหรับรันอัตโนมัติ
- **Netlify** สำหรับ deploy report ออนไลน์

---

## 📁 โครงสร้างโปรเจค

```
swaglabs-allure-cicd/
├── src/
│   ├── pages/
│   │   └── LoginPage.ts          # Page Object Model (POM)
│   ├── tests/
│   │   └── login.spec.ts          # Test cases
│   └── utils/
│       └── test-data.ts           # Test data และ credentials
├── scripts/
│   ├── screenshot-report.js       # สร้าง screenshot ของ report
│   └── view-report.js             # เปิดดู report ที่ดาวน์โหลดมา
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Workflow หลัก (Tests + Deploy)
│       └── deploy-netlify.yml     # Workflow แยกสำหรับ Netlify (Alternative)
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
├── netlify.toml                   # Netlify configuration
└── README.md                      # Documentation
```

---

## 🔧 สิ่งที่ทำทั้งหมด

### 1. Setup โปรเจคพื้นฐาน

**สิ่งที่ทำ:**
- สร้าง `package.json` พร้อม dependencies (Playwright, TypeScript, Allure)
- ตั้งค่า `tsconfig.json` สำหรับ TypeScript
- ตั้งค่า `playwright.config.ts` พร้อม Allure reporter
- สร้าง `.gitignore`

**Dependencies หลัก:**
```json
{
  "@playwright/test": "^1.40.0",
  "allure-playwright": "^2.10.0",
  "allure-commandline": "^2.24.1",
  "typescript": "^5.3.3"
}
```

### 2. สร้าง Page Object Model (POM)

**ไฟล์:** `src/pages/LoginPage.ts`

**หลักการ:**
- POM ควรมีเฉพาะ **interactions** (คลิก, พิมพ์, navigate)
- **ไม่ควรมี assertions** ใน POM
- Assertions ควรอยู่ใน test file เพื่อให้ Allure track ได้ถูกต้อง

**Methods ที่สร้าง:**
- `goto()` - ไปที่หน้า login
- `login(username, password)` - ทำการ login
- `getErrorMessage()` - ดึง error message
- `isErrorMessageVisible()` - ตรวจสอบว่า error แสดงหรือไม่
- `isLoggedIn()` - ตรวจสอบว่า login สำเร็จหรือไม่

### 3. สร้าง Test Cases

**ไฟล์:** `src/tests/login.spec.ts`

**Test Scenarios (7 tests):**
1. ✅ Valid login
2. ❌ Invalid username
3. ❌ Invalid password
4. 🔒 Locked out user
5. ⚠️ Empty username
6. ⚠️ Empty password
7. ⚠️ Empty credentials

**หลักการสำคัญ:**
- **Assertions อยู่ใน test file** ไม่ใช่ใน POM
- ใช้ Allure steps, labels, และ attachments
- แต่ละ test มี screenshot attachment

### 4. สร้าง GitHub Actions Workflow

**ไฟล์:** `.github/workflows/ci.yml`

**ขั้นตอนใน Workflow:**
1. Checkout code
2. Setup Node.js
3. Install dependencies (`npm ci`)
4. Install Playwright browsers
5. Run tests (`npm test`)
6. Generate Allure report
7. Upload report as artifact
8. Generate screenshot ของ report
9. Upload screenshot as artifact
10. Add screenshot to job summary
11. Comment PR with screenshot
12. **Deploy to Netlify** (ถ้าตั้งค่าแล้ว)

### 5. สร้าง Scripts สำหรับ Report

**scripts/screenshot-report.js:**
- ใช้ Playwright เพื่อเปิด Allure report
- รอให้ report โหลดเสร็จ (รอ "Loading..." หาย)
- ถ่าย screenshot ทั้งหน้า
- ใช้ใน CI/CD เพื่อสร้างภาพ report

**scripts/view-report.js:**
- สร้าง local HTTP server
- เปิดดู report ที่ดาวน์โหลดมาจาก Artifacts
- ใช้งาน: `npm run report:view`

### 6. Setup Netlify Deployment

**สิ่งที่ต้องทำ:**
1. สร้าง Netlify account และ site
2. สร้าง Access Token
3. หา Site ID
4. เพิ่ม Secrets ใน GitHub:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

---

## 🐛 ปัญหาที่เจอและวิธีแก้ไข

### ปัญหาที่ 1: Assertions ใน POM ทำให้ Allure Report ไม่แสดงผล

**อาการ:**
- Allure report แสดง empty data
- Test results ไม่แสดงใน report

**สาเหตุ:**
- ใส่ `expect()` statements ใน POM class
- Allure ไม่สามารถ track assertions ที่อยู่ใน POM ได้

**วิธีแก้ไข:**
```typescript
// ❌ ผิด - Assertions ใน POM
async verifyErrorMessage(msg: string) {
  await expect(this.errorMessage).toContainText(msg);
}

// ✅ ถูก - POM return values, assertions ใน test
async getErrorMessage(): Promise<string> {
  return await this.errorMessage.textContent() || "";
}

// ใน test file:
const errorText = await loginPage.getErrorMessage();
expect(errorText).toContain(expectedMessage);
```

**หลักการ:**
- **POM = Interactions only** (คลิก, พิมพ์, ดึงข้อมูล)
- **Test file = Assertions** (ตรวจสอบผลลัพธ์)

---

### ปัญหาที่ 2: Playwright webServer Configuration Error

**อาการ:**
```
Error: Process from config.webServer exited early.
```

**สาเหตุ:**
- มี `webServer` config ใน `playwright.config.ts`
- แต่เราใช้ external URL (https://www.saucedemo.com) ไม่ต้องใช้ local server

**วิธีแก้ไข:**
```typescript
// ❌ ผิด
export default defineConfig({
  // ...
  webServer: {
    command: 'echo "No local server needed"',
    port: 3000,
  },
});

// ✅ ถูก - ลบ webServer ออก
export default defineConfig({
  // ... ไม่มี webServer
});
```

---

### ปัญหาที่ 3: GitHub Actions YAML Syntax Error

**อาการ:**
```
Invalid workflow file: .github/workflows/ci.yml#L75
You have an error in your yaml syntax on line 75
```

**สาเหตุ:**
- ใช้ GitHub Actions expressions `${{ }}` ใน JavaScript template literal
- YAML parser พยายาม parse `${{ }}` ก่อนส่งไปให้ JavaScript

**วิธีแก้ไข:**
```yaml
# ❌ ผิด
script: |
  const summary = `URL: https://github.com/${{ github.repository }}/...`;

# ✅ ถูก - ใช้ env variables
env:
  REPOSITORY: ${{ github.repository }}
  RUN_ID: ${{ github.run_id }}
script: |
  const repository = process.env.REPOSITORY;
  const summary = `URL: https://github.com/${repository}/...`;
```

---

### ปัญหาที่ 4: GitHub Pages Deployment Error

**อาการ:**
```
Error: Failed to create deployment (status: 404)
Ensure GitHub Pages has been enabled
```

**สาเหตุ:**
- GitHub Pages ยังไม่ได้เปิดใช้งานใน repository settings
- Workflow พยายาม deploy แต่ Pages ยังไม่พร้อม

**วิธีแก้ไข:**
1. **ตรวจสอบก่อน deploy:**
```yaml
- name: Check if Pages is enabled
  uses: actions/github-script@v7
  # ตรวจสอบก่อน deploy

- name: Deploy to GitHub Pages
  if: steps.check-pages.outputs.enabled == 'true'
  # Deploy เฉพาะเมื่อเปิดใช้งานแล้ว
```

2. **ใช้ `continue-on-error: true`:**
```yaml
deploy-report:
  continue-on-error: true  # ไม่ให้ workflow fail
```

3. **หรือเปลี่ยนไปใช้ Netlify แทน** (ที่เราทำ)

---

### ปัญหาที่ 5: Allure Report Screenshot แสดง Loading State

**อาการ:**
- Screenshot ที่ถ่ายมาแสดง "Loading..." แทน report ที่โหลดเสร็จแล้ว

**สาเหตุ:**
- ถ่าย screenshot ก่อนที่ Allure report จะโหลดเสร็จ
- Charts และ widgets ยังไม่ render

**วิธีแก้ไข:**
```javascript
// ✅ รอให้ report โหลดเสร็จก่อน
await page.goto(fileUrl, { waitUntil: 'networkidle' });

// รอให้ "Loading..." หาย
await page.waitForFunction(() => {
  const loadingElements = document.querySelectorAll('*');
  let hasLoading = false;
  loadingElements.forEach(el => {
    if (el.textContent && el.textContent.includes('Loading...')) {
      hasLoading = true;
    }
  });
  return !hasLoading;
}, { timeout: 30000 });

// รอ widgets โหลด
await page.waitForSelector('.widget', { timeout: 10000 });

// รอเพิ่มอีก 3 วินาทีเพื่อให้ charts render
await page.waitForTimeout(3000);

// แล้วค่อยถ่าย screenshot
await page.screenshot({ fullPage: true });
```

---

### ปัญหาที่ 6: Netlify Workflow ไม่สามารถ Download Artifact

**อาการ:**
```
Unable to download artifact(s): Resource not accessible by integration
```

**สาเหตุ:**
- Workflow ที่รันจาก `workflow_run` trigger ไม่มี permissions
- ไม่สามารถเข้าถึง artifacts จาก workflow อื่นได้

**วิธีแก้ไข:**
```yaml
jobs:
  deploy:
    permissions:
      contents: read
      actions: read  # ← เพิ่ม permissions นี้
```

**หรือ:**
- ใช้ workflow หลัก (`ci.yml`) ที่มี deploy job อยู่แล้ว
- ไม่ต้องใช้ alternative workflow (`deploy-netlify.yml`)

---

## 📝 Best Practices ที่ใช้

### 1. Page Object Model (POM)

**หลักการ:**
- POM = Interactions only (no assertions)
- Test file = Assertions only
- ทำให้ Allure track ได้ถูกต้อง

### 2. Test Structure

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup
  });

  test('should do something', async ({ page }) => {
    await allure.step('Action', async () => {
      // Action
    });
    
    await allure.step('Verify', async () => {
      // Assertion
      expect(...).toBe(...);
    });
  });
});
```

### 3. Allure Integration

- ใช้ `allure.step()` สำหรับแต่ละ action
- ใช้ `allure.label()` สำหรับ categorization
- ใช้ `allure.attachment()` สำหรับ screenshots
- ใช้ `allure.description()` สำหรับ test descriptions

### 4. CI/CD Workflow

**หลักการ:**
- ใช้ `continue-on-error: true` สำหรับ optional steps
- ตรวจสอบก่อน deploy (เช่น ตรวจสอบว่า Pages เปิดหรือยัง)
- แสดงข้อความแนะนำเมื่อ setup ยังไม่เสร็จ
- Upload artifacts เสมอ (ไม่ว่าจะ deploy สำเร็จหรือไม่)

---

## 🚀 วิธีนำไปใช้กับโปรเจคอื่น

### ขั้นตอนที่ 1: Setup โปรเจค

```bash
# 1. สร้างโปรเจคใหม่
npm init -y

# 2. ติดตั้ง dependencies
npm install -D @playwright/test allure-playwright allure-commandline typescript @types/node

# 3. สร้าง tsconfig.json
# 4. สร้าง playwright.config.ts
# 5. สร้างโครงสร้าง folders (src/pages, src/tests, src/utils)
```

### ขั้นตอนที่ 2: สร้าง POM

```typescript
// src/pages/YourPage.ts
export class YourPage {
  readonly page: Page;
  readonly someElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.someElement = page.locator('#some-id');
  }

  // ✅ Interactions only
  async doSomething(): Promise<void> {
    await this.someElement.click();
  }

  // ✅ Return values, no assertions
  async getText(): Promise<string> {
    return await this.someElement.textContent() || '';
  }
}
```

### ขั้นตอนที่ 3: สร้าง Tests

```typescript
// src/tests/your-test.spec.ts
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { YourPage } from '../pages/YourPage';

test('should do something', async ({ page }) => {
  const yourPage = new YourPage(page);
  
  await allure.step('Action', async () => {
    await yourPage.doSomething();
  });
  
  await allure.step('Verify', async () => {
    const text = await yourPage.getText();
    expect(text).toBe('expected value');
  });
});
```

### ขั้นตอนที่ 4: Setup CI/CD

1. Copy `.github/workflows/ci.yml` ไปใช้
2. แก้ไขชื่อ workflow และ test commands
3. Setup Netlify (ถ้าต้องการ deploy report)

### ขั้นตอนที่ 5: Setup Netlify (Optional)

1. สร้าง Netlify account
2. สร้าง Access Token
3. หา Site ID
4. เพิ่ม Secrets ใน GitHub

---

## 📊 สรุป Checklist สำหรับโปรเจคใหม่

- [ ] Setup dependencies (Playwright, TypeScript, Allure)
- [ ] สร้าง tsconfig.json และ playwright.config.ts
- [ ] สร้าง POM classes (interactions only, no assertions)
- [ ] สร้าง test files (assertions ใน test file)
- [ ] เพิ่ม Allure steps และ attachments
- [ ] สร้าง GitHub Actions workflow
- [ ] ทดสอบรัน tests locally
- [ ] Push ไป GitHub และตรวจสอบ workflow
- [ ] Setup Netlify (optional)
- [ ] เพิ่ม Secrets ใน GitHub
- [ ] ทดสอบ deployment

---

## 🎓 สิ่งที่เรียนรู้

1. **POM Pattern**: แยก interactions และ assertions ให้ชัดเจน
2. **Allure Integration**: Assertions ต้องอยู่ใน test file ถึงจะ track ได้
3. **GitHub Actions**: ใช้ env variables แทน direct template expressions ใน scripts
4. **Error Handling**: ใช้ `continue-on-error` และตรวจสอบก่อน deploy
5. **Screenshot Timing**: รอให้ page โหลดเสร็จก่อนถ่าย screenshot

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Allure Framework](https://allure.qatools.ru/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Netlify Documentation](https://docs.netlify.com/)

---

## ✅ สรุป

โปรเจคนี้เป็นตัวอย่างที่ดีสำหรับ:
- ✅ Test Automation ด้วย Playwright + TypeScript
- ✅ Allure Reporting ที่ถูกต้อง
- ✅ CI/CD Pipeline ที่สมบูรณ์
- ✅ Automated Deployment
- ✅ Best Practices สำหรับ POM Pattern

สามารถนำไปใช้เป็น template สำหรับโปรเจคอื่นๆ ได้เลย! 🚀

