# 1Fi E-commerce Application (Neo-Brutalist Edition)

A full-stack e-commerce web application featuring a striking Neo-Brutalist UI design. Built as part of the 1Fi SDE Intern Assignment.

## 📸 Screenshots

<!-- NOTE: Replace the image src paths below with actual screenshots of the application -->
<div align="center">
  <img src="https://placehold.co/600x400/1e293b/a7f3d0?text=Screenshot+1" alt="Home Page UI" width="45%" />
  <img src="https://placehold.co/600x400/1e293b/a7f3d0?text=Screenshot+2" alt="Product Details UI" width="45%" />
</div>

## 🚀 Tech Stack

### Frontend
- **React.js** (with Vite for fast bundling)
- **Tailwind CSS** (for the custom Neo-Brutalist styling)
- **React Router DOM** (for navigation)
- **Lucide React** (for icons)

### Backend
- **Node.js & Express.js**
- **TypeScript** (via `tsx`)
- **Prisma ORM**
- **PostgreSQL**

## ✨ Features
- **Distinct Neo-Brutalist Design**: Harsh shadows, thick borders, sharp edges, and high contrast colors.
- **Dynamic Database Driven UI**: The Home page, offers, brands, and marketplace items are all fetched dynamically from the PostgreSQL database.
- **Product Details & EMI Selection**: Displays variant selection and calculates mock No-Cost EMI plans on the fly.
- **Responsive Layout**: Designed primarily for mobile viewing while gracefully adapting to desktop views.

## 🛠️ How to Run Locally

### 1. Database Setup
Make sure you have PostgreSQL running. Update the `DATABASE_URL` in `backend/.env` with your credentials.

### 2. Backend Setup
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
npm install
```

Initialize the database schema and seed the data:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

Start the backend server:
```bash
npm run dev
```
*(The backend will run on `http://localhost:3001`)*

### 3. Frontend Setup
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
*(The frontend will run on `http://localhost:5174`)*

Open your browser and navigate to the frontend URL to view the app!
