// Imports
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectToDB = require("./config/db");

// port number for the server && will be changed for production
const port = 5000;

// Connecting to Database
connectToDB();

const app = express();

// using Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", require("./routes/userRoute"));

// Wrong route handler
app.use("*", (req, res) => {
  res.status(500);
  res.json(`wrong url is used.`);
});

// Setting errorHandler Middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
