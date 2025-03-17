# Node.js Backend with TypeScript and MongoDB

## Overview
This project is a Node.js backend application built with TypeScript and MongoDB. It provides user authentication functionality, including an option to authorize with Google.

## Features
- User registration and login
- Google OAuth authentication
- User profile management
- MongoDB database integration

## Technologies Used
- Node.js
- TypeScript
- Express
- MongoDB (with Mongoose)
- Passport.js (for authentication)

## Project Structure
```
nodejs-backend
├── src
│   ├── controllers        # Contains controllers for handling requests
│   ├── models             # Contains Mongoose models
│   ├── routes             # Contains route definitions
│   ├── services           # Contains business logic
│   ├── utils              # Contains utility functions
│   ├── app.ts             # Entry point of the application
│   └── types              # Contains TypeScript types and interfaces
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd nodejs-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your MongoDB connection string and Google OAuth credentials.

4. Run the application:
   ```
   npm run dev
   ```

## API Endpoints
- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Log in an existing user
- **GET /api/auth/google**: Authenticate with Google
- **GET /api/user/profile**: Get user profile
- **PUT /api/user/profile**: Update user profile

## License
This project is licensed under the MIT License.