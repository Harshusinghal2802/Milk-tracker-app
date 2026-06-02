import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dns from "dns";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

import milkRoutes from "./routes/milkRoutes.js";
dotenv.config();

// ======================
// DNS FIX
// ======================

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// ======================
// DATABASE CONNECTION
// ======================

connectDB();

// Agar connectDB use nahi kar rahe ho to niche wala use karo

/*
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });
*/

// ======================
// APP
// ======================

const app = express();

// ======================
// MIDDLEWARES
// ======================

app.use(cors());

app.use(express.json({ limit: "2mb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  "/api/milk",
  milkRoutes
);
app.use(helmet());

app.use(morgan("dev"));

// ======================
// STATIC FOLDER
// ======================

app.use(
  "/uploads",
  express.static("uploads")
);

// ======================
// ROUTES
// ======================

app.use(
  "/api/auth",
  authRoutes
);



// ======================
// HOME ROUTE
// ======================

app.get("/", (req, res) => {
  res.send(
    "🚀 Recipe Janta API Running"
  );
});

// ======================
// SERVER
// ======================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server Running On Port ${PORT}`
  );
});