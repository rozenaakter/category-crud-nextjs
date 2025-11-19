Category Management System 🚀
A modern, full-stack category management application built with Next.js 16, Prisma, and Tailwind CSS. Features beautiful card-based UI, image uploads, and full CRUD operations.


✨ Features
🎨 Modern UI - Beautiful card-based design with Tailwind CSS

📁 Category Management - Full CRUD operations (Create, Read, Update, Delete)

🖼️ Image Upload - Support for both file uploads and image URLs

🔍 Search & Filter - Real-time search through categories

📱 Responsive Design - Works perfectly on all devices

⚡ High Performance - Built with Next.js 16 App Router

🗄️ Database - PostgreSQL with Prisma ORM

☁️ Cloud Storage - Cloudinary integration for image storage

🎯 Type Safety - Full TypeScript support

🛠 Tech Stack
Frontend
Next.js 16 - React framework with App Router

TypeScript - Type safety

Tailwind CSS - Utility-first CSS framework

Shadcn/UI - Beautiful UI components

React Hook Form - Form management

Zod - Schema validation

Backend
Next.js API Routes - Serverless API endpoints

Prisma - Database ORM

PostgreSQL - Primary database

Cloudinary - Image storage and optimization


🚀 Quick Start
Prerequisites
Node.js 18+

PostgreSQL database

Cloudinary account

Installation
Clone the repository

bash
git clone <your-repo-url>
cd category-crud-nextjs
Install dependencies

bash
npm install
Environment Setup
Create .env file:

.env
DATABASE_URL="postgresql://username:password@localhost:5432/category_db"
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Database Setup

bash
npx prisma generate
npx prisma db push


Run Development Server

bash
npm run dev
Open http://localhost:3000

📋 API Endpoints
Categories
GET /api/categories - Get all categories

POST /api/categories - Create new category

PUT /api/categories/[id] - Update category

DELETE /api/categories/[id] - Delete category

🙏 Acknowledgments
Next.js - The React framework

Tailwind CSS - CSS framework

Shadcn/UI - UI components

Cloudinary - Image management

Prisma - Database ORM

