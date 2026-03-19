import { expect, type Page } from '@playwright/test';

export class BookingPage {
    constructor(private page: Page) { }

    private tierOption(tierDiv: string) {
        return this.page.getByTestId(tierDiv);
    }

    private attendeeNameInput() {
        return this.page.locator('div').filter({ hasText: /^ชื่อบนบัตร$/ }).locator('input');
    }

    private attendeeIdInput() {
        return this.page.locator('div').filter({ hasText: /^หมายเลขบัตร$/ }).locator('input');
    }

    private attendeeExpiryDateInput() {
        return this.page.locator('div').filter({ hasText: /^วันหมดอายุ$/ }).locator('input');
    }

    private attendeeCvvInput() {
        return this.page.locator('div').filter({ hasText: /^CVV$/ }).locator('input');
    }

    private expectButtonPay() {
        return expect(this.page.getByTestId('btn-pay'));
    }

    public async getExpectButtonPay() {
        this.expectButtonPay();
    }
    private buttonPay() {
        return this.page.getByTestId('btn-pay');
    }

    public async getButtonPay() {
        this.buttonPay().click();
    }

    public async fillCreditCardInfo(name: string, id: string, expiryDate: string, cvv: string) {
        await this.attendeeNameInput().fill(name);
        await this.attendeeIdInput().fill(id);
        await this.attendeeExpiryDateInput().fill(expiryDate);
        await this.attendeeCvvInput().fill(cvv);
    }

    public async selectTier(tierName: 'vip' | 'gold' | 'silver') {
        const tierId = `tier-${tierName}`;
        await this.tierOption(tierId).click();
    }

    private quantityOption(qty: number) {
        return this.page.getByTestId(`qty-${qty}`);
    }

    public async selectQuantity(qty: number) {
        await this.quantityOption(qty).click();
    }

    public getAttendeeNameInput() {
        return this.page.getByTestId('input-attendee-name');
    }

    public getAttendeeEmailInput() {
        return this.page.getByTestId('input-attendee-email');
    }

    public getAttendeePhoneInput() {
        return this.page.getByTestId('input-attendee-phone');
    }

    public getNextToPaymentButton() {
        return this.page.getByTestId('btn-next-payment');
    }

    public async fillAttendeeInfo(name: string, email: string, phone: string) {
        await this.getAttendeeNameInput().fill(name);
        await this.getAttendeeEmailInput().fill(email);
        await this.getAttendeePhoneInput().fill(phone);
    }

    public getConfirmPaymentButton() {
        return this.page.getByTestId('btn-confirm-payment');
    }

    // Usually when payment is successful, there's a button to view tickets
    public getViewTicketsButton() {
        return this.page.getByRole('button', { name: 'ดูตั๋วของคุณ' }); // Fallback guessing, might need test ID
    }


}
