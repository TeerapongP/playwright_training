import { type Page } from '@playwright/test';

export class RegisterPage {
    constructor(private page: Page) { }

    private async goto() {
        await this.page.goto('/register');
    }

    public async gotoRegisterPage() {
        await this.goto();
    }

    private headingText() {
        return this.page.getByRole('heading', { name: 'สร้างบัญชี' });
    }

    public getHeadingText() {
        return this.headingText();
    }

    private fullNameInput() {
        return this.page.locator('div').filter({ hasText: /^ชื่อ-นามสกุล$/ }).locator('input');
    }

    public getFullNameInput() {
        return this.fullNameInput();
    }

    private emailInput() {
        return this.page.locator('div').filter({ hasText: /^Email$/ }).locator('input');
    }

    public getEmailInput() {
        return this.emailInput();
    }

    private phoneInput() {
        return this.page.locator('div').filter({ hasText: /^เบอร์โทรศัพท์$/ }).locator('input');
    }

    public getPhoneInput() {
        return this.phoneInput();
    }

    private passwordInput() {
        return this.page.locator('div').filter({ hasText: /^รหัสผ่าน$/ }).locator('input');
    }

    public getPasswordInput() {
        return this.passwordInput();
    }

    private confirmPasswordInput() {
        return this.page.locator('div').filter({ hasText: /^ยืนยันรหัสผ่าน$/ }).locator('input');
    }

    public getConfirmPasswordInput() {
        return this.confirmPasswordInput();
    }

    private registerButton() {
        return this.page.getByTestId('btn-register');
    }

    public getRegisterButton() {
        return this.registerButton();
    }

    public async register(fullName: string, email: string, phone: string, password: string, confirmPassword: string) {
        await this.getFullNameInput().fill(fullName);
        await this.getEmailInput().fill(email);
        await this.getPhoneInput().fill(phone);
        await this.getPasswordInput().fill(password);
        await this.getConfirmPasswordInput().fill(confirmPassword);
        await this.getRegisterButton().click();
    }
}
