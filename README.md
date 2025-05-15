# 📝 Mohd Afzal Ansari - Blog-Site

Welcome to my Blog App project! This web application allows users to create, read, update, and delete blog posts. It is built using the MERN (MongoDB, Express, React, Node.js) stack and showcases full-stack development capabilities.

## 🌐 Live Website



---

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**:  Vercel (Frontend) / Railway (Backend)

---

## 📁 Features

- 📝 Create and publish blog posts
- 🔐 User authentication (signup/login)
- 🧑 User dashboard to manage blogs
- 🔄 Edit or delete your own blogs
- 💬 Comment system
- 📱 Fully responsive design
- ⚡ Fast and smooth UI with loading indicators
- 🎨 Beautiful UI built with Tailwind CSS

---

## 📂 Folder Structure

```bash
blog-app/
├── client/             # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── index.js
├── server/             # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── .gitignore
├── README.md
└── package.json
```
---
## 🛠️ Installation

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Afzal1603/blog-app.git
cd blog-app
```
### 2. Set Up Environment Variables

Create a .env file in the server with the following:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 3. Install Backend Dependencies
```bash
cd server
npm install
```
### 4. Start Backend Server
```bash
npm run dev
```
Make sure MongoDB is running locally or remotely.

### 5. Install Frontend Dependencies
In a new terminal:
```bash
cd client
npm install
```
### 6. Start Frontend Server

```bash
npm run dev
```

## You are all set!!!
