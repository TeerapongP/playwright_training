import { type Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    private async goto() {
        await this.page.goto('/');
    }

    public async gotoHomePage() {
        await this.goto();
    }

    private headingText() {
        return this.page.getByRole('heading', { name: 'คอนเสิร์ต' });
    }

    public getHeadingText() {
        return this.headingText();
    }

    private concertList() {
        return this.page.getByTestId('concert-list');
    }

    public getConcertList() {
        return this.concertList();
    }

    //getByTestId('btn-book-c001')
    private bookButton(concertId: string) {
        return this.page.getByTestId(`btn-book-${concertId}`);
    }

    public getBookButton(concertId: string) {
        return this.bookButton(concertId);
    }

    public async clickBookButton(concertId: string) {
        await this.getBookButton(concertId).click();
    }

    private bookingUrl(concertId: string) {
        return `/booking?id=${concertId}`;
    }

    public async gotoBookingUrl(concertId: string) {
        await this.page.goto(this.bookingUrl(concertId));
    }
}
