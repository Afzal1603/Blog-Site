require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.routes");
const app = express();
//-------------------------------------------------------------------------

const PORT = process.env.PORT || 5000;
dbConnect();
//-------------------------------------------------------------------------
app.use(express.json());
app.use("/api/user", userRouter);
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
