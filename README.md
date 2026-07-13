# SkillSwap Client 🤝 (Frontend)

This repository contains the Next.js (App Router) frontend for **SkillSwap**, a peer-to-peer tutoring and mentorship marketplace.

## 🚀 Key Features
*   **Dynamic Landing Page**: Responsive sections including features, custom category browsing, step guides, client testimonials, and a newsletter CTA.
*   **Interactive Hero Slider**: Auto-rotating card slideshow displaying top-rated listings.
*   **Search & Multi-Filter System**: Filter listings by Category, Skill Level (Beginner/Intermediate/Expert), and Location Type (Online/In-person). Synchronized with URL parameters for shareable, bookmark-friendly filter states.
*   **Recharts Data Visualizations**: Custom area charts and bar charts displaying system stats (Landing Page) and personal listing stats (Dashboard).
*   **Personal Dashboard**: Protected view showing active listings and analytic breakdown of listing metrics.
*   **Custom UI Modals**: Fully custom-designed confirmation modals for listing deletions, bookings, and auth handling (rather than default browser dialogs).
*   **Authentication & Session Cache**: Access tokens stored securely in localStorage, intercepted on outgoing calls with a custom `useAxiosSecure` hook.
*   **Polished Dark Theme UI**: Custom animations, smooth transitions, glassmorphic headers, and clean layouts.

---

## 🛠️ Tech Stack
*   **Framework**: Next.js (App Router, Client & Server Components)
*   **Language**: TypeScript (Type-safe interfaces)
*   **Styles**: Tailwind CSS
*   **Charts**: Recharts
*   **Icons**: Lucide React
*   **Alerts**: React Hot Toast

---

## ⚙️ Setup and Installation

1. Install all dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   *The client will open on `http://localhost:3000`.*

3. Make sure the Server API is running on `http://localhost:5000` (configurable in Axios config).

---

## 📄 Key Folder Structure
*   `src/app/`: App router page pages (Dashboard, Explore, Details, Auth).
*   `src/components/`: Reusable cards, footer, layouts, skeletons, and navbar.
*   `src/context/`: AuthContext providing login, register, and token management.
*   `src/hooks/`: Custom `useAxiosSecure` request interceptor attaching headers.
