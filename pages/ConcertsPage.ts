import { type Page } from '@playwright/test';

export class ConcertsPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/concerts');
    }

    async bookTicket() {
        await this.page.getByRole('button', { name: 'จองตั๋ว' }).click();
    }

    async getHeading() {
        return this.page.getByRole('heading', { name: 'คอนเสิร์ตที่กำลังมา' });
    }

    async getConcertCard() {
        return this.page.getByTestId('concert-title-c001');
    }
}
