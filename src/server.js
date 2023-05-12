// Imports
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectToDB = require("./config/db");

// port number for the server && will be changed for production
const port = 5001;

// Connecting to Database
connectToDB();

const app = express();

// using Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/members", require("./routes/memberRoutes"));
app.use("/api/v1/department", require("./routes/departmentRoutes"));
app.use("/api/v1/church", require("./routes/churchRoutes"));
app.use("/api/v1/program", require("./routes/programsRoute"));
app.use("/api/v1/branch", require("./routes/churchBranchRoutes"));

// Wrong route handler
app.use("*", (req, res) => {
  res.status(500);
  res.json(`wrong url is used.`);
});

// Setting errorHandler Middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
