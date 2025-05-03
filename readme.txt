# The Food Hub 

The Food Hub is a MERN stack web application that connects home-based food sellers with customers. Each seller can manage their own store, products, and orders, while customers can browse items and place orders.


##  Project Structure

root/

frontend/ # React application (TailwindCSS + DaisyUI)
backend/ # Express.js server with MongoDB (MongoDB Atlas)


---

## Features

### Authentication
- JWT-based login
- Role-based access: Admin, Store, Customer

### 🧾 Admin Dashboard
- View all users (stores & customers)
- View platform-wide stats (orders, products)

### 🏪 Store Dashboard
- Add/manage products
- View orders
- View store-specific stats

### 🛒 Customer Dashboard
- Browse stores and products
- Place orders
- Track order history

---

## ⚙️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT)

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/food-hub.git
cd food-hub


backend setup

cd backend
npm install

Create a .env file inside the backend/ folder:
PORT=5001
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key

Then start the server:
npm start


Frontend Setup
cd ../frontend
npm install
npm run dev

Notes
Data is stored in MongoDB Atlas for global access.
Project built as part of MERN Stack learning and portfolio development.

