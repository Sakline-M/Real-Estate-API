import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";

const app = express();
dotenv.config();

/* ALL MIDDLEWARES */
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

/* API */
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/test", testRoute);

/* SERVER LISTEN */
app.listen(8080, () => {
  console.log(`Server is running`.bgGreen);
});
