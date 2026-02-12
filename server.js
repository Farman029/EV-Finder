const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); // ✅ FIXED: Added missing import

// Import Routes
const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes'); // <--- 1. IMPORT USER ROUTES
const bookingRoutes = require('./routes/bookingRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// ... other imports

// ... inside app.use() section

// Register Routes
app.use('/api/auth', authRoutes);
// app.use('/api/bookings', bookingRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes); // <--- 2. REGISTER USER ROUTES HERE

// --------------------------
// ✅ DEPLOYMENT CODE
// --------------------------
if (process.env.NODE_ENV === "production") {
    // 1. Point to the "frontend" folder (lowercase matches your folder)
    const frontendDistPath = path.join(__dirname, "frontend", "dist");

    // Serve static files from React build
    app.use(express.static(frontendDistPath));

    // 2. Catch-All Route
    // ✅ FIXED: Changed "*" to /.*/ (Regex) for Express 5 compatibility
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running... (Dev Mode)');
    });
}


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));