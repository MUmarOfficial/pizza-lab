# Pizza Lab 🍕

A modern, feature-rich pizza ordering application built with React and TypeScript. This project serves as a comprehensive laboratory for mastering advanced frontend concepts, including complex state management, responsive design, and end-to-end testing.

## 🌟 Special Functionalities

This project goes beyond a simple ordering app by implementing several advanced features:

- **Interactive Menu browsing:** Dynamic menu loading with real-time feedback.
- **Advanced State Management:** Utilizes **Redux Toolkit** for centralized state management of the cart items and order history.
- **Persistent Data:** Leverages **Redux Persist** to save cart contents and order history to local storage, ensuring data isn't lost on refresh.
- **Smart Cart Logic:** Handles quantity updates, item removal, and total price calculations efficiently.
- **Interactive Checkout:** Features a custom-built credit card form with real-time visualization and formatting using `react-credit-cards-2` logic and Framer Motion for animations.
- **Order Tracking:** Simulate real-world order tracking with unique IDs and status updates.
- **Mock Data Injection:** Includes developer tools to quickly fill forms with test data (e.g., Press `Shift + H` in checkout).
- **Responsive Design:** Fully responsive layout built with **TailwindCSS 4** and **DaisyUI 5**, ensuring a great experience on mobile and desktop.

## 🛠️ Tech Stack

This project is built using a modern and robust technology stack:

### Core

- **[React 19](https://react.dev/)**: The latest version of the library for web and native user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Ensures type safety and better developer experience.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast builds and HMR.

### State Management

- **[Redux Toolkit](https://redux-toolkit.js.org/)**: The official, opinionated, batteries-included toolset for efficient Redux development.
- **[Redux Persist](https://github.com/rt2zz/redux-persist)**: Persist and rehydrate a redux store.

### Styling & UI

- **[TailwindCSS 4](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[DaisyUI 5](https://daisyui.com/)**: The most popular component library for Tailwind CSS.
- **[Framer Motion](https://www.framer.com/motion/)**: A production-ready motion library for React.

### Routing

- **[React Router 7](https://reactrouter.com/)**: Client-side routing for seamless navigation.

### Testing

- **[Playwright](https://playwright.dev/)**: Reliable end-to-end testing for modern web apps.

### Utilities

- **Payment processing helpers**: Custom utilities for credit card formatting and validation.
- **@ngneat/falso**: All the fake data you need for development.

## 📂 Code Structure

The project follows a scalable and maintainable folder structure:

```
src/
├── assets/         # Static assets like images and global styles
├── components/     # Reusable UI components (e.g., Header, CreditCard, MenuItem)
├── data/           # Static data used across the app
├── hooks/          # Custom React hooks (e.g., useKeyPress)
├── pages/          # Full-page components (Home, Menu, Cart, Checkout, Order)
├── store/          # Redux store configuration and slices (cartSlice, ordersSlice)
├── utils/          # Helper functions (currency formatting, date helpers)
├── App.tsx         # Main application component
├── main.tsx        # Entry point
└── router.tsx      # Route definitions
```

## 🚀 Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd pizza-lab
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Run End-to-End Tests:**

    ```bash
    npm run e2e
    ```

## 🧪 Unique Aspects

What makes this code stand out is the integration of multiple modern libraries into a cohesive user experience. Instead of isolated examples, this project demonstrates how **React Router**, **Redux**, and **Tailwind** work together in a real-world scenario. the implementation of the credit card interaction and the state persistence layer provides a professional touch often missing in tutorial projects.
