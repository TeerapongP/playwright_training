import { test, expect } from '@playwright/test';
import { ConcertsPage } from '../pages/ConcertsPage';
import { LoginPage } from '../pages/LoginPage';

// Test
test('Assertions & Debugging - Concerts Page', async ({ page }) => {
  const concertsPage = new ConcertsPage(page);
  const loginPage = new LoginPage(page);

  // Navigate to the page
  await concertsPage.goto();

  // Check page loaded
  await expect(page).toHaveURL('/concerts');

  // Check concert card is visible
  await expect(await concertsPage.getConcertCard()).toBeVisible();

  // Check heading text
  await expect(await concertsPage.getHeading()).toBeVisible();

  // Navigate to login page
  await loginPage.gotoLoginPage();

  // Assert login success
  await expect(page).toHaveURL('/login');

  // Fill email and password
  await loginPage.login('demo@stagepass.dev', 'demo1234');

  // Navigate to concerts page
  await concertsPage.goto();

  // Check page loaded
  await expect(page).toHaveURL('/concerts');
});
