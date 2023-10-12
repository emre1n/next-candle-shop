This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Setting up Jest and React Testing Library
```bash
npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event jest jest-environment-jsdom ts-jest
```

Create a `jest.config.js` file in your project's root directory and add the following (use `.js` file extention instead of `.mjs` and convert imports to commonJS imports to fix the import bug):

```typescript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',

  // For TypeScript
  preset: 'ts-jest',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
```

Add the following preset for TypeScript to config object:

```typescript
  // For TypeScript
  preset: 'ts-jest',
```

Create a `jest.setup.js` file and add the following import:

```typescript
import '@testing-library/jest-dom';
```

### Setting up eslint jest and testing library plugins

```bash
npm i -D eslint-plugin-jest-dom eslint-plugin-testing-library
```
Add the `testing-library/react` and `jest-dom/recommended` plugins to `.eslintrc.json` file:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
}
```

### Write the first test `Home.test.jsx` in the `__tests__` folder

```typescript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// AAA (Arrange, Act, Assert) method

describe('Home', () => {
    it('should have Docs text', () => {
        render(<Home />) // ARRANGE
    
        const docsElement = screen.getByText('Docs') // ACT
    
        expect(docsElement).toBeInTheDocument(); // ASSERT
    })

    it('should contain the text "information"', () => {
        render(<Home />) // ARRANGE
    
        const docsElement = screen.getByText(/information/i) // ACT
    
        expect(docsElement).toBeInTheDocument(); // ASSERT
    })
})
```
