const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");


const connectDB = require("./config/dbconnect");
const userRoutes = require("./routes/user_routes");
const authRoutes = require("./routes/authroutes");
const userprogress = require("./routes/progress_routes")
const mlmodelroutes = require('./routes/mlmodelroutes')

const app = express();
const port = process.env.PORT || 5000;

connectDB();
const allowedOrigins = ['https://codedata-frontend.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Enable credentials
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
// Authenticated route
app.get('/',(req,res)=>{res.json("site is up")})
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/progress",userprogress)
app.use("/mlroutes",mlmodelroutes)

app.all("*", (req, res) => {
  res.sendStatus(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 NOT FOUND" });
  } else {
    res.type("txt").send("404 NOT FOUND");
  }
});



mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logger(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
