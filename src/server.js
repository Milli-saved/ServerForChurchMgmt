// Imports
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
const path = require('path')
dotenv.config();
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
app.use("/api/v1/guest", require("./routes/guestMemberRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) =>
    res.sendFile("Please change the NODE_ENV to production.")
  );
}

// Setting errorHandler Middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
