const mongoose = require("mongoose");
const dotenv = require("dotenv");

//////////Uncaught Exception//////////
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

console.log(process.env.NODE_ENV);
//////////Connecting to MongoDB//////////
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

//connect method returns a promise
mongoose.connect(DB, {}).then((con) => {
  console.log("DB connection successful");
});

//////////Listening//////////
const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

//////////Unhandled Rejection//////////
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x);
