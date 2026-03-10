# Playwright Training Workshop

This repository contains materials, examples, and exercises for learning **Playwright**, a modern end-to-end testing framework for web apps.

## 📂 Project Structure

- `example.spec.ts` - Introductory scripts and fundamental assertions for interacting with basic elements using the Playwright framework.
- `best-practices.spec.ts` - Demonstrates key best practices including correct locators (`getByRole`), auto-waiting, handling network idle, and proper navigation strategies.
- `pages/` - Implementation of the **Page Object Model (POM)** pattern. Contains abstractions for different screens in the web application such as:
  - `RegisterPage.ts`
  - `LoginPage.ts`
  - `HomePage.ts`
  - `BookingPage.ts`

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
