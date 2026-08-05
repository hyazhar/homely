# 🏡 Homely

**Homely** is a full-stack Airbnb-inspired property rental platform built using **Node.js, Express.js, MongoDB, and EJS**. The application allows users to browse properties, create and manage listings, upload images, write reviews, and securely authenticate using Passport.js.

The project is designed using the **MVC (Model-View-Controller)** architecture and follows RESTful principles to keep the code organized, scalable, and maintainable.

> **Note:** The current version uses **EJS** as the frontend templating engine. A future version of the project will replace the frontend with **React** while keeping the same Express.js backend.

---

# ✨ Features

## 👤 Authentication

* User registration
* User login
* Secure logout
* Session-based authentication
* Password hashing with Passport Local Mongoose

---

## 🔒 Authorization

* Only authenticated users can create listings.
* Only the owner of a listing can edit or delete it.
* Only the author of a review can edit or delete it.
* Protected routes using custom middleware.

---

## 🏠 Listing Management

* Create new listings
* View all listings
* View listing details
* Edit existing listings
* Delete listings
* Search listings by title, location, or country
* Display related listings

---

## ☁ Image Upload

* Upload property images
* Cloudinary integration
* Multer for file handling
* Image update support

---

## ⭐ Review System

* Add reviews
* Edit reviews
* Delete reviews
* Rating support
* Review ownership
* Automatic review deletion when a listing is removed

---

## 📊 Dashboard

* Personalized dashboard
* View all listings created by the logged-in user
* Quick access to listing management

---

## ✅ Validation

* Joi validation for listings
* Joi validation for reviews
* Server-side validation
* Custom error handling

---

## ⚙ Error Handling

* Custom ExpressError class
* Async error wrapper
* Flash messages
* Centralized error middleware

---

## 🎨 User Interface

* Responsive design
* Bootstrap 5
* Bootstrap Icons
* Clean Airbnb-inspired layout

---

# 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* Bootstrap Icons
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session

### File Upload

* Multer
* Cloudinary

### Validation

* Joi

### Utilities

* Connect Flash
* Method Override
* Dotenv

---

# 📁 Project Structure

```text
Homely/
│
├── controllers/
├── middleware/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── routes/
├── utils/
├── views/
│
├── app.js
├── package.json
└── README.md
```

---

# 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/homely.git
```

### 2. Navigate to the project directory

```bash
cd homely
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Add the following environment variables:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 5. Start the application

```bash
npm start
```

or

```bash
node app.js
```

### 6. Open your browser

```
http://localhost:3000
```

---

# 📚 What I Learned

This project helped me gain practical experience with:

* Express.js
* RESTful routing
* MVC Architecture
* MongoDB & Mongoose
* Authentication & Authorization
* Session Management
* Cloudinary Integration
* Multer File Uploads
* Joi Validation
* Middleware
* CRUD Operations
* Error Handling
* Responsive UI Development

---

# 🚀 Future Improvements

* React frontend
* REST API for frontend communication
* JWT authentication
* Wishlist functionality
* Booking system
* Payment integration
* Email verification
* Forgot password
* User profile
* Dashboard analytics
* Property filters
* Pagination
* Maps integration
* Notifications

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome. Feel free to fork the repository and submit a pull request.

---

# 📄 License

This project is created for learning and portfolio purposes.

---

# 👨‍💻 Author

**Azharuddin**

* GitHub: https://github.com/hyazhar
* LinkedIn: https://linkedin.com/in/azzharr

---

⭐ If you found this project interesting, consider giving it a star on GitHub.
