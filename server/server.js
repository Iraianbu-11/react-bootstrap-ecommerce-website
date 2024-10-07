import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import route from "./routes/productRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 
const MONGOURL = process.env.MONGOURL; 

app.use(cors({ origin: "*" }));
app.use(express.json()); 


const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("Connected to MongoDB Database");

    app.listen(PORT, () => {
      console.log(`Fashio server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};


connectDB();

app.use("/",route);
