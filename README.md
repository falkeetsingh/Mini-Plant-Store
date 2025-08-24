
# MINI-PLANT-STORE

<p align="center">
  <img src="https://img.shields.io/badge/Plant-Store-green?style=for-the-badge&logo=leaf&logoColor=white" alt="Plant Store">
</p>

<p align="center">
  <em><strong>An Online Plant Shopping Experience</strong></em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/falkeetsingh/Mini-Plant-Store?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
  <img src="https://img.shields.io/github/last-commit/falkeetsingh/Mini-Plant-Store?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
  <img src="https://img.shields.io/github/languages/top/falkeetsingh/Mini-Plant-Store?style=default&color=0080ff" alt="repo-top-language">
  <img src="https://img.shields.io/github/languages/count/falkeetsingh/Mini-Plant-Store?style=default&color=0080ff" alt="repo-language-count">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-16+-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-5.0+-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-4.18+-000000?style=flat&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/TailwindCSS-3.0+-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Running](#installation--running)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

The **Mini Plant Store** is a full-stack web application that offers a seamless online shopping experience for plant enthusiasts. Users can browse a variety of plants, view detailed product information, manage their shopping cart, and place orders with a professional, responsive interface.

The application features secure user authentication, professional checkout flow, and a structured backend API for efficient data management. Built with modern web development practices, it demonstrates the power of the MERN stack with a focus on user experience and scalability.

### Key Highlights

- **Modern UI/UX**: Professional, plant-themed design with smooth animations
- **Secure Authentication**: JWT-based authentication with password hashing
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Cart Management**: Dynamic cart updates and price calculations
- **Professional Checkout**: Multi-step checkout with multiple payment options
- **Admin Dashboard**: Complete product management system
- **Scalable Architecture**: RESTful API design with proper separation of concerns

---

## Features

### User Authentication
- **Registration & Login**: Secure user registration and login system
- **JWT Authentication**: Token-based authentication for secure API access
- **Profile Management**: User profile viewing and editing capabilities
- **Password Security**: Encrypted password storage using bcrypt

### Product Management
- **Product Catalog**: Browse comprehensive plant collection
- **Detailed Views**: Rich product information with high-quality images
- **Search & Filter**: Find plants by category, price, or name
- **Admin Controls**: Add, edit, and delete products (admin only)
- **Image Upload**: Multiple image support for each product

### Shopping Cart
- **Dynamic Cart**: Real-time cart updates and calculations
- **Quantity Management**: Easy quantity adjustment and item removal
- **Persistent Storage**: Cart state preservation across sessions
- **Visual Feedback**: Smooth animations and user feedback

### Orders & Checkout
- **Professional Checkout**: Multi-step checkout process
- **Payment Options**: Multiple payment method support including Credit/Debit Cards, PayPal, Apple Pay, and Google Pay
- **Order Tracking**: Complete order history for users
- **Address Management**: Multiple shipping address support
- **Order Confirmation**: Detailed order summaries and confirmation

### Backend Architecture
- **RESTful API**: Well-structured API endpoints
- **MongoDB Integration**: Efficient data storage and retrieval
- **Error Handling**: Comprehensive error management
- **Data Validation**: Input validation and sanitization
- **File Upload**: Image upload and management system

### Frontend Experience
- **React 18**: Latest React features and hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **State Management**: Efficient state management with Redux Toolkit
- **Component Library**: Reusable, well-structured components

### Security & Performance
- **CORS Configuration**: Secure cross-origin resource sharing
- **Environment Variables**: Secure configuration management
- **Rate Limiting**: API rate limiting for security
- **Input Validation**: Client and server-side validation
- **Image Optimization**: Optimized image loading and caching

---

## Tech Stack

### Frontend
- **React.js 18+** - Modern JavaScript library for building user interfaces
- **Tailwind CSS 3+** - Utility-first CSS framework for rapid UI development
- **Redux Toolkit** - State management for predictable app behavior
- **React Router DOM** - Declarative routing for React applications
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications for user feedback
- **Vite** - Fast build tool and development server

### Backend
- **Node.js 16+** - JavaScript runtime for server-side development
- **Express.js 4+** - Fast, minimalist web framework for Node.js
- **MongoDB 5+** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for secure authentication
- **bcryptjs** - Password hashing library
- **Multer** - Middleware for handling file uploads
- **CORS** - Cross-Origin Resource Sharing middleware

### Development Tools
- **Nodemon** - Development server with auto-restart
- **ESLint** - Code linting for consistent code style
- **Prettier** - Code formatting tool
- **Thunder Client/Postman** - API testing tools

### Deployment
- **Vercel** - Frontend deployment platform
- **Render** - Backend deployment platform
- **MongoDB Atlas** - Cloud database service


---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/falkeetsingh/Mini-Plant-Store.git
   cd Mini-Plant-Store
   ```

2. **Set up the Backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/plantstore
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the Backend Server**:
   ```bash
   npm run dev
   # or
   nodemon server.js
   ```

5. **Set up the Frontend** (in a new terminal):
   ```bash
   cd ../client
   npm install
   ```

6. **Configure Frontend Environment**:
   Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

7. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```

8. **Access the Application**:
   - Frontend: `http://localhost:5173` (or the port Vite provides)
   - Backend API: `http://localhost:5000`

---

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/register     # Register new user
POST /api/auth/login        # User login
GET  /api/auth/profile      # Get user profile
PUT  /api/auth/profile      # Update user profile
```

### Product Endpoints
```
GET    /api/products        # Get all products
GET    /api/products/:id    # Get product by ID
POST   /api/products        # Create product (admin only)
PUT    /api/products/:id    # Update product (admin only)
DELETE /api/products/:id    # Delete product (admin only)
```

### Cart Endpoints
```
GET    /api/cart            # Get user's cart
POST   /api/cart/add        # Add item to cart
PUT    /api/cart/update     # Update cart item quantity
DELETE /api/cart/remove/:id # Remove item from cart
DELETE /api/cart/clear      # Clear entire cart
```

### Order Endpoints
```
GET  /api/orders            # Get user's orders
POST /api/orders            # Place new order
GET  /api/orders/:id        # Get specific order
PUT  /api/orders/:id        # Update order status (admin only)
```

---

## Configuration

### Backend Configuration

The backend uses environment variables for configuration. Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/plantstore

# Authentication Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_PATH=./uploads

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

### Frontend Configuration

Create a `.env` file in the client directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Mini Plant Store
VITE_APP_VERSION=1.0.0
```

---

## Deployment

### Backend Deployment (Render)

1. **Prepare for deployment**:
   - Ensure all environment variables are set
   - Update CORS settings for production URL
   - Set up MongoDB Atlas if using cloud database

2. **Deploy to Render**:
   - Connect your GitHub repository to Render
   - Set environment variables in Render dashboard
   - Deploy from the `backend` directory

3. **Environment variables for production**:
   ```env
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_production_jwt_secret
   FRONTEND_URL=your_vercel_frontend_url
   ```

### Frontend Deployment (Vercel)

1. **Prepare for deployment**:
   - Update API URL to point to your Render backend
   - Build and test the production version locally

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set the root directory to `client`
   - Configure build settings:
     ```
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```


---
