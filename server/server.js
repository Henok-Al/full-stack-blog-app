import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
//allow us to send form
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("api is running");
});

//CONNECT TO MONGODB
connectDb();
//error middleware
app.use(notFound);
app.use(errorHandler);

//create server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
