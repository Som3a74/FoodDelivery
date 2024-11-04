import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import dotenv from 'dotenv';
dotenv.config();

import "dotenv/config.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;


// middlewares
app.use(express.json());
const corsConfig = {
  origin: "*",
  Credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsConfig));

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Api is working well!");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message, err.stack);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});