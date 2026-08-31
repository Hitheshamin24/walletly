# 💳 Walletly — Smart Personal Finance & Wealth Tracker

<div align="center">

  <img src="public/walletlyLogo.png" alt="Walletly Logo" width="100" />

  <h3>Master Your Money, Simplify Your Life.</h3>

  <p>
    A modern, intelligent personal finance web application built with <strong>React 19</strong>, <strong>Redux Toolkit</strong>, and <strong>Tailwind CSS v4</strong>. Track expenses, analyze cash flow, manage multiple accounts, set budgets, and achieve your financial goals with ease.
  </p>

  <p>
    <a href="https://walletlyfinance.vercel.app/"><strong>🌐 Live Demo: walletlyfinance.vercel.app</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 7" />
    <img src="https://img.shields.io/badge/Redux_Toolkit-2.12.0-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/React_Router-v8.3.0-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  

</div>

---

## 📖 Table of Contents

- [✨ Key Features](#-key-features)
- [🖥️ Core Modules](#️-core-modules)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture & Project Structure](#️-architecture--project-structure)
- [⚡ Getting Started](#-getting-started)
- [💾 Data Persistence & Multi-User Architecture](#-data-persistence--multi-user-architecture)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)

---

## ✨ Key Features

- **📊 Comprehensive Financial Dashboard** — Real-time high-level view of total balance, monthly income, monthly expenses, net savings, cash flow charts, recent activities, and upcoming obligations.
- **💳 Multi-Account & Multi-Currency** — Link and manage multiple Bank accounts, Digital Wallets, and Credit Cards with custom color tags and international currency symbols (`$`, `€`, `£`, `₹`).
- **💸 Intuitive Transaction Tracking** — Fast logging of Income, Expense, and Transfer transactions with categories, dates, payment methods, and notes.
- **🔍 Advanced Multi-Dimensional Filtering** — Filter transactions dynamically by account, date range (month/year), transaction category, transaction type, or instant keyword search.
- **🎯 Category Budgeting & Overspending Alerts** — Set monthly spending limits per category, track real-time utilization progress bars, and receive automatic over-budget warnings.
- **🏆 Savings Goals & Contributions** — Create savings goals (e.g., Emergency Fund, Vacation, Car) with target amounts and deadlines. Log incremental contributions with timestamps and progress meters.
- **🔄 Recurring Payments & Subscription Manager** — Schedule recurring bills and subscriptions with automated monthly total calculations, "Due this week" indicators, and pause/resume capabilities.
- **📈 AI Spending Insights & Deep Analytics** — Automated financial intelligence detecting monthly spending surges (e.g., *"+34% higher than last month"*), daily burn rates, top income/expense sources, and balance distribution wheels.
- **🔐 Multi-User Session Isolation** — Client-side authentication (Registration & Login) with user-namespaced storage so multiple users can test or use the app on the same device without data collisions.
- **📱 Fully Responsive Modern UI** — Clean, aesthetic dashboard with collapsible mobile navigation drawer, fluid modals, and toast notifications.

---

## 🖥️ Core Modules

### 1. 📊 Executive Dashboard (`/main/dashboard`)
- **Key Metrics Grid**: Instant calculations for **Total Net Balance**, **Monthly Inflow**, **Monthly Outflow**, and **Net Savings**.
- **6-Month Cash Flow Visualizer**: Comparative bar charts illustrating month-over-month income vs. expense trends.
- **Recent Activity Feed**: Quick inspection of the latest transactions with visual category chips and amount color codings.
- **Quick Cards**: Expense breakdown mini-chart, monthly budget overview, upcoming bill reminders, and active savings goals.

### 2. 💸 Transactions (`/main/transactions`)
- **Global Quick Add Modal**: Easily triggerable from any screen or navbar button.
- **Full History Table**: Clean desktop and mobile view with pagination (10 items/page).
- **In-place Operations**: Edit transaction details or delete entries with automatic balance and stats recalculation.
- **Filtering Suite**: Instant slice-and-dice by Type (*Income / Expense / Transfer*), Category (*Food, Transport, Salary, Freelance, etc.*), Account, and Month.

### 3. 🏦 Linked Accounts (`/main/accounts`)
- **Net Worth Overview**: Aggregated balance across all linked instruments.
- **Balance Distribution**: Interactive visual breakdown of wealth distribution across accounts.
- **Account Management**: Add, update, and manage accounts (Bank Accounts, E-Wallets, Credit Cards) with customizable color palettes.

### 4. 🎯 Budgets & Alerts (`/main/budgets`)
- **Monthly Category Limits**: Allocate budget limits per category.
- **Real-Time Progress**: Dynamic progress bars showing safe zones vs. critical thresholds.
- **Smart Warnings**: Automatically surfaces warning notifications when spending approaches or exceeds allotted budget limits.

### 5. 🏆 Savings Goals (`/main/goals`)
- **Target Tracking**: Set targets with custom deadlines and starting amounts.
- **Milestone Logs**: Add dedicated contributions with notes.
- **Visual Progress**: Overall goal progress bar and percentage completion metrics.

### 6. 🔄 Recurring & Subscriptions (`/main/recurring`)
- **Subscription Tracking**: Monitor Netflix, Spotify, Rent, Utilities, Gym memberships, etc.
- **Timeline & Due Dates**: Summary of monthly recurring liabilities and upcoming bills due this week.
- **Pause / Resume**: Toggle status for paused subscriptions without losing configuration history.

### 7. 📈 Analytics & AI Insights (`/main/analytics`)
- **AI Financial Advice Banner**: Intelligent spending analysis identifying top anomalous expense categories and savings milestones.
- **Cash Flow History & Category Breakdown**: Detailed comparative metrics vs. previous month's spending.
- **Burn Rate**: Real-time average spending rate per day calculation.

---

## 🛠️ Tech Stack

| Layer | Technology / Library | Description |
|---|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) | Modern component architecture with latest React hooks |
| **Build Tool & Bundler** | [Vite 7](https://vitejs.dev/) | Next-generation frontend tooling with instant HMR |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) + [React-Redux](https://react-redux.js.org/) | Centralized predictable state management with modular slices |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework with modern styling system |
| **Routing** | [React Router v8](https://reactrouter.com/) | Declarative client-side routing with protected route guards |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) | High-performance, lightweight form validation |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent, and beautiful icon set |
| **Notifications** | [React Toastify](https://fkhadra.github.io/react-toastify/) | Animated toasts for user actions and errors |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) | Serverless cloud hosting with continuous deployment |

---

## 🏗️ Architecture & Project Structure

Walletly adopts a clean, feature-driven folder structure for scalability and maintainability:

```text
walletly/
├── public/                     # Static assets and branding
│   └── walletlyLogo.png        # Application logo
├── src/
│   ├── app/                    # Application core setup
│   │   ├── layouts/            # Layout wrappers (AuthLayout, MainLayout)
│   │   └── store.js            # Redux store configuration
│   ├── features/               # Feature-sliced modules
│   │   ├── account/            # Accounts management feature
│   │   │   ├── hooks/          # Custom hooks (useAccountsHook)
│   │   │   ├── state/          # accountSlice.js (Redux)
│   │   │   └── ui/             # Page & component views
│   │   ├── analytics/          # Analytics & AI insights feature
│   │   │   ├── hooks/          # useAnalyticsHook.js
│   │   │   └── ui/             # AnalyticsPage, ChartsRow, AIInsightBanner, etc.
│   │   ├── auth/               # User authentication feature
│   │   │   ├── hooks/          # useAuthHook.jsx
│   │   │   ├── state/          # authSlice.js (Redux)
│   │   │   └── ui/             # LoginPage, RegisterPage
│   │   ├── budget/             # Budgeting & limits feature
│   │   │   ├── hooks/          # useBudgetHook.js
│   │   │   ├── state/          # budgetSlice.js (Redux)
│   │   │   └── ui/             # BudgetsPage, CategoryBudgets, BudgetAlerts, etc.
│   │   ├── goals/              # Financial savings goals feature
│   │   │   ├── hooks/          # useGoalHook.js
│   │   │   ├── state/          # goalSlice.js (Redux)
│   │   │   └── ui/             # GoalPage, GoalsSection, ContributeModal, etc.
│   │   ├── recurring/          # Subscriptions & recurring bills feature
│   │   │   ├── hooks/          # useRecurringHook.js
│   │   │   ├── state/          # recurringSlice.js (Redux)
│   │   │   └── ui/             # RecurringPage, RecurringTimeline, etc.
│   │   ├── routes/             # App routing configuration & Route Guards
│   │   │   ├── AppRoutes.jsx   # Route definitions
│   │   │   └── protected/      # ProtectedMain & ProtectedPublic guards
│   │   └── transactions/       # Transaction management feature
│   │       ├── constants/      # Category styles & lookup constants
│   │       ├── hooks/          # useTransactionHooks.jsx
│   │       ├── state/          # transactionSlice.js & filterSlice.js
│   │       └── ui/             # TransactionPage, TransactionTable, Filters, etc.
│   ├── shared/                 # Shared resources across features
│   │   ├── context/            # TransactionFormContext.jsx
│   │   ├── hooks/              # useDashboard.js (Central stats & calculations)
│   │   └── ui/                 # Shared Navbar, TransactionForm, Dashboard cards
│   ├── App.jsx                 # Top-level application component
│   ├── index.css               # Global styling imports & Tailwind configuration
│   └── main.jsx                # Application root rendering & Redux Provider
├── package.json
├── vercel.json                 # Vercel SPA routing rewrite rules
├── vite.config.js              # Vite configuration
└── README.md
```

---

## ⚡ Getting Started

Follow these steps to set up and run Walletly locally on your development machine.

### 📋 Prerequisites

- **Node.js**: `v18.x` or higher (recommended: LTS)
- **npm** or **yarn** / **pnpm**

### 📥 1. Clone the Repository

```bash
git clone https://github.com/Hitheshamin24/walletly.git
cd walletly
```

### 📦 2. Install Dependencies

```bash
npm install
```

### 🚀 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 🔨 4. Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 💾 Data Persistence & Multi-User Architecture

Walletly operates with client-side state persistence coupled with Redux Toolkit:

- **Isolated Storage Keys**: Data is stored in `localStorage` scoped to the active user's ID:
  - `walletly-users` — Registered user accounts.
  - `walletlyCurrentUser` — Active authenticated session.
  - `walletly-accounts-{userId}` — Accounts specific to the user.
  - `walletly-Transactions-{userId}` — Transaction logs specific to the user.
  - `walletly-budgets-{userId}` — Monthly budget plans.
  - `walletly-goals-{userId}` — Savings goals and contribution records.
  - `walletly-recurring-{userId}` — Subscriptions and recurring bills.
- **Synchronous Sync**: Redux state and LocalStorage stay automatically synchronized on every CRUD action.

---

## 🚀 Deployment

The project is configured for deployment on **Vercel** with SPA routing support via `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

To deploy your own fork:
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Framework Preset: **Vite**.
4. Deploy! 🎉

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve Walletly:

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---


## 👨‍💻 Author

**Hithesh Amin**
- **GitHub**: [@Hitheshamin24](https://github.com/Hitheshamin24)
- **Live Demo**: [walletlyfinance.vercel.app](https://walletlyfinance.vercel.app/)

---

<div align="center">
  <sub>Built with ❤️ using React & Tailwind CSS. If you found this project helpful, please give it a ⭐️!</sub>
</div>
