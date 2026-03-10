# Playwright Training Workshop

This repository contains materials, examples, and exercises for learning **Playwright**, a modern end-to-end testing framework for web apps.

## 📂 Project Structure

- `example.spec.ts` - Introductory scripts and fundamental assertions for interacting with basic elements using the Playwright framework.
- `best-practices.spec.ts` - Demonstrates key best practices including correct locators (`getByRole`), auto-waiting, handling network idle, and proper navigation strategies.
- `workshop-flow.spec.ts` - Comprehensive end-to-end (E2E) testing flow that replicates a real-world user journey.
- `pages/` - Implementation of the **Page Object Model (POM)** pattern. Contains abstractions for different screens in the web application such as:
  - `RegisterPage.ts`
  - `LoginPage.ts`
  - `HomePage.ts`
  - `BookingPage.ts`

## 🚀 End-to-End Flow Demo

The `/workshop-flow.spec.ts` contains a complete business logic flow for a concert booking application:
1. **Registration:** Signing up a new user.
2. **Login:** Authenticating into the system.
3. **Selection:** Validating available events and picking a concert.
4. **Booking:** Reserving a ticket, selecting a tier, providing attendee information.
5. **Payment:** Verifying payment summary and submitting credit card information.
6. **Success Verification:** Assuring the successful booking confirmation.

## 🛠 Prerequisites & Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then install the dependencies:

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🏃 Running Tests

To run the Playwright test suite:

```bash
# Run all tests in headless mode
npx playwright test

# Run a specific test file
npx playwright test workshop-flow.spec.ts

# Run tests in UI mode for debugging
npx playwright test --ui

# View the HTML report
npx playwright show-report
```

## 📚 Key Concepts Covered

- **Locators:** Modern locators (`getByRole`, `getByTestId`, `getByText`).
- **Assertions:** Playwright's auto-retrying assertions (`expect`).
- **Page Object Model:** Structuring tests to reduce duplication and improve maintainability.
- **Debugging:** Using UI mode and trace viewer to identify flaky flows.
