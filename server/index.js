require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db");
const authRouter = require("./routes/routes");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//-------------------------------------------------------------------------

const PORT = process.env.PORT || 5000;
dbConnect();
//-------------------------------------------------------------------------
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRouter);

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
