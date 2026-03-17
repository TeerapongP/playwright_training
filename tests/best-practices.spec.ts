import { test, expect } from '@playwright/test';
import { ConcertsPage } from '../pages/ConcertsPage';

test('1. getByRole / getByLabel แทน CSS selector', async ({ page }) => {
    await page.goto('/concerts');

    // getByRole
    await expect(page.getByRole('heading', { name: 'คอนเสิร์ตที่กำลังมา' })).toBeVisible();

    // getByRole button
    await expect(page.getByRole('button', { name: 'จองตั๋ว' }).first()).toBeVisible();
});

test('2. หลีกเลี่ยง waitForTimeout', async ({ page }) => {
    //  หลีกเลี่ยง
    // await page.waitForTimeout(3000)

    // รอ network idle — ใช้เมื่อหน้ามี API call ก่อน render
    await page.goto('/concerts', { waitUntil: 'networkidle' });

    // auto-wait — Playwright รอ element ให้เองโดยอัตโนมัติ
    await expect(page.getByRole('heading', { name: 'คอนเสิร์ตที่กำลังมา' })).toBeVisible();
});

test('3. Page Object Model (POM)', async ({ page }) => {
    const concertsPage = new ConcertsPage(page);

    await concertsPage.goto();
    await expect(await concertsPage.getHeading()).toBeVisible();
});

test('4. baseURL จาก playwright.config.ts', async ({ page }) => {
    // ใช้แค่ path ไม่ต้อง hardcode full URL
    await page.goto('/concerts');
    await expect(page).toHaveURL(/concerts/);
});
