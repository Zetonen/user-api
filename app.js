import express from "express";
import cors from "cors";
import usersRouter from "./routes/api/users-router.js";

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log("log");
  next();
});

app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

export default app;
