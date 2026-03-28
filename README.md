# Match-Mingle: A Tinder Clone 🚀

**Match-Mingle** is a modern matchmaking platform — a place where you can discover, connect, and collaborate with people from all walks of life. Whether you're looking for new friends, professional connections, or something more, Match-Mingle makes it easy.

![Match-Mingle Hero Image](https://raw.githubusercontent.com/sanidhyapant98/DevTinder/main/frontend/public/hero-screenshot.png) *(Note: Add your own project screenshot here)*

---

## 🌟 Key Features

- **User Discovery (Feed)**: Swipe through a curated list of profiles tailored to your interests.
- **Smart Connections**: Send connection requests and build your social or professional network.
- **Interaction Management**: Seamlessly accept or reject incoming connection requests.
- **Profile Customization**: Showcase your interests, personality, and bio with a customizable user profile.
- **Secure Authentication**: Robust login and signup system powered by JWT and industry-standard security practices.
- **User-Friendly Dashboard**: Effortlessly manage your connections and pending requests in one place.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Auth**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Utilities**: [Cookie-Parser](https://github.com/expressjs/cookie-parser), [CORS](https://github.com/expressjs/cors), [Dotenv](https://github.com/motdotla/dotenv)

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

### **1. Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (either local instance or MongoDB Atlas)

### **2. Cloning the Repository**
```bash
git clone https://github.com/sanidhyapant98/DevTinder.git
cd Match-Mingle
```

### **3. Setting up the Backend**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` root and add your configuration:
   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### **4. Setting up the Frontend**
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The application should now be running at `http://localhost:3000` (Frontend) and `http://localhost:5000` (Backend).

---

## 📂 Project Structure

```bash
Match-Mingle/
├── backend/                # Express Server & API
│   ├── config/             # Database connection configuration
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoint definitions
│   └── middlewares/        # Auth & Error handling middlewares
├── frontend/               # React Application (Vite)
│   ├── src/
│   │   ├── components/     # High-level UI components
│   │   ├── modules/        # Feature-based application logic
│   │   ├── store/          # Redux state management
│   │   └── App.jsx         # Main application entry
│   └── public/             # Static assets
└── README.md
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/signup` | Register a new user |
| **POST** | `/api/auth/login` | Authenticate user & receive cookie |
| **GET** | `/api/user/feed` | Fetch profiles for the feed |
| **GET** | `/api/profile/view` | Get current user's profile |
| **PATCH** | `/api/profile/edit` | Update current user's profile |
| **POST** | `/api/request/send/:status/:userId` | Send/Decline connection request |
| **GET** | `/api/user/connections` | View all accepted connections |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


