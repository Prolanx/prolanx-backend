// INIT ENVIRONMENT VARIABLES
require("dotenv").config();

// INIT CORE PROPS AND METHODS
const { createError } = require("./modules/auth/utils/core.utils");
const { nodeEnv } = require("./constants");

// INIT EXPRESS
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// INIT DATABASE
const { dbConfig } = require("./config");
dbConfig.connectDb();

// HANDLE CORS CONFIGURATION
const cors = require("cors");
app.use(
  cors({
    origin:
      process.env.NODE_ENV === nodeEnv.dev
        ? process.env.ORIGIN_DEV
        : process.env.ORIGIN_LIVE,
    credentials: true,
  })
);

// INIT ROUTES
const { authGuard } = require("./modules/auth/middleware/auth.middleware");
// API ROUTES
app.use("/auth", require("./modules/auth/routes/auth.route"));
app.use("/send-mail", require("./modules/email-service/routes/sendEmail.route"));
// app.use(authGuard);
app.use((req, res, next) => {
  throw createError(
    "Invalid route error. Please confirm and check your request and try again",
    404
  );
});

app.use((error, req, res, next) => {
  res.status(error?.status || 500);
  const message = error.message;
  const payload = error.payload || null;
  res.json({
    message: message,
    data: payload,
  });
});

app.listen(port, () => console.log("Server now running on port " + port));
