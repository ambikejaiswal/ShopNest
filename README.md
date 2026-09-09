# 🛒 ShopNest — Full-Stack E-Commerce Platform

A full-stack e-commerce platform built with the **MERN stack**, featuring secure authentication, role-based authorization, product and category management, cart functionality, Razorpay payment integration, order management, Cloudinary image storage, and production deployment.
---
##  Project Overview

ShopNest is a modern e-commerce web application that provides a complete online shopping experience. Users can browse products, manage their cart , securely checkout using Razorpay, place orders, and view their order history.

The application also includes an admin system for managing products, categories, users, and orders.

---

## ⚙️ Tech Stack

| **Layer** | **Technology** |
| --- | --- |
| Frontend | React.js + Vite |
| State Management | Redux Toolkit |
| Routing | React Router |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT |
| Password Security | bcrypt |
| API Communication | Axios |
| Image Storage | Cloudinary |
| Payment Gateway | Razorpay |
| API Testing | Postman |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Database Hosting | MongoDB Atlas |
| Version Control | Git + GitHub |

---

##  Features

###  User Authentication

- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected routes
- Automatic login after page refresh
- Logout functionality
- Token expiration handling
- Axios request and response interceptors

###  Role-Based Authorization

- User and Admin roles
- Protected admin routes
- Admin-only API access
- Role-based middleware

###  Product Management

- Browse products
- Product details
- Product categories
- Product creation
- Product update
- Product deletion
- Product image upload using Cloudinary

###  Category Management

- Create categories
- View categories
- Update categories
- Delete categories
- Category-based product organization

###  Shopping Cart

- Add products to cart
- Update product quantity
- Remove products from cart
- Calculate cart total
- Persistent cart state

###  Checkout & Payments

- Checkout page
- Order summary
- Razorpay payment integration
- Secure online payment
- Payment success handling

###  Order Management

- Create orders after successful payment
- Store orders in MongoDB
- View user's orders
- Display order details
- Display order status
- Admin order management

###  Admin Features

- Admin authentication
- Role-based authorization
- Product management
- Category management
- User management
- Order management

---

## 🔐 Security

- JWT-based authentication
- bcrypt password hashing
- Protected backend routes
- Role-based authorization
- Authorization middleware
- Token-based API requests
- Axios request interceptor
- Axios response interceptor
- Automatic handling of unauthorized (`401`) requests

---

## 🗂️ Folder Structure

```text
ShopNest/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── redux/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md


```
---
# Backend Setup

Navigate to backend:

```
cd backend
npm install
npm run dev
```
Backend will run locally on:
```
http://localhost:5000
```
---
# Frontend Setup
Navigate to frontend:
```
cd frontend
npm install
npm run dev
```
Frontend will run on:
```
http://localhost:5173
```
---
# Environment Variables
```
MONGO_URI: MongoDB Atlas connection
JWT_SECRET: JWT authentication
CLOUDINARY_CLOUD_NAME: Cloudinary configuration
CLOUDINARY_API_KEY:	Cloudinary API key
CLOUDINARY_API_SECRET: Cloudinary API secret
RAZORPAY_KEY_ID: Razorpay payment integration
RAZORPAY_KEY_SECRET: Razorpay payment integration
```
---
# API Documentation
Authentication APIs
---
Register User
```
POST /api/auth/register
```
Login User
```
POST /api/auth/login
```
Verify User
```
GET /api/auth/verify
```
---
# Product APIs
```
GET /api/products
GET /api/products/:id
POST /api/products
```
---
Admin access required
```
PUT /api/products/:id
DELETE /api/products/:id
```
---
# Category APIs
```
GET /api/categories
POST /api/categories
PUT /api/categories/:id
DELETE /api/categories/:id
```
---
# Order APIs
```
POST /api/orders
GET /api/orders/myorders
GET /api/orders
```
---
# Payment Flow
```
Add Product
     ↓
Cart
     ↓
Checkout
     ↓
Razorpay Payment
     ↓
Payment Success
     ↓
Create Order
     ↓
Order Stored in MongoDB
     ↓
My Orders
```
# Deployment

ShopNest is deployed using modern cloud services.

- Vercel
- Render
- MongoDB
- Cloudinary
- Razorpay
---
# Production URLs
Frontend
```
https://shop-nest-jet.vercel.app/
```
Backend API
```
https://shopnest-backend-3w72.onrender.com/api
```
---
# Testing
The application was tested for the following workflows:

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-based Authorization
- Product CRUD
- Category CRUD
- Cart Operations
- Checkout
- Razorpay Payment
- Order Creation
- My Orders
- Admin Operations
- Production API Requests
---
# Security

The application implements several security practices:

- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Role-based authorization
- Authorization headers
- Token verification middleware
- Environment variables for sensitive credentials
- Axios request/response interceptors
- Automatic handling of unauthorized requests

---
# ✅ Status

- Authentication
- JWT Authorization
- Protected Routes
- Role-Based Authorization
- Products
- Categories
- Cart
- Checkout
- Razorpay Payment
- Orders
- My Orders
- Admin Features
- Cloudinary
- MongoDB Atlas
- Production Deployment
---
# ⭐ Like This Project

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.
