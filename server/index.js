require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db");
const authRouter = require("./routes/routes");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
//-------------------------------------------------------------------------

const PORT = process.env.PORT || 5000;
dbConnect();
//-------------------------------------------------------------------------
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://blog-site-aqhbk4gj1-mohd-afzal-ansaris-projects.vercel.app",
      "http://localhost:5173",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
  });
});

//-------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
