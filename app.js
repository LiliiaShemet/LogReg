const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/api/users");
// const userRoutes = require("./routes/api/user-routes");
 // const errorMiddleware = require("./middlewares/error-middleware");

const app = express();


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // для відправки в джейсон 

// 
// app.use(cookieParser());
app.use("/api/users", usersRouter)

 // app.use(errorMiddleware);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;