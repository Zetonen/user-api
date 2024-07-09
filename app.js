import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
// import logger from "morgan";
import usersRouter from "./routes/api/users-router.js";
import todosRouter from "./routes/api/todos-router.js";
import swaggerDocument from "./swagger.json" with { type: "json" };
const app = express();

// const formatLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
