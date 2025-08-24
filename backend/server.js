require('dotenv').config();

//express app
const express = require('express');
const app = express();

//Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//connect to database
const connectDB = require('./config/database');
connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//enable cors with environment variable
const cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
}));

//auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

//product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

//cart routes
const cartRoutes = require('./routes/cartRoutes');  
app.use('/api/cart', cartRoutes);

//review routes
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

//wishlist routes
const wishlistRoutes = require('./routes/wishlistRoutes');
app.use('/api/wishlist', wishlistRoutes);

//admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

//order routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
