# Ecommerce Project

A full-stack Ecommerce Web Application built using Node.js, Express.js, MongoDB, and EJS.

## Features

- User Authentication & Authorization
- Seller and User Roles
- Product CRUD Operations
- Reviews and Ratings
- Wishlist Functionality
- Shopping Cart
- Flash Messages
- Session Management
- Payment Gateway Integration
- Responsive UI using Bootstrap

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- EJS
- Bootstrap
- JavaScript

### Authentication
- Passport.js
- Passport Local

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Avneet2505/Ecommerce_project.git
```

Go to project directory:

```bash
cd Ecommerce_project
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add:

```env
DB_URL=your_mongodb_url
SECRET=your_secret_key
MERCHANT_KEY=your_merchant_key
MERCHANT_SALT=your_merchant_salt
```

Run the project:

```bash
node app.js
```

---

## Folder Structure

```bash
├── controllers
├── models
├── public
├── routes
├── views
├── middleware.js
├── app.js
├── schema.js
├── package.json
```

---

## Future Improvements

- Order History
- Admin Dashboard
- Product Search & Filters
- Online Deployment
- Razorpay/Stripe Integration

---

## Author

Developed by Avneet Singh Dang
