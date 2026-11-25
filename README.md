# 📈 ProfitIQ.AI — AI-Based Profit Intelligence and Order Reconciliation System

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Currency](https://img.shields.io/badge/Currency-INR_(₹)-green.svg)]()
[![Status](https://img.shields.io/badge/Status-Phase_1_Complete_%7C_Phase_2_In_Progress-amber.svg)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)]()

> **A modern, privacy-first web application designed for Indian e-commerce merchants to solve the "Revenue Illusion". It ingests sales spreadsheets (Excel/CSV), calculates true unit-level net profit across Amazon India, Flipkart, Meesho, and Shopify, and provides autonomous pricing and order reconciliation intelligence.**

---

## 🌟 The Problem: The "Revenue Illusion" in E-Commerce

Most online sellers on Amazon India, Flipkart, and Meesho judge their business health strictly by top-line gross revenue. However, hidden **marketplace commission fees (12% to 15%)**, **closing fees**, **high PPC advertising costs (₹120–₹250 per sale)**, and **settlement deductions** secretly turn apparently profitable items into cash-draining losses.

**ProfitIQ.AI** solves this challenge through:
1. **Spreadsheet Ingestion:** Reads exported sales reports from Excel or Google Sheets in client-side memory without third-party server exposure.
2. **Unit Economics Engine:** Automatically calculates real take-home net profit per product.
3. **Smart Profit Advice:** Detects unprofitable products and recommends actionable price adjustments.
4. **Interactive Breakeven Calculator:** Dynamically computes the exact retail price required on Amazon vs. Shopify to guarantee target margins.
5. **Order Reconciliation (Phase 2):** Planned automated matching of expected settlements against actual bank payouts to detect fee overcharges and courier weight slab leaks.

---

## 🚀 Key Modules & Features

### 1. 📥 Flexible Data Ingestion Center
- **Drag & Drop:** Supports `.csv` and delimited exports from Microsoft Excel or Google Sheets.
- **Direct Table Paste:** Allows merchants to paste raw tabular data directly into the application.
- **Manual Form:** Clean input form pre-configured with fee structures for:
  - **Amazon India (Amazon.in):** ~15% referral fee
  - **Flipkart:** ~12% commission
  - **Meesho:** 0% commission / shipping model
  - **Shopify India (D2C):** ~2.5% payment gateway fee
- **Pre-loaded Test Dataset:** Includes a 1-click test button and a standalone test file (`indian_ecommerce_test_data.csv`).

### 2. 📊 Profit Dashboard
- **Top Metrics:** Total Sales (₹), Real Profit In Hand (₹), Total Money Spent (₹), and Average Profit on Each Item (₹).
- **Store Summary Banner:** Real-time plain-English diagnostics of store profitability.
- **Cost Breakdown Bar:** Proportional visualization of Product Manufacturing Cost (Blue), Platform Fees (Amber), Ad Spend (Purple), and Real Profit (Green).
- **Product Profit Table:** Unit-level breakdown with color-coded profit status tags (`Champion`, `Healthy`, `Thin`, `Loss`).

### 3. 💡 Smart Profit & Pricing Advice
- **Loss Prevention Alerts:** Instantly highlights products where platform fees and ad costs exceed sales revenue.
- **Channel Shift Advice:** Quantifies how much more margin sellers retain by driving repeat buyers to direct D2C channels.
- **Interactive Breakeven Pricing Calculator:** Solves recursive retail pricing formulas so merchants know exactly what price to charge on Amazon vs. Shopify.

### 4. ⚖️ Order Reconciliation Engine (Phase 2 Roadmap)
- Tab integrated into the primary taskbar.
- Designed to compare expected order revenues against marketplace bank payouts to identify weight slab errors, commission overcharges, and unrefunded customer returns.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Library:** [React 18.3](https://reactjs.org/)
- **Build Tool:** [Vite 6.1](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animation / Visuals:** Canvas Confetti
- **Parsing Engine:** Browser Native W3C `FileReader` API (Zero server latency, 100% data privacy)
- **Formatting:** Native `Intl` Indian Number Formatting (`en-IN` Lakhs & Crores grouping)

---

## 📂 Project Structure

```text
├── index.html                     # Entry HTML template with metadata
├── package.json                   # Dependencies & project scripts
├── vite.config.js                 # Vite bundler configuration
├── tailwind.config.js             # Tailwind CSS theme configuration
├── postcss.config.js              # PostCSS plugins
├── .gitignore                     # Git ignore rules for node_modules & dist
├── indian_ecommerce_test_data.csv # Pre-built Indian e-commerce test file
│
└── src/
    ├── main.jsx                   # Application bootstrap
    ├── App.jsx                    # Core layout & tab routing
    ├── index.css                  # Global styles & Tailwind utilities
    │
    ├── context/
    │   └── ProfitContext.jsx      # Global state, financial math & CSV parser
    │
    ├── data/
    │   └── sampleData.js          # Blank CSV template & test dataset
    │
    └── components/
        ├── Taskbar/
        │   └── TopTaskbar.jsx     # Navigation taskbar & currency switcher
        │
        ├── InputCenter/
        │   └── InputCenter.jsx    # File upload, paste box & manual form
        │
        ├── ProfitDashboard/
        │   └── ProfitDashboard.jsx# KPI metric cards & product matrix
        │
        ├── Reconciliation/
        │   └── OrderReconciliation.jsx # Order reconciliation module
        │
        ├── AIRecommendations/
        │   └── AIRecommendations.jsx # Smart advice & Breakeven calculator
        │
        ├── Presentation/
        │   └── PresentationModal.jsx # Built-in 5-slide project evaluation pitch deck
        │
        └── Common/
            └── Toast.jsx          # Interactive notification alerts
```

---

## ⚡ Getting Started (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/profitiq-profit-intelligence.git
cd profitiq-profit-intelligence
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🧪 Testing with Mock Data

To quickly evaluate the system with realistic data:
1. Open the application at `http://localhost:5173/`.
2. Go to the **Upload Excel / Input** tab.
3. Click the purple **"Load Test Data (1-Click)"** button (or drag & drop `indian_ecommerce_test_data.csv` into the upload box).
4. The system will parse all 7 Indian e-commerce items and immediately generate the complete Profit Dashboard.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
