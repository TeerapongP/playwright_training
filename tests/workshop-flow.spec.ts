import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { BookingPage } from "../pages/BookingPage";

test("End-to-End: Should register a new user, login, and book a concert", async ({
  page,
}) => {
  // --- Setup Pages ---
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const bookingPage = new BookingPage(page);

  // ==========================================
  // 1. Registration Phase
  // ==========================================
  await registerPage.gotoRegisterPage();
  await expect(registerPage.getHeadingText()).toBeVisible();

  // กรอกข้อมูลสมัครสมาชิก
  await registerPage.register(
    "Test User",
    "testuser2@example.com",
    "0812345678",
    "password1234",
    "password1234",
  );
  await expect(page).not.toHaveURL("/register");

  // ==========================================
  // 2. Login Phase
  // ==========================================
  await loginPage.gotoLoginPage();
  await expect(loginPage.getHeadingText()).toBeVisible();

  // Login ด้วยข้อมูลที่เพิ่งสมัครไป
  await loginPage.login("testuser2@example.com", "password1234");
  await expect(page).not.toHaveURL("/login");

  // ==========================================
  // 3. Select Concert Phase
  // ==========================================
  await homePage.gotoHomePage();
  await expect(homePage.getHeadingText()).toBeVisible();

  // เลือกคอนเสิร์ต (แนะนำให้ระบุไปเลย เช่น c001 เพราะบางอันสุ่มเจอ Sold Out แล้วจะกดไม่ได้)
  // ถ้าต้องการสุ่มจริงๆ จะต้องเขียนเงื่อนไขกรองปุ่มที่ disabled ออกก่อน
  const options = [1, 2, 3, 6];
  const random = options[Math.floor(Math.random() * options.length)];
  const concertCode = `c00${random}`;
  await homePage.clickBookButton(concertCode);

  // ==========================================
  // 4. Booking Phase
  // ==========================================
  // รอ Modal ของ Booking เปิดขึ้นมา
  await expect(page.getByText("เลือก Tier")).toBeVisible();

  // กรอกข้อมูลการจอง
  await bookingPage.selectTier("gold");
  await bookingPage.selectQuantity(2);

  // กรอกผู้เข้าชม
  await bookingPage.fillAttendeeInfo(
    "Test User",
    "testuser2@example.com",
    "0812345678",
  );

  // กดปุ่มถัดไป ไปยังหน้าชำระเงิน
  await bookingPage.getNextToPaymentButton().click();

  // รอหน้าชำระเงิน
  await expect(page).toHaveURL("/payment");
  await expect(
    page.getByRole("heading", { name: "ข้อมูลการชำระเงิน" }),
  ).toBeVisible();

  await bookingPage.fillCreditCardInfo(
    "Test User",
    "1234567890123456",
    "12/30",
    "123",
  );
  await bookingPage.getExpectButtonPay();
  await bookingPage.getButtonPay();

  // ==========================================
  // 5. Booking Success Verification Phase
  // ==========================================
  // ตรวจสอบว่ามีข้อความสำเร็จ หรือปุ่มไปหน้าตั๋วของฉัน
  const viewMyTicketBtn = page.getByRole("button", { name: "ดูตั๋วของฉัน" });
  await expect(
    viewMyTicketBtn.or(page.getByRole("button", { name: "ปิด" })),
  ).toBeVisible();

  // ทดสอบกดปุ่มดูตั๋วของฉัน เพื่อเช็คว่ามันพาไปหน้า tickets หรือไม่
  if (await viewMyTicketBtn.isVisible()) {
    await viewMyTicketBtn.click();
    await expect(page).toHaveURL(/.*tickets.*/);
  }
});

// });
