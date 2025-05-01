# 🛍️ Fashionist – E-Commerce Web Application

**Fashionist** is a modern, full-featured e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Stripe** integration for secure online payments. 
It supports multiple user roles: **admin**, **registered customer**, and **guest**, each with tailored access and capabilities.

---

## 📚 Table of Contents

- [General Info](#general-info)
- [Features](#features)
  - [Admin Features](#admin-features)
  - [Guest Features](#guest-features)
  - [Registered Customer Features](#registered-customer-features)
- [Tech Stack](#tech-stack)

---

## 🧾 General Info

Fashionist allows users to browse, filter, and purchase fashion products online. Admins have access to a management dashboard with detailed statistics and full CRUD operations on products and users.

---

## 🚀 Features

### 👨‍💼 Admin Features
- Secure login to admin panel
- View list of registered users
- View store statistics:
  - Total revenue
  - Number of orders
  - Number of unique customers
  - Monthly revenue chart
  - Sales breakdown by category (shirts, pants, jackets, etc.)
- View and manage all orders
- Add, edit, and delete products
- Delete user accounts
- Logout functionality

---

### 👤 Guest Features
- Register a new account
- Browse product listings
- View new arrivals (latest added products)
- View discounted products
- Search products by name
- Filter by:
  - Gender
  - Category (shirts, pants, jackets, etc.)
- Sort products by price
- View detailed product page with images and description

---

### 🛒 Registered Customer Features
Includes all Guest features, plus:
- Login/logout
- Choose product size
- Add/remove products from shopping cart
- Enter delivery address during checkout
- Pay via credit card using Stripe
- View order history
- Add/remove items from favorites
- View list of favorite products
- Edit/update personal profile
- Permanently delete user account

---

## 🧑‍💻 Tech Stack

- **Frontend:** React.js (Vite, Tailwind CSS)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Payment Integration:** Stripe
- **State Management:** Context API / Redux (optional)
- **Charts and Stats:** Chart.js / custom dashboard

