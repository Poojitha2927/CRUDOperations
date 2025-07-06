const express = require("express");
const connection = require("./connection");
const loggerRequest = require("./middleware/log");
const userRouter = require("./routes/user");
const app = express();
// Connect to MongoDB
connection()
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error(" MongoDB connection error:", error.message);
  });
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerRequest("log.txt"));
// Routes
app.use("/api/users", userRouter);
// Start the server
app.listen(8001, () => {
  console.log("🚀 Server is running on port 8001");
});
