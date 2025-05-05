# Shortify Front-End

A React + Vite single-page app for shortening URLs, with user authentication, link management and a sleek UI.

---

## 🚀 Features

* **User Registration & Login**
  Secure authentication via JWT stored in cookies.
* **Create Short Links**
  Paste any URL and get a custom short link.
* **My URLs Dashboard**
  View, copy, delete your own shortened links.
* **Saved Links**
  Bookmark links shared by others.
* **Form Validation**
  Built with [Zod](https://github.com/colinhacks/zod) schemas for robust client-side checks.
* **Global Loading & Theme**
  Context-driven loading spinner and dark/light theme support.
* **Responsive Design**
  Mobile-first layout with CSS modules and component utilities.

---

## 🛠 Tech Stack

* **Framework:** React 18 + TypeScript
* **Bundler:** Vite
* **Styling:** CSS Modules, Radix UI primitives
* **UI Library:** [shadcn/ui](https://ui.shadcn.com/) – accessible, customizable components
* **Forms:** React Hook Form + Zod
* **Data Fetching:** Axios + React Query
* **State Management:** React Context API
* **Utilities:** js-cookie for JWT, react-toastify for toasts

---

## 🔧 Prerequisites

* Node.js ≥ 16
* npm or yarn

---

## ⚙️ Installation

1. Unzip or clone the repo:

   ```bash
   git clone https://github.com/molham-anas-task/shortify-frontend.git
   cd shortify-fronted
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

---

## 🚨 Configuration

By default, the app points at:

```ts
// src/utils/api.ts
baseURL: "https://shortify-1-br8t.onrender.com/api"
```

To use your own server, either:

* Edit `src/utils/api.ts` → `baseURL`.
* **Or** use an environment variable:

  ```diff
  // src/utils/api.ts
  - baseURL: "https://shortify-1-br8t.onrender.com/api",
  + baseURL: import.meta.env.VITE_API_BASE_URL || "https://shortify-1-br8t.onrender.com/api",
  ```

  then in `.env`:

  ```env
  VITE_API_BASE_URL=https://your-server.com/api
  ```

---

## 📦 Available Scripts

```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # build for production
npm run preview   # preview production build
npm run lint      # run ESLint
```

---

## 📁 Project Structure

```
public/             # static assets (favicon, logos)
src/
 ├─ components/     # reusable UI & layout pieces
 │    └─ ui/        # buttons, inputs, cards, etc.
 ├─ Context/        # theme & loading React contexts
 ├─ hooks/          # custom hooks (useAuth, useUrls, useSave…)
 ├─ lib/            # shared utilities
 ├─ pages/          # route components (Home, MyUrls, Register…)
 ├─ schemas/        # Zod validation schemas
 ├─ types/          # shared TypeScript types
 ├─ utils/          # API client, helpers
 ├─ App.tsx         # top-level routes & layout
 ├─ main.tsx        # ReactDOM render + providers
 ├─ styles.css      # global styles
 └─ vite.config.js  # Vite config
```

---
