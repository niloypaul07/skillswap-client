# SkillSwap Client 🤝

> **Live Site:** [https://skillswap-client-navy.vercel.app/](https://skillswap-client-navy.vercel.app/)

A modern peer-to-peer tutoring and mentorship marketplace built with Next.js and deployed on Vercel.

---

## 🌐 Live Links

| | Link |
|---|---|
| 🖥️ **Frontend (Client)** | [https://skillswap-client-navy.vercel.app/](https://skillswap-client-navy.vercel.app/) |
| 📡 **Backend (API Server)** | [https://skillswap-server-zeta.vercel.app/](https://skillswap-server-zeta.vercel.app/) |

---

## 🚀 Key Features

- **Dynamic Landing Page** — Responsive sections including features, custom category browsing, step guides, client testimonials, and a newsletter CTA.
- **Interactive Hero Slider** — Auto-rotating card slideshow displaying top-rated listings.
- **Search & Multi-Filter System** — Filter listings by Category, Skill Level (Beginner / Intermediate / Expert), and Location Type (Online / In-person). Synchronized with URL parameters for shareable, bookmark-friendly filter states.
- **Recharts Data Visualizations** — Custom area charts and bar charts displaying system stats (Landing Page) and personal listing stats (Dashboard).
- **Personal Dashboard** — Protected view showing active listings and analytic breakdown of listing metrics.
- **Custom UI Modals** — Fully custom-designed confirmation modals for listing deletions, bookings, and auth handling.
- **Authentication & Session Cache** — Access tokens stored securely in `localStorage`, intercepted on outgoing calls with a custom `useAxiosSecure` hook.
- **Polished Dark Theme UI** — Custom animations, smooth transitions, glassmorphic headers, and clean layouts.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styles | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Alerts | React Hot Toast |
| HTTP Client | Axios |

---

## ⚙️ Setup & Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://skillswap-server-zeta.vercel.app
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   *The client will open on `http://localhost:3000`.*

---

## 📁 Key Folder Structure

```
src/
├── app/          # App router pages (Dashboard, Explore, Details, Auth)
├── components/   # Reusable cards, footer, layouts, skeletons, and navbar
├── context/      # AuthContext — login, register, and token management
└── hooks/        # Custom useAxiosSecure request interceptor
```

---

## 🔐 Security

- JWT tokens are attached to every protected API request via `Authorization: Bearer <token>` headers.
- Route guards redirect unauthenticated users away from protected pages.
- All API communication uses HTTPS in production.
