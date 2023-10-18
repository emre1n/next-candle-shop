# Candy Shop Project

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

## Roll back the jest-dom version to 5.16.5

To solve the Jest extend matchers issue
Fixing the error below:

`Property 'toBeDisabled' does not exist on type 'JestMatchers<HTMLElement>'.ts(2339)`

```bash
npm i -D @testing-library/jest-dom@5.16.5
```

Add `"../../jest.setup.ts"` to `tsconfig.json`

```json
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "../../jest.setup.ts"
  ],
```

Reference:
[Next.js with React Testing Library, Jest, TypeScript - Dave Gray](https://www.youtube.com/watch?v=AS79oJ3Fcf0)

## Testing Library - User Interactions

`user-event` is a companion library for Testing Library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.

### Differences from fireEvent

`fireEvent` dispatches DOM events, whereas `user-event` simulates full interactions, which may fire multiple events and do additional checks along the way.

Testing Library's built-in [`fireEvent`](https://testing-library.com/docs/dom-testing-library/api-events#fireevent) is a lightweight wrapper around the browser's low-level dispatchEvent API, which allows developers to trigger any event on any element. The problem is that the browser usually does more than just trigger one event for one interaction. For example, when a user types into a text box, the element has to be focused, and then keyboard and input events are fired and the selection and value on the element are manipulated as they type.

`user-event` allows you to describe a user interaction instead of a concrete event. It adds visibility and interactability checks along the way and manipulates the DOM just like a user interaction in the browser would. It factors in that the browser e.g. wouldn't let a user click a hidden element or type in a disabled text box.

This is [why you should use](https://ph-fritsche.github.io/blog/post/why-userevent) `user-event` to test interaction with your components.

Reference: [RTL User Interactions](https://testing-library.com/docs/user-event/intro)

## Setting up Mock Service Worker

- npm install msw
- Create handlers
- Create test server
- Make sure test server listens during all tests
  - reset after each test

```bash
npm i msw -D
```

## Note on await & findBy

When you are waiting for something to appear asynchronously on the page, you must use `await` and `findBy`
And server connections are almost always async
