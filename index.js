const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config(); 

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const razorpayRoute = require('./routes/razorpay'); 



app.use(cors({
  origin: [
    "http://localhost:5173",                  // for local development
    "https://farm2retail.vercel.app",    // deployed frontend
    "https://farm2retail-admin.vercel.app"
  ],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", razorpayRoute); 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});