# Mingle - A Real-Time Chat Application

Mingle is a real-time chat application built using the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for seamless real-time communication.

## Features

- **Real-Time Messaging**: Instant communication between users with the help of Socket.IO.
- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Group Chats**: Create and participate in group conversations.
- **Responsive Design**: Fully responsive UI for both desktop and mobile users.
- **Typing Indicators**: Know when someone is typing a message.
- **Online Status**: See which users are online.
- **Message Persistence**: Chat history stored in MongoDB for future reference.

## Tech Stack

### Frontend

- **React**: For building the user interface.
- **SCSS**: For styling.

### Backend

- **Node.js**: Server-side runtime.
- **Express**: Framework for building the REST API.
- **Socket.IO**: For real-time bidirectional communication.

### Database

- **MongoDB**: NoSQL database for storing user and message data.

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js**
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **npm** or **yarn**

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/mugunth140/mingle.git
   cd mingle
   ```

2. **Backend Setup**:

   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` directory and add the following:
     ```env
     PORT=8080
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Start the backend server:
     ```bash
     npm run start
     ```

3. **Frontend Setup**:

   - Navigate to the `client` directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   Open your browser and navigate to:

   - Frontend: `http://localhost:`5173
   - Backend: `http://localhost:8080`

## Usage

- Register a new account or log in with existing credentials.
- Create or join a chat room.
- Start sending real-time messages to other users.

## Project Structure

### Backend (`server`)

```
server/
├── models/          # Mongoose schemas for users and messages
├── routes/          # API routes
├── controllers/     # Logic for handling requests
├── config/          # Configuration files (e.g., database connection)
└── index.js         # Main entry point for the server
```

### Frontend (`client`)

```
client/
├── src/
    ├── components/  # Reusable React components
    ├── pages/       # Application pages
    ├── store/     # Context API for global state management
    ├── routes/    # API call functions
    └── App.js       # Main React component
```

## Scripts

### Backend (from `server` directory):

- `npm run start`: Start the production server.
- `npm run dev`: Start the development server with hot reloading.

### Frontend (from `client` directory):

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.

## Future Enhancements

- Add support for media file sharing (images, videos, etc.).
- Implement user profiles and custom avatars.
- Add push notifications for new messages.
- Enhance security with additional authentication methods.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute to the project or submit issues and suggestions!

