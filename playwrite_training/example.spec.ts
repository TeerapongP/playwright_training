import { test, expect, type Page } from '@playwright/test';

// Page Object Model
class ConcertsPage {
  constructor(private page: Page) { }

  private async goto() {
    await this.page.goto('https://demo-playwright.vercel.app/concerts');
  }

  public async gotoConcertsPage() {
    await this.goto();
  }

  private async getHeading() {
    return this.page.getByRole('heading', { name: 'คอนเสิร์ตที่กำลังมา' });
  }

  public async getHeadingText() {
    return this.getHeading();
  }

  private async getConcertCard() {
    return this.page.getByTestId('concert-title-c001');
  }

  public async getConcertCardText() {
    return this.getConcertCard();
  }

  private async getEmail() {
    return this.page.locator('div').filter({ hasText: /^Email$/ }).locator('input');
  }

  private async getPassword() {
    return this.page.locator('div').filter({ hasText: /^รหัสผ่าน$/ }).locator('input');
  }

  private async getLoginButton() {
    return this.page.getByTestId('btn-login');
  }

  public async getLoginButtonClick() {
    return (await this.getLoginButton()).click();
  }

  public async getEmailText() {
    return (await this.getEmail()).fill('demo@stagepass.dev');
  }

  public async getPasswordText() {
    return (await this.getPassword()).fill('demo1234');
  }
}

// Test
test('Assertions & Debugging - Concerts Page', async ({ page }) => {
  const concertsPage = new ConcertsPage(page);

  // Navigate to the page
  await concertsPage.gotoConcertsPage();

  // Check page loaded
  await expect(page).toHaveURL('/concerts');

  // Check concert card is visible
  await expect(await concertsPage.getConcertCardText()).toBeVisible();

  // Check heading text
  await expect(await concertsPage.getHeadingText()).toBeVisible();

  // Navigate to login page
  await page.goto('/login');

  // Assert login success
  await expect(page).toHaveURL('/login');

  // Fill email and password
  await concertsPage.getEmailText();
  await concertsPage.getPasswordText();

  // Click login button
  await concertsPage.getLoginButtonClick();

  // Navigate to concerts page
  await page.goto('/concerts');

  // Check page loaded
  await expect(page).toHaveURL('/concerts');
});



