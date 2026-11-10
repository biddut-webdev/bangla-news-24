# 📰 Bangla News 24

Bangla News 24 is a Bengali news web application built with Next.js, React, and TypeScript. It allows users to explore news articles, browse news by category, read detailed news stories, and manage their profiles.

<p align="center">
  <a href="https://bangla-news-24-green.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Website-black?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <a href="https://github.com/biddut-webdev/bangla-news-24">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
</p>

---

## 📸 Project Screenshot

<!-- Add your actual project screenshot here -->
<p align="center">
  <img src="./public/public/bangla-news-24.PNG" width="100%" alt="Bangla News 24 Homepage" />
</p>

---

## ✨ Key Features

- 📰 Browse and read Bengali news articles.
- 📂 Explore news articles by category.
- 📖 View detailed information about individual news articles.
- 🔥 Discover popular and most-read news.
- 📢 Display scrolling news headlines.
- 🔐 User authentication with Better Auth.
- 👤 Access user profile information.
- 📝 User sign-in and sign-up pages.
- 📱 Responsive user interface.

---

## 🛠️ Technologies Used

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- HeroUI
- DaisyUI

### Backend & Database
- MongoDB
- Better Auth
- MongoDB Adapter

### Libraries & Tools
- React Hot Toast
- React Toastify
- React Marquee Text
- ESLint

---

## 📦 Dependencies

### Production Dependencies

| Package | Purpose |
|---|---|
| `next` | Next.js framework |
| `react` | UI library |
| `react-dom` | React DOM rendering |
| `@heroui/react` | UI components |
| `@heroui/styles` | HeroUI styling |
| `better-auth` | Authentication |
| `@better-auth/mongo-adapter` | MongoDB authentication adapter |
| `mongodb` | Database connection |
| `react-hot-toast` | Toast notifications |
| `react-toastify` | Notification messages |
| `react-marquee-text` | Scrolling text |

### Development Dependencies

| Package | Purpose |
|---|---|
| `typescript` | TypeScript support |
| `tailwindcss` | CSS framework |
| `@tailwindcss/postcss` | Tailwind CSS PostCSS integration |
| `daisyui` | UI component library |
| `eslint` | Code linting |
| `eslint-config-next` | Next.js ESLint configuration |
| `@types/node` | Node.js type definitions |
| `@types/react` | React type definitions |
| `@types/react-dom` | React DOM type definitions |
| `babel-plugin-react-compiler` | React Compiler plugin |

---

## 📁 Project Structure

```text
bangla-news-24/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts
│   │   │
│   │   ├── category/
│   │   │   └── [categoryId]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── news/
│   │   │   └── [newsId]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   │
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   │
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   │
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MainNews.tsx
│   │   ├── Marque.tsx
│   │   ├── MostReads.tsx
│   │   ├── Navlinks.tsx
│   │   ├── NewsCard.tsx
│   │   └── UserInfo.tsx
│   │
│   ├── lib/
│   │   ├── auth-client.ts
│   │   └── auth.ts
│   │
│   └── proxy.ts
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js
- npm
- MongoDB database

### 1. Clone the Repository

```bash
git clone https://github.com/biddut-webdev/bangla-news-24.git
```

### 2. Navigate to the Project Directory

```bash
cd bangla-news-24
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the environment variables required by your application.

Configure your MongoDB connection and Better Auth settings according to `src/lib/auth.ts`.

**Important:** Never commit your real database credentials or authentication secrets to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

### 6. Open in Browser

Visit:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🌐 Live Demo

Check out the deployed application:

**[Bangla News 24 – Live Website](https://bangla-news-24-green.vercel.app/)**

---

## 👨‍💻 Author

**Biddut Hossen**

- GitHub: [@biddut-webdev](https://github.com/biddut-webdev)
- Email: biddutem60@gmail.com

---

<p align="center">
  ⭐ If you find this project interesting, consider giving it a star!
</p>
