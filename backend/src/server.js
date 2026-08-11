// nodemon
// npm run dev 

import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js"
import cors from "cors";

dotenv.config();


const app = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

if (process.env.NODE_ENV === "production") job.start();

// CORS 
app.use(cors());

// middleware
app.use(rateLimiter);
app.use(express.json());

// our custom middleware
/*
app.use((req,res,next) => {
    console.log("We hit a req, the method is", req.method)
});
*/

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
    res.status(200).json({status: "ok"});
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT,() =>{
        console.log("Server is up and running on PORT:", PORT);
    });
});