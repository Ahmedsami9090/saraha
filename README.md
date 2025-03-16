# Job Search App 🚀

Welcome to the **Saraha**, a platform that allows users to Register and receive short messages or feedback form anonymous users.

---

## Features 🌟

- **User Login:** Secure authentication using JWT (JSON Web Tokens).
- **Share Profile** Create a profile link for individuals to send messages to user.
  
---

## Technologies Used ⚙️

- **Authentication & Security:**
  - `bcrypt` - Secure password hashing
  - `jsonwebtoken` - JWT for authentication and authorization
  

- **Backend Framework:**
  - `express` - Web framework for building the app’s backend
  
- **Database:**
  - `mongoose` - MongoDB ODM for easy data modeling
  
- **Email Verification:**
  - `nodemailer` - For sending verification token to user's email
  
- **Other Utilities:**
  - `dotenv` - For loading environment variables securely
  - `joi` - Data validation for handling form submissions and inputs
  - `cors` - For handling Cross-Origin Resource Sharing (CORS) in the app

---

## Installation 🔧

To get started, clone the repository and follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/saraha.git
   ```

2. Navigate to the project directory:
   ```bash
   cd saraha
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
    PORT
    DB_URL
    DB_URL_ONLINE
    ENCRYPTION_KEY
    ENCRYPTION_IV
    HASH_ALGORITHM
    HASH_SALT
    ENCRYPTION_ALGORITHM
    TOKEN_SECRET_KEY_VERIFY_EMAIL
    TOKEN_SECRET_KEY_ADMIN
    TOKEN_SECRET_KEY_USER
    EMAIL_PASS
   ```

5. Run the application:
   ```bash
   npm start
   ```

The app will now be running locally on `http://localhost:3000`.

---

## API Endpoints 📡

User Endpoints: 
- **POST /users/login** - Login with email and password (returns JWT token).
- **POST /users/signup** - Register a new user.
- **GET /users/verify** - verify token sent by email.
- **GET /users/get-profile** - Retrieve user's public information.
- **PATCH /users/update-profile** - Update user's information.
- **PATCH /users/update-password** - Update password.
- **DELETE /users/freeze** - Freeze account.
- **GET /users/share-profile** - Share profile to receive messages.

Message Endpoints:
- **POST /messages/send-message** - Send message to user.
- **GET /messages/get-all** - Get all sent messages.
- **GET /messages/get-one** - Get single message.
- **DELETE /messages/delete** -Delete message.
