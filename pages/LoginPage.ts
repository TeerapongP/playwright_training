import { type Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    private async goto() {
        await this.page.goto('/login');
    }

    public async gotoLoginPage() {
        await this.goto();
    }

    private headingText() {
        return this.page.getByRole('heading', { name: 'ยินดีต้อนรับกลับ' });
    }

    public getHeadingText() {
        return this.headingText();
    }

    private emailInput() {
        return this.page.locator('div').filter({ hasText: /^Email$/ }).locator('input');
    }

    public getEmailInput() {
        return this.emailInput();
    }

    private passwordInput() {
        return this.page.locator('div').filter({ hasText: /^รหัสผ่าน$/ }).locator('input');
    }

    public getPasswordInput() {
        return this.passwordInput();
    }

    private loginButton() {
        return this.page.getByTestId('btn-login');
    }

    public getLoginButton() {
        return this.loginButton();
    }

    public async login(email: string, password: string) {
        await this.getEmailInput().fill(email);
        await this.getPasswordInput().fill(password);
        await this.getLoginButton().click();
    }
}
